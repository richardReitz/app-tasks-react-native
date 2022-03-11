import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, TouchableWithoutFeedback} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';

export default function TaskList({data, deleteItem, editItem}){

    return(
    <View style={styles.container}>
        <TouchableOpacity onPress={ () => deleteItem(data.key)}>
            <Feather name='trash' color='#FFF' size={20}/>
        </TouchableOpacity>
        <TouchableWithoutFeedback onPress={ () => editItem(data)}>
            <Text style={{color: '#FFF', paddingHorizontal: 10, fontSize: 15}}>{data.name}</Text>
        </TouchableWithoutFeedback>
    </View>
    );
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#225378',
        marginBottom: 10,
        borderRadius: 5,
        padding: 10,
        height: 50,
        elevation: 3,
        alignItems: 'center'
    }
})