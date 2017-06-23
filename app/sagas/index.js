import {fork} from 'redux-saga/effects'

import app from './app';

export default function* root() {
  yield [
    fork(app)
  ];
}
