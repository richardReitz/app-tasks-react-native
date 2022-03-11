import React, {useState} from 'react';
import {View, Text, SafeAreaView, StyleSheet, TextInput, TouchableOpacity} from 'react-native';
import firebase from '../../services/firebaseConnection'


export default function Login({changeStatus}){
  const [email, setEmail] = useState('');
  const [type, setType] = useState('login');
  const [password, setPassword] = useState('');

  function handleLogin(){
    if(type === 'login'){
      const user = firebase.auth().signInWithEmailAndPassword(email, password)
      .then((user) => {
        changeStatus(user.user.uid)
      })
      .catch((err) => {
        console.log(err);
        alert('Error');
        return;
      })
    }else{
      const user = firebase.auth().createUserWithEmailAndPassword(email, password)
      .then((user) => {
        changeStatus(user.user.uid)
      })
      .catch((err) => {
        console.log(err);
        alert('Error');
        return;
      })
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inputArea}>
        <TextInput
          value={email}
          placeholder='Seu email'
          onChangeText={(text) => setEmail(text)}
          style={styles.input}
        />
        <TextInput
          value={password}
          placeholder='*******'
          onChangeText={(text) => setPassword(text)}
          style={styles.input}
        />
        <TouchableOpacity onPress={handleLogin} style={[styles.btnInput, {backgroundColor: type === 'login' ? '#225378' : '#EB7F00'}]}>
          <Text style={styles.textBtn}>
            {type === 'login' ? 'Acessar' : 'Cadastrar'}  
          </Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text 
            onPress={() => setType(type => type === 'login' ? 'cadastrar' : 'login')}
            style={{textAlign:'center', marginTop: 8, color: '#121212'}}
          >
            {type === 'login' ? 'Criar uma conta' : 'Já possuo uma conta'}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor: '#FFF',
    paddingHorizontal: 15,
    paddingTop: 5,
  },
  inputArea:{
    alignItems: 'center',
    justifyContent: 'center',
  },
  input:{
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#121212',
    width: '100%',
    height: 50,
    borderRadius: 5,
    fontSize: 16,
    padding: 10
  },
  btnInput:{
    marginTop: 10,
    width: '100%',
    padding: 15,
    borderRadius: 5,
    height: 50
  },
  textBtn:{
    textAlign: 'center',
    textTransform: 'uppercase',
    color: '#FFF',
    fontSize: 16,
  }
});





