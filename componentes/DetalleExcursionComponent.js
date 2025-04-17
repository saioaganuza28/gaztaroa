import React, { Component } from 'react';
import styles from './EstilosComponentes';
import { Text, View, ScrollView } from 'react-native';
import { Card, Icon } from '@rneui/themed';
import { ListItem } from '@rneui/themed';
import { baseUrl } from '../comun/comun';
import { textoDetalleExcursion } from './EstilosComponentes';
import { connect } from 'react-redux';
import { IndicadorActividad } from './IndicadorActividadComponent';
import { postFavorito } from '../redux/ActionCreators';

const mapStateToProps = state => {
    return {
        excursiones: state.excursiones,
        comentarios: state.comentarios,
        favoritos: state.favoritos
    }
}
const mapDispatchToProps = dispatch => ({
    postFavorito: (excursionId) => dispatch(postFavorito(excursionId))
})

function ProcesoCarga(props) {
    if (props.isLoading) {
        return (
            <IndicadorActividad />
        );
    }
    else if (props.errMess) {
        return (
            <View>
                <Text>{props.errMess}</Text>
            </View>
        );
    } else {
        return (props.elemento);
    }
}

function RenderExcursion(props) {
    const excursion = props.excursion;
    if (excursion != null) {
        return (
            <Card containerStyle={styles.container}>
                <Card.Divider />
                <Card.Image source={{ uri: baseUrl + excursion.imagen }}
                    style={styles.image}
                >
                    <Card.Title style={textoDetalleExcursion.text}>{excursion.nombre}</Card.Title>
                </Card.Image>
                <Text style={{ margin: 20 }}>
                    {excursion.descripcion}
                </Text>
                <Icon
                    raised
                    reverse
                    name={props.favorita ? 'heart' : 'heart-o'}
                    type='font-awesome'
                    color='#f50'
                    onPress={() => props.favorita ? console.log('La excursión ya se encuentra entre las favoritas') : props.onPress()}
                />
            </Card>
        );
    }
    else {
        return (<View />);
    }
}

function RenderComentarios(props) {
    const comentarios = props.comentarios;
    if (comentarios != null) {
        return (
            <Card>
                <Card.Title>Comentarios</Card.Title>
                <Card.Divider />
                {comentarios.map((item, index) => (
                    <ListItem key={index}>
                        <ListItem.Content>
                            <ListItem.Title>{item.autor}</ListItem.Title>
                            <ListItem.Subtitle>{formatDate(item.dia)}</ListItem.Subtitle>
                            <Text>{item.valoracion.toString()}/5</Text>
                            <Text>{item.comentario}</Text>
                        </ListItem.Content>
                    </ListItem>
                ))}
            </Card>
        );
    }
    else {
        return (<View />);
    }
}

function formatDate(dateStr) {
    const date = new Date(dateStr.replace(/\s*:\s*/g, ':').replace(/(\.\d{3})\d+Z$/, '$1Z'));
    return date.toLocaleString('es-ES', {
        day: '2-digit', month: '2-digit', year: 'numeric',
        hour: '2-digit', minute: '2-digit', second: '2-digit',
        hour12: false
    });
}

class DetalleExcursion extends Component {
    marcarFavorito(excursionId) {
        this.props.postFavorito(excursionId);
    }
    render() {
        const { excursionId } = this.props.route.params;
        return (
            <ScrollView>
                <ProcesoCarga
                    elemento={<RenderExcursion
                        excursion={this.props.excursiones.excursiones[+excursionId]}
                        favorita={this.props.favoritos.favoritos.some(el => el === excursionId)}
                        onPress={() => this.marcarFavorito(excursionId)}
                    />}
                    isLoading={this.props.excursiones.isLoading}
                    errMess={this.props.excursiones.errMess}
                />
                <ProcesoCarga
                    elemento={<RenderComentarios
                        comentarios={this.props.comentarios.comentarios.filter((comentario) => comentario.excursionId === excursionId)}
                    />}
                    isLoading={this.props.comentarios.isLoading}
                    errMess={this.props.comentarios.errMess}
                />

            </ScrollView>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DetalleExcursion);