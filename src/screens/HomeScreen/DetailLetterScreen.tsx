import React, { useEffect, useState } from 'react'
import { View } from 'react-native'
import { Button, Divider, Text, TextInput } from 'react-native-paper'
import { styles } from '../../theme/styles'
import { useNavigation, useRoute } from '@react-navigation/native'
import { Letter } from './HomeScreen'
import { ref, remove, update } from 'firebase/database'
import { dbRealTime } from '../../configs/firebaseConfig'

export const DetailLetterScreen = () => {

  const navigation=useNavigation()
  //Acceder a los parametros de navegacion
  const route = useRoute()
  //@ts-ignore
  const { letter } = route.params
  //console.log(letter);

  const [detailForm, setDetailForm] = useState<Letter>({
    id: '',
    to: '',
    subject: '',
    message: ''
  })

  //Hook que carga los datos recibidos en el detailForm
  useEffect(() => {
    setDetailForm(letter)
  }, [])

  //Funcion que permita actualizar la data del formulario
  const handlerSetDetailForm = (key: string, value: string) => {
    setDetailForm({ ...detailForm, [key]: value })
  }

  //Funcion para actualizar la carta
  const handlerUpdateLetter = async () => {
    //Referencia a la base de datos
    const dbRef = ref(dbRealTime, 'letters/' + detailForm.id)
    await update(dbRef,{subject: detailForm.subject, message:detailForm.message})
    navigation.goBack()
    //console.log(detailForm);
  }

  //Funcion para eliminar la carta
  const handlerDeleteLetter= async()=>{
    const dbRef = ref(dbRealTime, 'letters/' + detailForm.id)
    await remove(dbRef)
    navigation.goBack()
  }

  return (
    <View style={styles.contentDetailLetter}>
      <View style={styles.subjectLetter}>
        <Text variant='headlineSmall'>Asunto:</Text>
        <TextInput
          value={detailForm.subject}
          onChangeText={(value) => handlerSetDetailForm('subject', value)}
          style={{ flex: 1 }}
        />
      </View>
      <Divider bold />
      <View>
        <Text variant='bodyLarge'>Para: {detailForm.to}</Text>
      </View>
      <Divider />
      <View>
        <Text style={styles.textMessage}>Mensaje</Text>
        <TextInput
          value={detailForm.message}
          multiline={true}
          numberOfLines={7}
          onChangeText={(value) => handlerSetDetailForm('message', value)} />
      </View>
      <Button mode='contained' icon='email-sync' onPress={handlerUpdateLetter}>Actualizar</Button>
      <Button mode='contained' icon='email-remove' onPress={() => handlerDeleteLetter()}>Eliminar</Button>
    </View>
  )
}

