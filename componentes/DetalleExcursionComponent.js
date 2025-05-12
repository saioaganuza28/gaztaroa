import React, { Component, useState } from 'react';
import styles from './EstilosComponentes';
import { Text, View, ScrollView, FlatList, TouchableOpacity, Modal } from 'react-native';
import { Card, Icon, Input } from '@rneui/themed';
import { ListItem } from '@rneui/themed';
import { baseUrl } from '../comun/comun';
import { textoDetalleExcursion } from './EstilosComponentes';
import { connect } from 'react-redux';
import { IndicadorActividad } from './IndicadorActividadComponent';
import { postFavorito } from '../redux/ActionCreators';
import { postComentario } from '../redux/ActionCreators';
import { Rating } from 'react-native-ratings';
import { stylesModal } from './EstilosComponentes';

const mapStateToProps = state => {
    return {
        excursiones: state.excursiones,
        comentarios: state.comentarios,
        favoritos: state.favoritos
    }
}
const mapDispatchToProps = dispatch => ({
    postFavorito: (excursionId) => dispatch(postFavorito(excursionId)),
    postComentario: (excursionId, autor, comentario, valoracion) => dispatch(postComentario(excursionId, autor, comentario, valoracion))
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
                <View style={stylesModal.containerIcons}>
                    <Icon
                        raised
                        reverse
                        name={props.favorita ? 'heart' : 'heart-o'}
                        type='font-awesome'
                        color='#f50'
                        onPress={() => props.favorita ? console.log('La excursión ya se encuentra entre las favoritas') : props.marcarFavorito()}
                    />
                    <Icon
                        raised
                        reverse
                        name='pencil'
                        type='font-awesome'
                        color='blue'
                        onPress={() => props.showModal()}
                    />
                </View>
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
    constructor(props) {
        super(props);
        this.state = {
            valoracion: 5,
            autor: '',
            comentario: '',
            showModal: false
        };
    }

    resetForm() {
        this.setState({
            valoracion: 5,
            autor: '',
            comentario: '',
            dia: '',
            showModal: false
        });
    }

    gestionarComentario(excursionId) {
        const { autor, comentario, valoracion } = this.state;

        if (!autor.trim() || !comentario.trim() || !valoracion) {
            alert('Por favor, rellena todos los campos antes de enviar.');
            return;
        }
        this.props.postComentario(excursionId, autor, comentario, valoracion);
        this.resetForm();
    }

    handleCerrar = () => {
        this.resetForm();
        this.toogleModal(false);
    };

    marcarFavorito(excursionId) {
        this.props.postFavorito(excursionId);
    }
    toogleModal = () => {
        this.setState({ showModal: !this.state.showModal });
    }

    render() {
        const { excursionId } = this.props.route.params;
        const RenderComentarios = ({ item, index }) => {
            return (
                <>
                    <ListItem
                        key={index}>
                        <ListItem.Content>
                            <ListItem.Title>{item.autor}</ListItem.Title>
                            <ListItem.Subtitle>{formatDate(item.dia)}</ListItem.Subtitle>
                            <Text>{item.valoracion.toString()}/5</Text>
                            <Text>{item.comentario}</Text>
                        </ListItem.Content>
                    </ListItem>
                </>
            );
        };
        return (
            <>
                <Modal
                    animationType="slide"
                    transparent={false}
                    visible={this.state.showModal}
                >
                    <View style={stylesModal.container}>
                        <Rating
                            startingValue={this.state.valoracion}
                            imageSize={40}
                            showRating={true}
                            onFinishRating={value => this.setState({ valoracion: value })}
                            tintColor="#fff"
                            ratingColor="#f1c40f"
                            ratingBackgroundColor="#ccc"
                        />
                        <Input
                            placeholder=' Autor'
                            onChangeText={value => this.setState({ autor: value })}
                            leftIcon={<Icon name='user-o' size={28} type='font-awesome' />}
                            inputStyle={stylesModal.inputText}
                        />
                        <Input
                            placeholder='Comentario'
                            onChangeText={value => this.setState({ comentario: value })}
                            leftIcon={<Icon name='comment-o' size={28} type='font-awesome' />}
                            inputStyle={stylesModal.inputText}
                            multiline
                        />
                        <TouchableOpacity onPress={() => this.gestionarComentario(excursionId)}>
                            <Text style={stylesModal.buttonText}>ENVIAR</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.handleCerrar()}>
                            <Text style={stylesModal.buttonText}>CANCELAR</Text>
                        </TouchableOpacity>
                    </View>
                </Modal>
                <ScrollView>
                    <ProcesoCarga
                        elemento={
                            <RenderExcursion
                                excursion={this.props.excursiones.excursiones[+excursionId]}
                                favorita={this.props.favoritos.favoritos.some(el => el === excursionId)}
                                marcarFavorito={() => this.marcarFavorito(excursionId)}
                                showModal={() => this.toogleModal()}
                            />
                        }
                        isLoading={this.props.excursiones.isLoading}
                        errMess={this.props.excursiones.errMess}
                    />
                    <ProcesoCarga
                        elemento={
                            <Card>
                                <Card.Title>Comentarios</Card.Title>
                                <Card.Divider />
                                <FlatList
                                    data={this.props.comentarios.comentarios.filter((comentario) => comentario.excursionId === excursionId)}
                                    renderItem={RenderComentarios}
                                    keyExtractor={item => item.id.toString()}
                                    scrollEnabled={false}
                                />
                            </Card>
                        }
                        isLoading={this.props.comentarios.isLoading}
                        errMess={this.props.comentarios.errMess}
                    />

                </ScrollView>
            </>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DetalleExcursion);