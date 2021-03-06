import axios from "axios";


const API_URL = process.env.REACT_APP_SERVER_URL;

const join = (username, email, password, passwordConfirmation) => {
  return axios.post(`${API_URL}/accounts/signup/`, {
    username,
    email,
    password,
    passwordConfirmation,
  });
};

const login = (email, password) => {
  return axios
    .post(`${API_URL}/accounts/api-token-auth/`, {
      email,
      password,
    })
    .then((response) => {
      if (response.data.token) {
        localStorage.setItem("user", JSON.stringify(response.data.token));
      }

      return response.data;
    });
};

const passwordChange = (current_password, new_password) => {
  const token = JSON.parse(localStorage.getItem("user"));
  const config = {
    headers: {
      Authorization: `JWT ${token}`,
    },
  };
  return axios
    .put(
      `${API_URL}/accounts/modify/password`,
      {
        current_password,
        new_password,
      },
      config
    )
    .then((res) => {
      return res;
    })
    .catch((err) => {
      console.log(err);
    });
};

const refresh = (token) => {
  return axios
    .post(`${API_URL}/accounts/api-token-refresh/`, { token })
    .then((res) => {
      if (res.data.token) {
        localStorage.setItem("user", JSON.stringify(res.data.token));
        return res.data.token;
      }
    })
    .catch((err) => {
      console.log(err);
    });
};
const getuser = (token) => {
  return axios.get(`${API_URL}/accounts/get_userinfo/`, {
    headers: {
      Authorization: `JWT ${token}`,
    },
  });
};

const logout = () => {
  localStorage.removeItem("user");
  alert("로그아웃 되었습니다.");
};

const recomm_overall = async () => {
  const token = JSON.parse(localStorage.getItem("user"));
  const config = {
    headers: {
      Authorization: `JWT ${token}`,
    },
  };
  const res = await axios.get(`${API_URL}/recommends/recomm_overall/`, config);
  return res;
};

const exports = {
  join,
  login,
  refresh,
  getuser,
  logout,
  recomm_overall,
  passwordChange,
};

export default exports;
