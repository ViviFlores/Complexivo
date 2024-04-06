import React from 'react'
import { View } from 'react-native'
import { IconButton, Text } from 'react-native-paper'
import { styles } from '../../../theme/styles'
import { Letter } from '../HomeScreen'
import { CommonActions, useNavigation } from '@react-navigation/native'

interface Props{
  letter: Letter,
}

export const LetterCardComponent = ({letter}:Props) => {

  const navigation=useNavigation()

  return (
    <View style={styles.contentLetter}>
        <View>
            <Text variant='labelLarge'>Para: {letter.to}</Text>
            <Text variant='bodyMedium'>Asunto: {letter.subject}</Text>
        </View>
        <View style={styles.icon}>
        <IconButton
            icon="email-open"
            size={25}
            onPress={() => navigation.dispatch(CommonActions.navigate({name:'Detail', params:{letter}}))}
        />
        </View>
    </View>
  )
}

