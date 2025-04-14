import React, { Component } from 'react';
import Constants from 'expo-constants';
import Calendario from './CalendarioComponent';
import QuienesSomos from './QuienesSomosComponent';
import Contacto from './ContactoComponent';
import DetalleExcursion from './DetalleExcursionComponent';
import { Platform, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Home from './HomeComponent';
import { Image, Text } from 'react-native';
import {
    DrawerContentScrollView, DrawerItemList
} from '@react-navigation/drawer';
import { Icon } from '@rneui/themed';
import { SafeAreaView } from 'react-native-safe-area-context';
import { stylesCampoBase } from './EstilosComponentes';
import { DrawerActions } from '@react-navigation/native';
import { colorGaztaroaClaro, colorGaztaroaOscuro } from '../comun/comun';
import { connect } from 'react-redux';
import { fetchExcursiones, fetchComentarios, fetchCabeceras, fetchActividades } from '../redux/ActionCreators';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

const mapStateToProps = state => {
    return {
        excursiones: state.excursiones,
        comentarios: state.comentarios,
        cabeceras: state.cabeceras,
        actividades: state.actividades
    }
}

const mapDispatchToProps = dispatch => ({
    fetchExcursiones: () => dispatch(fetchExcursiones()),
    fetchComentarios: () => dispatch(fetchComentarios()),
    fetchCabeceras: () => dispatch(fetchCabeceras()),
    fetchActividades: () => dispatch(fetchActividades()),
})

function CustomDrawerContent(props) {
    return (
        <DrawerContentScrollView {...props}>
            <SafeAreaView style={stylesCampoBase.container} forceInset={{
                top: 'always',
                horizontal: 'never'
            }}>
                <View style={stylesCampoBase.drawerHeader}>
                    <View style={{ flex: 1 }}>
                        <Image source={require('./imagenes/logo.png')} style={stylesCampoBase.drawerImage} />
                    </View>
                    <View style={{ flex: 2 }}>
                        <Text style={stylesCampoBase.drawerHeaderText}> Gaztaroa</Text>
                    </View>
                </View>
                <DrawerItemList {...props} />
            </SafeAreaView>
        </DrawerContentScrollView >
    );
}
function CalendarioNavegador({ navigation }) {
    return (
        <Stack.Navigator
            initialRouteName="Calendar"
            headerMode="float"
            screenOptions={{
                headerTintColor: '#fff',
                headerStyle: { backgroundColor: colorGaztaroaOscuro },
                headerTitleStyle: { color: '#fff' },
            }}
        >
            <Stack.Screen
                name="Calendar"
                component={Calendario}
                options={{
                    title: 'Calendario Gaztaroa',
                    headerLeft: () => (
                        <Icon
                            name="menu"
                            size={28}
                            color='white'
                            onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
                        />),
                }}
            />
            <Stack.Screen
                name="DetalleExcursion"
                component={DetalleExcursion}
                options={{
                    title: 'Detalle Excursión',
                }}
            />
        </Stack.Navigator>
    );
}
function HomeNavegador({ navigation }) {
    return (
        <Stack.Navigator
            initialRouteName="Home"
            screenOptions={{
                headerMode: 'screen',
                headerTintColor: '#fff',
                headerStyle: { backgroundColor: colorGaztaroaOscuro },
                headerTitleStyle: { color: '#fff' },
                headerLeft: () => (
                    <Icon
                        name="menu"
                        size={28}
                        color='white'
                        onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
                    />),
            }} >
            <Stack.Screen
                name="Home"
                component={Home}
                options={{ title: 'Campo Base', }}
            />
        </Stack.Navigator>
    );
}
function QuienesSomosNavegador({ navigation }) {
    return (
        <Stack.Navigator
            initialRouteName="QuienesSomos"
            screenOptions={{
                headerMode: 'screen',
                headerTintColor: '#fff',
                headerStyle: { backgroundColor: colorGaztaroaOscuro },
                headerTitleStyle: { color: '#fff' },
                headerLeft: () => (
                    <Icon
                        name="menu"
                        size={28}
                        color='white'
                        onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
                    />),
            }} >
            <Stack.Screen
                name="QuienesSomos"
                component={QuienesSomos}
                options={{ title: 'Quiénes somos', }}
            />
        </Stack.Navigator>
    );
}
function ContactoNavegador({ navigation }) {
    return (
        <Stack.Navigator
            initialRouteName="ContactoNavegador"
            screenOptions={{
                headerMode: 'screen',
                headerTintColor: '#fff',
                headerStyle: { backgroundColor: colorGaztaroaOscuro },
                headerTitleStyle: { color: '#fff' },
                headerLeft: () => (
                    <Icon
                        name="menu"
                        size={28}
                        color='white'
                        onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
                    />),
            }} >
            <Stack.Screen
                name="ContactoNavegador"
                component={Contacto}
                options={{ title: 'Contacto', }}
            />
        </Stack.Navigator>
    );
}
function DrawerNavegador() {
    return (
        <Drawer.Navigator
            initialRouteName="Campo base"
            drawerContent={props => <CustomDrawerContent {...props} />}
            screenOptions={{
                headerShown: false,
                drawerStyle: {
                    backgroundColor: colorGaztaroaClaro,
                },
            }}
        >
            <Drawer.Screen name="Campo base" component={HomeNavegador}
                options={{
                    drawerIcon: ({ tintColor }) => (
                        <Icon
                            name='home'
                            type='font-awesome'
                            size={24}
                            color={tintColor}
                        />
                    )
                }}
            />
            <Drawer.Screen name="Quiénes somos" component={QuienesSomosNavegador}
                options={{
                    drawerIcon: ({ tintColor }) => (
                        <Icon
                            name='info-circle'
                            type='font-awesome'
                            size={24}
                            color={tintColor}
                        />
                    )
                }}
            />
            <Drawer.Screen name="Calendario" component={CalendarioNavegador}
                options={{
                    drawerIcon: ({ tintColor }) => (
                        <Icon
                            name='calendar'
                            type='font-awesome'
                            size={24}
                            color={tintColor}
                        />
                    )
                }}
            />
            <Drawer.Screen name="Contacto" component={ContactoNavegador}
                options={{
                    drawerIcon: ({ tintColor }) => (
                        <Icon
                            name='address-card'
                            type='font-awesome'
                            size={24}
                            color={tintColor}
                        />
                    )
                }}
            />
        </Drawer.Navigator>
    );
}
class Campobase extends Component {
    componentDidMount() { 
        this.props.fetchExcursiones(); 
        this.props.fetchComentarios(); 
        this.props.fetchCabeceras(); 
        this.props.fetchActividades();
    }
    render() {
        return (
            <NavigationContainer>
                <View style={{ flex: 1, paddingTop: Platform.OS === 'ios' ? 0 : Constants.statusBarHeight }}>
                    <DrawerNavegador />
                </View>
            </NavigationContainer>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Campobase);