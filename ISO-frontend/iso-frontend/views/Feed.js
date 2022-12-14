import { Text, View, StyleSheet, ScrollView, SafeAreaView, FlatList } from 'react-native';
import { useState, useEffect, useContext } from 'react';
import User from '../contexts/User';
import Request from '../components/Request';
import Header from '../components/Header';

const Feed = (props) => {
    const userContext = useContext(User);

    const [data, setData] = useState([]);
    const getData = async () => {
        try {
         const response = await fetch('https://isoapp.dev/api/v1/posts/feedPage/0'); //index here
         const json = await response.json();
         setData(json.results);
       } catch (error) {
         console.error(error);
       } finally {
       }
     }

     useEffect(() => {
        console.log("getting data");
        getData();
      }, []);


    return (
        <SafeAreaView style={styles.wrapper}>
        <Header title="Home"/>
        {data ?
        <ScrollView style={styles.container}>
        {data != null &&
        data.map((req) => 
            // <Text>{req.title}</Text>
            <Request key={Math.floor(Math.random() * 100000)}navigation={props.navigation} user={props.user} data={req} type={req.iso_or_osi} title={req.title} location_string={req.location_string} tags={req.tags}></Request>
            )
        }
        </ScrollView>
        :
        <Text>Be patient, still loading</Text>
        }
        
        </SafeAreaView>

    );
}

        // <View style={styles.bigContainer}>
        //     <Header />
        //     <Text style={styles.titleText}>My Feed</Text>

        //     <View style={{flex: 1}}>
        //         <ScrollView style={styles.container}>
        //         {data != null &&
        //         data.map((req) => 
        //             // <Text>{req.title}</Text>
        //             <Request type={req.iso_or_osi} title={req.title} location_string={req.location_string} tags={req.tags}></Request>
    
        //             )
        //         }

                


        //         </ScrollView>
        //     </View>
        // </View>

const styles = StyleSheet.create({
    wrapper:{
        display: "flex",
        flex: 1,

    },
    container: {
        display: 'flex',
        height: '100%',
        flexDirection: 'column',
    },
    titleText: {
        fontSize: 20,
        alignSelf: "center",
        marginBottom: 20,

    },
    biggerContainer: {
        height:"100%",
        width: "100%",
        backgroundColor: "white",


    },
    bigContainer: {
        flex: 1,
        margin: 30,

    },
})

export default Feed;