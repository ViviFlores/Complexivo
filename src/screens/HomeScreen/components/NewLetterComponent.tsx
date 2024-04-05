import React from 'react'
import { Modal, Portal, Text } from 'react-native-paper'

//Interface que indica los props que este componente va a manejar
interface Props{
    visible: boolean,
    setVisible: Function
}

export const NewLetterComponent = ({visible, setVisible}:Props) => {
  return (
    <Portal>
        <Modal visible={visible} contentContainerStyle={containerStyle}>
        <Text>Example Modal.  Click outside this area to dismiss.</Text>
        </Modal>
    </Portal>
  )
}
