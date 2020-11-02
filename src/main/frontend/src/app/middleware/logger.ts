import { Middleware } from 'redux';

/*
 * Logger for the development environment, which outputs the App actions.
 */
export const logger: Middleware = (store) => (next) => (action) => {
  if (process.env.NODE_ENV !== 'production') {
    console.log(action);
  }
  return next(action);
};
