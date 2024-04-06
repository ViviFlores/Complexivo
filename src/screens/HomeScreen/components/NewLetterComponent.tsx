import React, { useState } from 'react'
import { Button, Divider, IconButton, Modal, Portal, Text, TextInput } from 'react-native-paper'
import { styles } from '../../../theme/styles'
import { View } from 'react-native'
import { push, ref, set } from 'firebase/database'
import { dbRealTime } from '../../../configs/firebaseConfig'

//Interface que indica los props que este componente va a manejar
interface Props {
  visible: boolean,
  setVisible: Function
}

interface LetterForm {
  to: string,
  subject: string,
  message: string
}

export const NewLetterComponent = ({ visible, setVisible }: Props) => {
  //Hook useState: Actualizar los datos de nuestro formulario
  const [letterForm, setLetterForm] = useState<LetterForm>({
    to: '',
    subject: '',
    message: ''
  })

  //Funcion que capture y actualice los valores del formulario
  const handlerSetLetterForm = (key: string, value: string) => {
    setLetterForm({ ...letterForm, [key]: value })
  }

  //Funcion para guardar las cartas
  const handlerSaveLetter = async () => {
    if (!letterForm.to || !letterForm.subject || !letterForm.message) { 
      return
    }
    //console.log(letterForm);
    const dbRef = ref(dbRealTime, 'letters')
    const saveLetter=push(dbRef) //ubicacion de almacenamiento
    try{
      await set(saveLetter, letterForm)
      //Limpiar los valores del formulario
      setLetterForm({
        message:'',
        subject:'',
        to:''
      })
    }catch(e){
      console.log(e); 
    }
    setVisible(false)

  }

  return (
    <Portal>
      <Modal visible={visible} contentContainerStyle={styles.modal}>
        <View style={styles.headerModal}>
          <Text variant='headlineMedium'>Nueva Carta</Text>
          <IconButton icon='close' onPress={() => setVisible(false)} />
        </View>
        <Divider bold />
        <TextInput
          label='Para'
          mode='outlined'
          onChangeText={(value) => handlerSetLetterForm('to', value)}
        />
        <TextInput
          label='Asunto'
          mode='outlined'
          onChangeText={(value) => handlerSetLetterForm('subject', value)}
        />
        <TextInput
          label='Mensaje'
          mode='outlined'
          onChangeText={(value) => handlerSetLetterForm('message', value)}
          multiline={true}
          numberOfLines={7}
        />
        <Button style={{ marginTop: 20 }} mode='contained' onPress={() => handlerSaveLetter()}>Guardar</Button>
      </Modal>
    </Portal>
  )
}

