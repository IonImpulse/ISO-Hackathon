Repo (pronounced ree-poh) for team ***muddkippers*** at HackMIT 2022.

# ISO (In Search Of)

At Harvey Mudd College, our emails are full of scattered “ISOs”—indicating someone is “in search of” something. “OSIs” are similar, but instead mean someone’s looking to give something away. Unfortunately, these requests often clutter student inboxes, are scattered, and cannot be easily searched or filtered. ISO streamlines the process of giving and getting, creating a centralized hub for ISO/OSI requests. By implementing a karma based system for requests, college students everywhere are incentivized to offer OSI’s and fulfill ISO’s, encouraging students to minimize new purchases and offload extra items to others. Additionally, students can easily see a requests’ location, type, and description, making ISO/OSI-ing faster than ever. By reducing the need to buy new and taking waste off students’ hands, ISO is the next step towards sustainability and generosity on college campuses. More info: https://tinyurl.com/muddskipslides 

Tools used: React Native, Python, Rust, Actix, Expo, OpenSSL, NLTK, TextBlob, Pandas, Numpy, Plotly, Seaborn, scikit-learn, Babel, Node, Github, SQL, Twillio, Figma

## Demo

Our API is live at [isoapp.dev](https://isoapp.dev/api/v1/posts/feedPage/0)! Click for a sample our paginated feed. It's hosted on a VPS in Newark.

[Here](https://www.youtube.com/watch?v=kypnduvaPhA&ab_channel=ArjunTaneja) is a recorded description and live demo of our project, and here are some screenshots:

<img src="https://user-images.githubusercontent.com/24578597/193460807-f7297c80-694b-4c6d-b15e-0d9b0320a2ed.jpg" width="400" />
<img src="https://user-images.githubusercontent.com/24578597/193460805-4ec4eded-4de8-4458-98af-25299c6294e5.jpg" width="400" />

# API Methods

## GET

### `GET` /api/v1/posts/single/{uuid}
Find an individual post by UUID
```js
{
    results: {
        post: post_object, // Post object
    },
}
```
### `GET` /api/v1/posts/feedPage/{index}
Returns a page of posts from the feed. The index is the page number, starting at 0.
```js
{
    results: [], // Array of posts
    next: 1, // Index of next page or null
}
```


## POST

### `POST` /api/v1/posts/claim
Requires the following:
```js
{
    user: User, // User object
    post_uuid: "UUID-V4", // UUID of post to claim
}
```

### `POST` /api/v1/users/userInfo
Accept a user's JSON object as request body and returns the user's information.
```js
{
    uuid: "UUID-V4", // User's UUID
    token: "String", // User's token
    phone_number: "E.164", // User's phone number
    current_location: [0.0, 0.0], // User's current location
    karma: 0, // User's karma
    posts: [], // Array of user's posts UUIDS
    verified: true, // Whether user is verified
}
```

### `POST` /api/v1/posts/new
Accept a post's JSON object as request body and returns the post's information.
```js
{
    title: "String", 
    post_type: "PostType", 
    owner_uuid: "String", 
    time_type: "TimeType", 
    tags: ["String"], 
    location_string: "String",
}
```

### `POST` /api/v1/users/startVerification
Accept a user's JSON object as request body and returns the user's uuid. Sends a verification code to the user's phone number using Twilio.
```js
{
    phone_number: "E.164", // User's phone number
    country: "String", // User's country
}
```

### `POST` /api/v1/users/checkVerification
Accept a user's JSON object as request body and returns the user's full User object, if Twilio verification is correct.
```js
{
    code: "String", // Verification code
    uuid: "UUID-V4", // User's UUID
}
```
