import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Touchable, ScrollView } from 'react-native';
import { useState } from 'react';
const isoColor = "#A2D2FF";
const osiColor = "#CDB4DB";
import { useNavigation } from '@react-navigation/native';
const Request = ({data, title, location_string, type, tags}) => {
  const navigation = useNavigation(); 


    return (
        <View style={[styles.container, (type=="OSI") && styles.osiBackgroundColor]}>
          <View style={styles.body}>
          <View style={styles.circle}>
            <Text style={[styles.circleText, (type=="OSI") && styles.osiTextColor]}>{type}</Text>
          </View>

          <View style={styles.header}>
            <View>
              <Text style={styles.title}>{title.toLowerCase()}</Text>
              <Text >location: {location_string.toLowerCase()}</Text>
            </View>
            
          </View>
          
          <View>
          <View style={styles.tags}>
            {tags.map((tag) =>
            <View style={[styles.tagBox, (type=="OSI") && styles.osiBackgroundColor]}>
              <Text style={styles.tag}>{tag.toLowerCase()}</Text>
            </View>
            )}
            
            </View>
            <TouchableOpacity style={[styles.tagBox, styles.claimBox]}>
              <Text style={[ styles.tag, styles.claimText]}>claim</Text>
            </TouchableOpacity>

            

          </View>
          

          </View>
          
            

        </View>
    );
}

const styles = StyleSheet.create({
  osiBackgroundColor: {
    backgroundColor: osiColor,
  },
  osiTextColor: {
    color: osiColor,
    

  },
  claimBox: {
    borderColor: "black",
    backgroundColor: "black",
    bottom: 0,
  },
  body: {
    flexDirection: "row",
  },
  circle: {
    width: 50,
    height: 50,
    borderRadius: 60,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,

  },
  circleText:{
    fontSize: 20,
    fontWeight: "bold",
    color: isoColor,

  },
  tags: {
    flexDirection: 'row',
    
  },
  tagBox: {
    borderRadius: 5,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: isoColor,
    marginRight: 5,
    marginTop: 2,
    position: "absolute",
    right: 0,
    borderWidth: 1.5,
    borderColor: "white",

  },
  tag: {
    color: "white",
    paddingRight: 5,
    paddingLeft: 5,
    fontSize: 12,
  },
  container: {
    display: 'flex',
    width: '100%',
    height: 90,
    backgroundColor: isoColor,
    paddingLeft: 10,
    paddingRight: 10,
    marginTop: '2%',
    justifyContent: "center",
  },
  header: {
    display: 'flex',
    flex: 1,
    flexDirection: 'row',
    width: "100%",
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
  }
});

export default Request;