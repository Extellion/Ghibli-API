import {connect} from 'react-redux';

import {APP_GET_PROPS} from '../actions/app';
import {getDefaultProps} from '../selectors/app';
import App from '../components/App';

const mapStateToProps = (state) => {
  const defaultProps = getDefaultProps(state);
  return {
    defaultProps
  };
};

const mapDispatchToProps = (dispatch) => ({
  getProps: () => dispatch({type: APP_GET_PROPS})
});

const app = connect(mapStateToProps, mapDispatchToProps)(App);

export default app;
