import createSagaMiddleware from '@redux-saga/core';
import { logger } from 'app/middleware';
import { rootReducer, RootState } from 'app/reducers';
import mySaga from 'app/saga/mySaga';
import { applyMiddleware, createStore, Store } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

export function configureStore(initialState?: RootState): Store<RootState> {
  const sagaMiddleware = createSagaMiddleware();
  let middleware = applyMiddleware(logger, sagaMiddleware);

  if (process.env.NODE_ENV !== 'production') {
    middleware = composeWithDevTools(middleware);
  }

  const store = createStore(rootReducer as any, initialState as any, middleware) as Store<
    RootState
  >;

  sagaMiddleware.run(mySaga);

  if (module.hot) {
    module.hot.accept('app/reducers', () => {
      const nextReducer = require('app/reducers');
      store.replaceReducer(nextReducer);
    });
  }

  return store;
}

export const store = configureStore();
