import React, { Component } from 'react';
import { ListItem, Avatar } from '@rneui/themed';
import { SafeAreaView, FlatList, View, Text } from 'react-native';
import { baseUrl } from '../comun/comun';
import { connect } from 'react-redux';
import { IndicadorActividad } from './IndicadorActividadComponent';

const mapStateToProps = state => {
    return { excursiones: state.excursiones }
}


class Calendario extends Component {
    render() {

        const { navigate } = this.props.navigation;

        const renderCalendarioItem = ({ item, index }) => {
            return (
                <ListItem
                    key={index}
                    onPress={() => navigate('DetalleExcursion', { excursionId: item.id })}
                    bottomDivider>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Avatar source={{ uri: baseUrl + item.imagen }} size="medium" />
                        <ListItem.Content style={{ marginLeft: 20 }}>
                            <ListItem.Title>{item.nombre}</ListItem.Title>
                            <ListItem.Subtitle ellipsizeMode="tail">
                                {item.descripcion}
                            </ListItem.Subtitle>
                        </ListItem.Content>
                    </View>
                </ListItem>
            );
        };
        if (this.props.excursiones.isLoading) {
            return (
                <IndicadorActividad />
            );
        }
        else if (this.props.excursiones.errMess) {
            return (
                <View>
                    <Text>{this.props.excursiones.errMess}</Text>
                </View>
            );
        }
        else {

            return (
                <SafeAreaView>
                    <FlatList
                        data={this.props.excursiones.excursiones}
                        renderItem={renderCalendarioItem}
                        keyExtractor={item => item.id.toString()}
                    />
                </SafeAreaView>
            );
        }
    }
}

export default connect(mapStateToProps)(Calendario);