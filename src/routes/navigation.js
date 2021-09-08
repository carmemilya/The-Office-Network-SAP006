export const navigation = (route) => {
  window.history.pushState({}, '', route);
  const popStateEvent = new PopStateEvent('popstate', { state: {} });
  dispatchEvent(popStateEvent);
};
