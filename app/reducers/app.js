import {
  APP_GET_PROPS_SUCCESS
} from '../actions/app';

const initialState = {
  defaultProps: undefined
};

const app = (state = initialState, {type, payload}) => {
  switch(type) {
    case APP_GET_PROPS_SUCCESS:
      return Object.assign({}, state, {
        defaultProps: 'Project is working !'
      });
    default:
      return state;
  }
};

export default app;
