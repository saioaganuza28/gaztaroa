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