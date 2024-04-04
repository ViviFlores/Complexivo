import { createStackNavigator } from '@react-navigation/stack';
import { LoginScreen } from '../screens/LoginScreen';
import { RegisterScreen } from '../screens/RegisterScreen';
import { HomeScreen } from '../screens/HomeScreen';
import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../configs/firebaseConfig';
import { View } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import { styles } from '../theme/styles';

//Interface : definir las propiedades de las rutas
interface Routes {
    name: string,
    screen: () => JSX.Element //elemento JSX
}

const Stack = createStackNavigator();

export const StackNavigator = () => {

    //Hook para verificar si esta logueado o no
    const [isAuth, setIsAuth] = useState(false)

    //Hook para controlar la carga incial del screen
    const [isLoading, setIsLoading] = useState(false)

    //Home useEffect: vaidar cual es el estado de autenticacion
    useEffect(() => {
        setIsLoading(true)
        onAuthStateChanged(auth, (user) => {
            if (user) { //Si existe un usuario autenticado
                setIsAuth(true)
                //console.log("Rutas: "+user.email);
            }
            setIsLoading(false)
        })
    }, [])

    //Arreglo de rutas para el usuario que no esta autenticado
    const routesNoAuth: Routes[] = [
        { name: "Login", screen: LoginScreen },
        { name: "Register", screen: RegisterScreen }
    ]

    //Arreglo de rutas para el usuario que esta autenticado
    const routesAuth: Routes[] = [
        { name: "Home", screen: HomeScreen }
    ]


    return (
        <>
            {
                isLoading ? (
                    <View style={styles.content}>
                        <ActivityIndicator size={35} />
                    </View>
                ) : (
                    <Stack.Navigator>
                        {
                            !isAuth ?
                                routesNoAuth.map((item, index) => (
                                    <Stack.Screen key={index} name={item.name} options={{ headerShown: false }} component={item.screen} />
                                ))
                                :
                                routesAuth.map((item, index) => (
                                    <Stack.Screen key={index} name={item.name} options={{ headerShown: false }} component={item.screen} />
                                ))
                        }

                        {/*<Stack.Screen name="Register" options={{headerShown:false}} component={RegisterScreen} />*/}
                    </Stack.Navigator>
                )
            }
        </>
    );
}