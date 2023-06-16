const baseUrl = "https://soberaniabackend.onrender.com/api";
const localUrl = "http://localhost:5000/api";
const testUrl = "http://192.168.0.55:5000";

const fetchSinToken = (endpoint, data, method = "GET") => {
  const url = `${baseUrl}/${endpoint}`;

  if (method === "GET") {
    return fetch(url);
  } else {
    return fetch(url, {
      method,
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(data),
    })
  }
};

const fetchConToken = (endpoint, data, method = "GET") => {
  const url = `${localUrl}/${endpoint}`;
  const token = localStorage.getItem("token") || "";

  //SI ES GET ENTONCES MANDA EL TOKEN
  if (method === "GET") {
    return fetch(url, {
      method,
      headers: {
        "x-token": token,
      },
    });
  } else {
    //SINO HACE UNA PETICION POST Y MANDA LOS DATOS Y LOS CONVIERTE EN JSON
    return fetch(url, {
      method,
      headers: {
        "Content-type": "application/json",
        "x-token": token,
      },
      body: JSON.stringify(data),
    });
  }
};

const fetchConTokenFormData = (endpoint, data, method = "GET") => {
  const url = `${baseUrl}/${endpoint}`;
  const token = localStorage.getItem("token") || "";

  //SI ES GET ENTONCES MANDA EL TOKEN
  if (method === "GET") {
    return fetch(url, {
      method,
      headers: {
        "x-token": token,
      },
    });
  } else {
    //SINO HACE UNA PETICION POST Y MANDA LOS DATOS Y LOS CONVIERTE EN JSON
    return fetch(url, {
      method,
      headers: {
        "Content-type": "multipart/form-data",
        "x-token": token,
      },
      body: JSON.stringify(data),
    });
  }
};

const fetchConTokenSinFile = (endpoint, method = "GET") => {
  const url = `${baseUrl}/${endpoint}`;
  const token = localStorage.getItem("token") || "";

  //SI ES GET ENTONCES MANDA EL TOKEN
  if (method === "GET") {
    return fetch(url, {
      method,
      headers: {
        "x-token": token,
      },
    });
  } else {
    //SINO HACE UNA PETICION POST Y MANDA LOS DATOS Y LOS CONVIERTE EN JSON
    return fetch(url, {
      method,
      headers: {
        "Content-type": "application/json",
        "x-token": token,
      }
    });
  }
};

const fetchConTokenFiles = (endpoint, data, method = "GET") => {
  const url = `${baseUrl}/${endpoint}`;

  const token = localStorage.getItem("token") || "";

  return fetch(url, {
    method,
    headers: {
      "x-token": token,
    },
    body: data,
    redirect: "follow",
  });
};

export { fetchSinToken, fetchConToken, fetchConTokenFiles, fetchConTokenSinFile, fetchConTokenFormData };
