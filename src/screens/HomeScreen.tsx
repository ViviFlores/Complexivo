import React from 'react'
import { View } from 'react-native'
import { Avatar, Text } from 'react-native-paper'
import { styles } from '../theme/styles';

export const HomeScreen = () => {
  return (
    <View style={styles.contentHome}>
        <View style={styles.headerHome}>
            <Avatar.Text size={55} label="CF" />
            <View>
                <Text variant='bodySmall'>Bienvenido</Text>
                <Text variant='labelLarge'>Viviana Flores</Text>
            </View>
        </View>
    </View>
  )
}

