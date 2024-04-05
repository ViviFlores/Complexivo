import React, { useEffect, useState } from 'react'
import { FlatList, View } from 'react-native'
import { Avatar, Button, Divider, FAB, IconButton, Modal, Portal, Text, TextInput } from 'react-native-paper'
import { styles } from '../../theme/styles';
import { updateProfile } from 'firebase/auth';
import { auth } from '../../configs/firebaseConfig';
import firebase from 'firebase/auth'
import { LetterCardComponent } from './components/LetterCardComponent';
import { NewLetterComponent } from './components/NewLetterComponent';

//Interface que nos ayude a trabajar con los datos del usuario - nombre
interface UserForm {
  name: string
}

//Interface para trabajar la data de la carta
interface Letter {
  id: string,
  to: string,
  subject: string,
  message: string
}

export const HomeScreen = () => {

  //Hook useState: Controlar la visibilidad del modal user
  const [showModalProfile, setShowModalProfile] = useState(false)

  //Hook useState: Controlar la visibilidad del modal new letter
  const [showModalLetter, setShowModalLetter] = useState(false)

  //Hook permite trabajar con los datos del usuario - nombre
  const [userForm, setUserForm] = useState<UserForm>({
    name: ''
  })

  const [userAuth, setUserAuth] = useState<firebase.User | null>(null)

  //Hook useState: tomar la lista de cartas
  const [letters, setLetters] = useState<Letter[]>([
    {id: '1', to:'Ariel Ron', subject: 'Complexivo', message:'Estudiar para el 18 de abril 2024'}
  ])  

  //Hook useEffect: Capturar la data del usuario logueado
  useEffect(() => {
    setUserAuth(auth.currentUser) //datos del usuario logueado
    setUserForm({ name: auth.currentUser?.displayName ?? '' })
  }, [])

  //Funcion  para tomar los datos del formulario y actualizar la data
  const handlerUpdateUserForm = (key: string, value: string) => {
    setUserForm({ ...userForm, [key]: value })
  }

  //Funcion actualiza la data del usuario logueado
  const handlerUpdateUser = async () => {
    try {
      await updateProfile(userAuth!, { displayName: userForm.name })
    } catch (e) {
      console.log(e)
    }
    //console.log(userForm);
    setShowModalProfile(false)
  }

  return (
    <>
      <View style={styles.contentHome}>
        <View style={styles.headerHome}>
          <Avatar.Text size={55} label="CF" />
          <View>
            <Text variant='bodySmall'>Bienvenido</Text>
            <Text variant='labelLarge'>{userForm.name}</Text>
          </View>
          <View style={styles.icon}>
            <IconButton
              icon="cog"
              size={30}
              mode='contained'
              onPress={() => setShowModalProfile(true)}
            />
          </View>
        </View>
        <View>
          <FlatList
            data={letters}
            renderItem={({ item }) => <LetterCardComponent/>}
            keyExtractor={item => item.id}
          />
        </View>
      </View>
      <Portal>
        <Modal visible={showModalProfile} contentContainerStyle={styles.modalProfile}>
          <View style={styles.headerModal}>
            <Text variant='headlineLarge'>Mi Perfil</Text>
            <IconButton icon='close' onPress={() => setShowModalProfile(false)} />
          </View>
          <Divider bold />
          <View>
            <TextInput
              mode='outlined'
              label='Nombre'
              value={userForm.name}
              onChangeText={(value) => handlerUpdateUserForm('name', value)}
            />
            <TextInput
              mode='outlined'
              label='Correo'
              value={userAuth?.email!}
              disabled
            />
          </View>
          <Button mode='contained' onPress={() => handlerUpdateUser()}>Actualizar</Button>
        </Modal>
      </Portal>
      <FAB
        icon="plus"
        style={styles.fab}
        onPress={() => console.log('Pressed')}
      />
      <NewLetterComponent visible={showModalLetter} setVisible={setShowModalLetter}/>
    </>
  )
}


