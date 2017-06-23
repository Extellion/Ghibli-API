import {createStore, applyMiddleware, compose} from 'redux'
import createSagaMiddleware from 'redux-saga';
import devTools from 'remote-redux-devtools';

import reducers from './reducers/';
import sagas from './sagas/';

const configureStore = () => {
  const sagaMiddleware = createSagaMiddleware();

  const store = createStore(
    reducers,
    compose(
      applyMiddleware(
        sagaMiddleware
      ),
      devTools(),
    ),
  );

  sagaMiddleware.run(sagas);

  return store;
};

export default configureStore;
