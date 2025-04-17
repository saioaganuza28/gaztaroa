import * as ActionTypes from './ActionTypes';

export const favoritos = (state = { favoritos: [] }, action) => {
    switch (action.type) {
        case ActionTypes.ADD_FAVORITO:
            return {
                ...state,
                favoritos: [...state.favoritos, action.payload] 
            };
        default:
            return state;
    }
};
