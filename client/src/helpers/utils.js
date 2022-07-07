function setLocalStorage(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.log("some error occured while setting localStorage value");
  }
}
function getLocalStorage(key) {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : null;
  } catch (error) {
    console.log("some error occured while parsing value");
  }
}
function clearLocalStorage(key) {
  localStorage.removeItem(key);
}
function isAuthenticated() {
  if (getLocalStorage("token")) return true;
  return false;
}
function decodeToken(token) {
  try {
        return JSON.parse(atob(token.split('.')[1]));
  } catch (error) {
    console.log("not a valid token");
  }
}
function getToken() {
  try {
    const token = getLocalStorage("token");
    return token?decodeToken(token):null;
  } catch (error) {}
}
export {
  setLocalStorage,
  getLocalStorage,
  clearLocalStorage,
  isAuthenticated,
  getToken,
  decodeToken
};
