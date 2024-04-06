import React from 'react'
import { View } from 'react-native'
import { Divider, Text, TextInput } from 'react-native-paper'
import { styles } from '../../theme/styles'

export const DetailLetterScreen = () => {
  return (
    <View style={styles.contentDetailLetter}>
        <View style={styles.subjectLetter}>
            <Text variant='headlineSmall'>Asunto:</Text>
            <TextInput
                value={'Complexivo'}
                onChangeText={()=>{}}
                style={{flex:1}}
                />
        </View>
        <Divider bold/>
    </View>
  )
}

