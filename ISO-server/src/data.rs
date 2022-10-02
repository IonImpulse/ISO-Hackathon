use crate::{post::{Post, PostType, TimeType}, user::User, DB_NAME, MEMORY_DATABASE};
use ::serde::{Deserialize, Serialize};
use std::{io::{Error, Read, Write}, fs::OpenOptions, ops::Deref};
use log::*;
use std::collections::HashMap;

pub const FEED_PAGE_SIZE: usize = 25;

#[derive(Default, Deserialize, Serialize, Clone)]
#[serde(default)]
pub struct Config {
    pub twilio_sid: String,
    pub twilio_service: String,
    pub twilio_token: String,
}

#[derive(Default, Deserialize, Serialize, Clone)]
#[serde(default)]
pub struct Data {
    pub feed: Vec<Post>,
    pub users: HashMap<String, User>,
    /// UUIDs of pinned posts
    pub pinned_posts: Vec<String>,
}

impl Data {
    pub fn get_feed_page(&self, index: usize) -> Result<Vec<Post>, String> {
        if index >= self.feed.len() {
            return Err("Index out of bounds".to_string());
        }

        let mut page = Vec::new();

        for i in index..std::cmp::min(index + FEED_PAGE_SIZE, self.feed.len()) {
            page.push(self.feed[i].clone());
        }

        Ok(page)
    }

    pub fn get_user_by_uuid(&self, uuid: &str) -> Result<User, String> {
        if self.users.contains_key(uuid) {
            return Ok(self.users[uuid].clone());
        } else {
            return Err("User not found".to_string());
        }
    }

    pub fn get_user_by_number(&mut self, phone_number: &String) -> Result<&mut User, String> {
        for (_, user) in self.users.iter_mut() {
            if &user.get_phone_number() == phone_number {
                return Ok(user);
            }
        }

        Err("User not found".to_string())
    }

    pub fn add_user(&mut self, user: User) -> Result<(), String> {
        if self.users.contains_key(&user.uuid) {
            return Err("User already exists".to_string());
        } else {
            self.users.insert(user.uuid.clone(), user);
            return Ok(());
        }
    }
    
    pub fn add_update_user(&mut self, user: User) {
        self.users.insert(user.uuid.clone(), user);
    }

    pub async fn check_verification(&mut self, uuid: String, code: String) -> Result<User, String> {
        if self.users.contains_key(&uuid) {
            let mut user = self.users.get(&uuid).unwrap().clone();

            let user = user.check_verification(code).await;

            if user.is_err() {
                return Err(user.err().unwrap());
            } else {
                let user = user.unwrap();
                self.add_update_user(user.clone());
                return Ok(user);
            }
        } else {
            return Err("User not found".to_string());
        }
    }

    pub async fn add_post(&mut self, title: String, post_type: PostType, owner_uuid: String, time_type: TimeType, tags: Vec<String>) -> Result<(), String> {
        if self.users.contains_key(&owner_uuid) || true {
            let mut post = Post::new(title, post_type, owner_uuid, time_type, tags);

            self.feed.insert(0, post.clone());

            return Ok(());
        } else {
            return Err("User not found".to_string());
        }
    }
}

fn from_slice_lenient<'a, T: ::serde::Deserialize<'a>>(
    v: &'a [u8],
) -> Result<T, serde_json::Error> {
    let mut cur = std::io::Cursor::new(v);
    let mut de = serde_json::Deserializer::new(serde_json::de::IoRead::new(&mut cur));
    ::serde::Deserialize::deserialize(&mut de)
    // note the lack of: de.end()
}

pub fn load_database() -> Result<Data, Error> {
    let file = OpenOptions::new().read(true).open(DB_NAME);

    if file.is_err() {
        Ok(Data::default())
    } else {
        let mut file = file.unwrap();

        let mut data = String::new();
        file.read_to_string(&mut data)?;
        let data: Data = from_slice_lenient(data.as_bytes()).unwrap();
        Ok(data)
    }
}

pub async fn save_database() -> Result<(), Error> {
    info!("Saving database...");
    let mut file = OpenOptions::new().write(true).create(true).open(DB_NAME)?;
    let data = MEMORY_DATABASE.lock().await;

    // Get data struct from mutex guard
    let data = data.deref();

    let data = serde_json::to_string_pretty(&data)?;
    file.write_all(data.as_bytes())?;
    info!("Database saved.");
    Ok(())
}

pub async fn db_clone() -> Data {
    let lock = MEMORY_DATABASE.lock().await;
    let data = lock.deref().clone();
    drop(lock);
    data
}

pub async fn db_mut() -> tokio::sync::MutexGuard<'static, Data> {
    let lock = MEMORY_DATABASE.lock().await;
    lock
}