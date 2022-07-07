import api from "../helpers/api.helper";

function register(user) {
  return api()
    .post("/api/auth/register", user)
    .then((data) => {
      return data;
    })
    .catch((err) => {
      throw err;
    });
}
function login(user) {
  return api()
    .post("/api/auth/login", user)
    .then((data) => data)
    .catch((err) => {
      throw err;
    });
}
function savePref(data) {
  return api()
    .post("/api/users/pref", data)
    .then((data) => data)
    .catch((err) => {
      throw err;
    });
}
function getPref() {
  return api()
    .get("/api/users/pref")
    .then((data) => data)
    .catch((err) => {
      throw err;
    });
}
export { register, login, savePref, getPref };
