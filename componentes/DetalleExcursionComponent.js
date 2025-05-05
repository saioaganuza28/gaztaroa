import React, { Component, useState } from 'react';
import styles from './EstilosComponentes';
import { Text, View, ScrollView, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import { Card, Icon, Input } from '@rneui/themed';
import { ListItem } from '@rneui/themed';
import { baseUrl } from '../comun/comun';
import { textoDetalleExcursion } from './EstilosComponentes';
import { connect } from 'react-redux';
import { IndicadorActividad } from './IndicadorActividadComponent';
import { postFavorito } from '../redux/ActionCreators';
import { Rating } from 'react-native-ratings';
import { Button } from '@rneui/base';
import { stylesModal } from './EstilosComponentes';

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
                <View style={stylesModal.containerIcons}>
                    <Icon
                        raised
                        reverse
                        name={props.favorita ? 'heart' : 'heart-o'}
                        type='font-awesome'
                        color='#f50'
                        onPress={() => props.favorita ? console.log('La excursión ya se encuentra entre las favoritas') : props.onPress()}
                    />
                    <Icon
                        raised
                        reverse
                        name='pencil'
                        type='font-awesome'
                        color='blue'
                        onPress={() => props.abrirModal()}
                    />
                </View>
            </Card>
        );
    }
    else {
        return (<View />);
    }
}


function RenderModal(props) {
    const {
        cerrarModal,
        enviar,
        valoracionInicial
    } = props;

    return (
        <Modal
            animationType="slide"
            transparent={false}
            visible={visible}
            onRequestClose={cerrarModal}
        >
            <View style={stylesModal.container}>
                <Rating
                    startingValue={valoracionInicial}
                    imageSize={40}
                    showRating={true}
                    onFinishRating={(value) => setValoracion(value)}
                    tintColor="#fff"
                    ratingColor="#f1c40f"
                    ratingBackgroundColor="#ccc"
                />
                <Input
                    placeholder=' Autor'
                    value={autor}
                    onChangeText={setAutor}
                    leftIcon={<Icon name='user-o' size={28} type='font-awesome' />}
                    inputStyle={stylesModal.inputText}
                />
                <Input
                    placeholder='Comentario'
                    value={comentario}
                    onChangeText={setComentario}
                    leftIcon={<Icon name='comment-o' size={28} type='font-awesome' />}
                    inputStyle={stylesModal.inputText}
                    multiline
                />
                <TouchableOpacity onPress={enviar}>
                    <Text style={stylesModal.buttonText}>ENVIAR</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={cerrarModal}>
                    <Text style={stylesModal.buttonText}>CANCELAR</Text>
                </TouchableOpacity>
            </View>
        </Modal>
    );
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
            valoracion: this.valoracion,
            autor: '',
            comentario: '',
            dia: '',
            showModal: false
        });
    }

    handleEnviar = () => {
        Enviar({ autor, comentario, valoracion });
        resetForm();
    };

    marcarFavorito(excursionId) {
        this.props.postFavorito(excursionId);
    }
    toogleModal = () => {
        this.setState({ showModal: !this.state.showModal });
    }
    render() {
        const { excursionId } = this.props.route.params;
        return (
            <>
                {this.state.showModal == true && (
                    <RenderModal
                        valoracionInicial={this.valoracion}
                        cerrarModal={() => this.resetForm()}
                        enviar={() => this.handleEnviar()}>
                    </RenderModal>)
                }
                {!this.state.showModal && (
                    <ScrollView>
                        <ProcesoCarga
                            elemento={<RenderExcursion
                                excursion={this.props.excursiones.excursiones[+excursionId]}
                                favorita={this.props.favoritos.favoritos.some(el => el === excursionId)}
                                onPress={() => this.marcarFavorito(excursionId)}
                                abrirModal={() => this.abrirModal()}
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

                    </ScrollView>)
                }
            </>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DetalleExcursion);