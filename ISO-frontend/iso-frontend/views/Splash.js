import { Text, View, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Splash = (props) => {
    const [userObject, setUserObject] = useState({}); 
    
    // Attempt to fetch user object 
    useEffect(() => {
        async function fn() {
            try {
                let obj = await AsyncStorage.getItem('@user_object')
            } catch(e){}
            if (obj != null) setUserObject(JSON.parse(obj));
            else {
                props.navigation.navigate('Login')
            } 
        } 
    }, [])

    return (
        <View>
            <Text>Loading...</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'lightgray'
    }
})
