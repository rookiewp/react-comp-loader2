import produce from 'immer';
import { takeLatest, put } from 'redux-saga/effects'
import { getStore } from './injectStore';
import isGeneratorFunction from '../util/isGeneratorFunction';

// 生成innerPut
function genInnerPut(type) {
  return (action) => {
    if (typeof action === 'object') {
      put(action)
    } else if (typeof action === 'function') {
      const store = getStore();
      store.dispatch({
        isInnerPut: true,
        data: action,
        type,
      })
    }
  }
}

// 生成saga
function genSaga(integrateObj, namespace, ctx) {
  const keys = Object.keys(integrateObj).filter(k => {
    return (k !== 'defaultState' && isGeneratorFunction(integrateObj[k]))
  });
  return function* rootSaga() {
    for (let i = 0; i < keys.length; i++) {
      yield takeLatest(`${namespace}/${keys[i]}`, function* (action) {
        const innerPut = genInnerPut(`${namespace}/${keys[i]}/innerPut`)
        yield integrateObj[keys[i]](action, ctx, innerPut);
      })
    }
  }
}

// 生成reducer
function genReducer(integrateObj, ctx) {
  const { defaultState = {} } = integrateObj;
  return function reducer(partState, action) {
    const state = partState || defaultState;
    const { type } = action;
    if (action.isInnerPut) {
      const key = Object.keys(ctx).find(key => `${ctx[key].type}/innerPut` === type)
      return produce(state, (draft) => {
        if (key) action.data(draft)
      })
    }
    return produce(state, (draft) => {
      const key = Object.keys(ctx).find(key => ctx[key].type === type)
      if (typeof ctx[key] === 'function' && !isGeneratorFunction(ctx[type])) {
        integrateObj[key](draft, action)
      }
    })
  }
}

// 生成ctx
function genCtx(integrateObj, namespace) {
  const keys = Object.keys(integrateObj).filter(k => k !== 'defaultState');
  const ctx = {};
  keys.forEach(k => {
    ctx[k] = function innerDispatch(actionPayload) {
      const store = getStore();
      const action = {
        type: `${namespace}/${k}`,
        data: actionPayload,
      }
      store.dispatch(action);
    }
    ctx[k].type = `${namespace}/${k}`;
  });

  const saga = genSaga(integrateObj, namespace, ctx);
  const reducer = genReducer(integrateObj, ctx);
  ctx.saga = saga;
  ctx.reducer = reducer;
  return ctx;
}



export default function(integrateObj, namespace) {
  return genCtx(integrateObj, namespace);
}