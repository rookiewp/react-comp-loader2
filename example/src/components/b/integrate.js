
const defaultState = {
  name: 'jl',
  age: 28,
  otherInfo: {
    sex: 0,
    address: 'yyyy',
  }
};

export default {
  defaultState,

  changeData(draft, action) {
    Object.assign(draft, action.data);
  },

  // 箱空
  * emptyBox(action, ctx) {
    yield new Promise((r) => {
      setTimeout(() => {
        r(1)
      }, 2000)
    })
  },
};