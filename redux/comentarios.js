import * as ActionTypes from './ActionTypes';

export const comentarios = (state = { errMess: null, comentarios: [] }, action) => {
  switch (action.type) {

    case ActionTypes.ADD_COMENTARIOS:
      return { ...state, errMess: null, comentarios: action.payload };
      
    case ActionTypes.ADD_COMENTARIO:
      const nuevoComentario = {
        id: state.comentarios.length,
        ...action.payload
      };

      return {
        ...state,
        comentarios: state.comentarios.concat(nuevoComentario)
      };

    case ActionTypes.COMENTARIOS_FAILED:
      return { ...state, errMess: action.payload };

    default:
      return state;
  }
};