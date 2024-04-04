//rafc
import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { View } from "react-native";
import { Button, Snackbar, Text, TextInput } from "react-native-paper";
import { auth } from "../configs/firebaseConfig";
import { styles } from "../theme/styles";
import { CommonActions, useNavigation } from "@react-navigation/native";

interface RegisterForm {
  email: string;
  password: string;
}

interface MessageSnackBar{
  visible: boolean,
  message: string,
  color: string
}

export const RegisterScreen = () => {
  //Hook de navegacion
  const navigation=useNavigation()

  //Hook para mostrar la contrasena
  const [hiddenPassword, setHiddenPassword] = useState(true)

  //Hook useState: trabajar con el estado del formulario
  const [registerForm, setRegisterForm] = useState<RegisterForm>({
    email: "",
    password: "",
  });

  //Hook useState: trabajar con el manejo de mensajes dinámicos
  const [messageSnackBar, setMessageSnackBar] = useState <MessageSnackBar>({
    visible: false,
    message:"",
    color:"#fff"
  })

  //Función para actualizar datos del formulario
  const handlerSetRegisterForm = (key: string, value: string) => {
    setRegisterForm({ ...registerForm, [key]: value });
  };

  //Función que toma los datos del registro
  const handlerRegister = async () => {
    if (!registerForm.email || !registerForm.password) {
      // cambiar estado para visualizar el mensaje
      setMessageSnackBar({
        visible: true, 
        message: "Complete todos los campos", 
        color:"#962841"})
      return;
    }
    //Registrar usuario
    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        registerForm.email,
        registerForm.password
      );
      console.log(response);
      setMessageSnackBar({
        visible: true, 
        message: "Registro exitoso!", 
        color:"#246317"})
    } catch (e) {
      console.log(e);
      setMessageSnackBar({
        visible: true, 
        message: "No se logró completar el registro, intente más tarde", 
        color:"#962841"})
    }
    //console.log(registerForm);
  };

  return (
    <View style={styles.content}>
      <Text variant="headlineMedium">Regístrate</Text>
      <TextInput
        mode="outlined"
        label="Correo"
        placeholder="Escribe tu correo"
        style={styles.inputs}
        onChangeText={(value) => handlerSetRegisterForm("email", value)}
      />
      <TextInput
        mode="outlined"
        label="Contraseña"
        placeholder="Escribe tu contraseña"
        secureTextEntry={hiddenPassword}
        right={<TextInput.Icon icon="eye" onPress={()=>setHiddenPassword(!hiddenPassword)} />}
        style={styles.inputs}
        onChangeText={(value) => handlerSetRegisterForm("password", value)}
      />
      <Button
        mode="contained"
        onPress={() => handlerRegister()}
        style={styles.buttons}
      >
        Registrarse
      </Button>
      <Snackbar
        visible={messageSnackBar.visible}
        onDismiss={() => setMessageSnackBar({...messageSnackBar, visible: false})}
        style={{ backgroundColor: messageSnackBar.color}}
      >
        {messageSnackBar.message}
      </Snackbar>
      <Text 
        style={styles.textNavigation}
        onPress={()=>navigation.dispatch(CommonActions.navigate({name:'Login'}))}
        >
        Ya tienes una cuenta? Inicia sesión
      </Text>
    </View>
  );
};

