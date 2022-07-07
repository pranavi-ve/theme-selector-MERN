import { getLocalStorage, clearLocalStorage, setLocalStorage } from "./utils";
function api() {
  return {
    get: request("GET"),
    post: request("POST"),
  };

  function request(method) {
    return (url, body) => {
      const token = getLocalStorage("token");
      const options = {
        method,
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        //headers frame auth header
      };
      if (token)
        options.headers = {
          ...options.headers,
          Authorization: "Bearer " + token,
        };
      if (body) options.body = JSON.stringify(body);
      return fetch(url, options)
        .then((res) => handleResponse(res))
        .catch((e) => {
          throw e;
        });
    };
  }
  async function handleResponse(response) {
    try {
      if (!response.ok) {
        if ([401, 403].includes(response.status)) {
          clearLocalStorage("token");
        }
        const res = await response.json();
        return { error: res.message };
      } else {
        const authHeader = response.headers.get("authorization");
        if (authHeader) {
          const token = authHeader.replace("Bearer ", "");
          setLocalStorage("token", token);
        }
        const res = await response.json();
        return res;
      }
    } catch (error) {
      throw error;
    }
  }
}

export default api;
