import { StyleSheet } from 'react-native';
import { colorGaztaroaOscuro } from '../comun/comun';

const styles = StyleSheet.create({
    container: {
        margin: 10,
        borderRadius: 8,
    },
    image: {
        width: '100%',
        height: 200,
        resizeMode: 'cover',
    },
    text: {
        fontSize: 50,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 40,
        color: 'chocolate',
    },
});
export default styles;

export const textoDetalleExcursion = StyleSheet.create({
    text: {
        fontSize: 50,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 40,
        color: 'white',
    },
});

export const stylesModal = StyleSheet.create({
    container: {
        flex: 1,
        padding: 40,
        marginTop: 40,
        backgroundColor: '#fff',
    },
    containerIcons: {
        flex: 1,
        flexDirection: 'row',
        padding: 40,
        backgroundColor: '#fff',
        justifyContent: 'center'
    },
    inputText: {
        color: '#000',
        marginLeft: 15,
        marginTop: 5
    },
    buttonText: {
        color: '#007bff',
        fontSize: 18,
        textAlign: 'center',
        marginVertical: 10,
    }
});

export const stylesCampoBase = StyleSheet.create({
    container: {
        flex: 1,
    },
    drawerHeader: {
        backgroundColor: colorGaztaroaOscuro,
        height: 100,
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        flexDirection: 'row'
    },
    drawerHeaderText: {
        color: 'white',
        fontSize: 24,
        fontWeight: 'bold'
    },
    drawerImage: {
        margin: 10,
        width: 80,
        height: 60
    }
});

export const stylesIndicadorActividad = StyleSheet.create({
    indicadorView: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1
    },
    indicadorText: {
        color: colorGaztaroaOscuro,
        fontSize: 14,
        fontWeight: 'bold'
    }
});
