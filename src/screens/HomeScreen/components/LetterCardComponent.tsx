import React from 'react'
import { View } from 'react-native'
import { IconButton, Text } from 'react-native-paper'
import { styles } from '../../../theme/styles'

export const LetterCardComponent = () => {
  return (
    <View style={styles.contentLetter}>
        <View>
            <Text variant='labelLarge'>Para: Ariel Ron Flores</Text>
            <Text variant='bodyMedium'>Asunto: Complexivo</Text>
        </View>
        <View style={styles.icon}>
        <IconButton
            icon="email-open"
            size={25}
            onPress={() => console.log('Pressed')}
        />
        </View>
    </View>
  )
}

