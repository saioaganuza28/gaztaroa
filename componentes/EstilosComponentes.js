import { StyleSheet } from 'react-native';

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
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'center',
        color: 'chocolate',
    },
});
export default styles;

export const stylesCampoBase = StyleSheet.create({
    container: {
        flex: 1,
    },
    drawerHeader: {
        backgroundColor: '#015afc',
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
