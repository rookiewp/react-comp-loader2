let store;
export function injectStore(s) {
  store = s;
}

export function getStore() {
  return store;
}
