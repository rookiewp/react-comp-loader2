const defaultState = {
  name: 'wp',
  age: 28,
  otherInfo: {
    sex: 1,
    address: 'xxx',
  }
};

export default {
  defaultState,

  changeData(draft, action) {
    Object.assign(draft, action.data);
  },

  // 箱空
  * emptyBox(action, ctx, put) {
    const data1 = yield new Promise((r) => {
      setTimeout(() => {
        r('asyncData1')
      }, 2000)
    })
    console.log('async1')
    const data2 = yield new Promise((r) => {
      setTimeout(() => {
        r('asyncData2')
      }, 2000)
    })
    console.log('async2')
    yield put((draft) => {
      draft.name = 'async';
    })
  },
};