import React, {useState, useEffect, useRef} from 'react';
import {View, Text, SafeAreaView, Keyboard, StyleSheet, TextInput, FlatList, TouchableOpacity} from 'react-native';
import Login from './src/components/Login/index';
import TaskList from './src/TaskList';
import firebase from './src/services/firebaseConnection';
import Feather from 'react-native-vector-icons/Feather';

export default function App(){
  const [user, setUser] = useState(null);
  const [newTask, setNewTask] = useState('');
  const [tasks, setTasks] = useState([]);
  const inputRef = useRef(null);
  const [key, setKey] = useState('');

  useEffect(()=> {
    function getUser(){
      if(!user){
        return;
      }
      firebase.database().ref('tarefas').child(user).once('value', (snapshot)=>{
        setTasks([]);

        snapshot?.forEach((childItem)=>{
          let data = {
            key: childItem.key,
            name: childItem.val().name
          };
          setTasks(oldTasks => [...oldTasks, data])  
        })
      })
    }
    getUser();
  },[user])

  function handleAdd(){
     if(newTask === ''){
       return;
     }

     if(key !== ''){
       firebase.database().ref('tarefas').child(user).child(key).update({
         name: newTask
       })
       .then(()=>{
        const taskIndex = tasks.findIndex(item => item.key === key)
        const taskClone = tasks;
        taskClone[taskIndex].name = newTask

        setTasks([...taskClone])
       })
       Keyboard.dismiss();
       setNewTask('');
       setKey('');
       return;  
     }
     let tarefas = firebase.database().ref('tarefas').child(user);
     let chave = tarefas.push().key;

     tarefas.child(chave).set({
       name: newTask
     })
     .then(()=>{
       const data = {
         key: chave,
         name: newTask
       };

       setTasks(oldTasks => [...oldTasks, data])
     })
     Keyboard.dismiss();
     setNewTask('');
  }

  function handleDelete(key){
    firebase.database().ref('tarefas').child(user).child(key).remove()
    .then(()=>{
      const findTasks = tasks.filter(item => item.key !== key)
      setTasks(findTasks);
    })
  }

  function handleEdit(data){
    setKey(data.key)
    setNewTask(data.name)
    inputRef.current.focus();
  }

  function cancelEdit(){
    setKey('');
    setNewTask('');
    Keyboard.dismiss();
  }

  if(!user){
    return <Login changeStatus={(user) => setUser(user)} />
  }

  return (
    <SafeAreaView style={styles.container}>
      {key.length > 0 && (
              <View style={{flexDirection: 'row', marginBottom: 8}}>
              <TouchableOpacity onPress={cancelEdit}>
                <Feather name="x-circle" color={'#FF0000'} size={20}/>
              </TouchableOpacity>
              <Text style={{color: '#FF0000', marginLeft: 5}}>Você está editando a tarefa...</Text>
            </View>
      )}
      <View style={styles.containerTasks}>
        <TextInput
          style={styles.inputTasks}
          placeholder='O que vai fazer hoje?'
          value={newTask}
          ref={inputRef}
          onChangeText={(text)=> setNewTask(text)}
        />
        <TouchableOpacity onPress={handleAdd} style={styles.btnTasks}>
          <Text style={styles.textBtnTask}>+</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={tasks}
        keyExtractor={ item => item.key}
        renderItem={ ({item}) => (<TaskList data={item} 
        editItem={handleEdit} 
        deleteItem={handleDelete}
      />)}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor: '#FFF',
    paddingHorizontal: 15,
    paddingTop: 15,
  },
  containerTasks:{
    flexDirection: 'row'
  },
  inputTasks:{
    flex: 1,
    borderWidth: 1,
    height: 50,
    borderColor: '#121212',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    fontSize: 16
  },
  btnTasks:{
    backgroundColor: '#225378',
    borderRadius: 5,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 5,
    paddingHorizontal: 15
  },
  textBtnTask:{
    color: '#FFF',
    fontSize: 26
  }
});


