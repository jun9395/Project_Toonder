import axios from "axios";

const API_URL = process.env.REACT_APP_SERVER_URL;

const getLikes = async () => {
  const token = JSON.parse(localStorage.getItem("user"));
  const config = {
    headers: {
      Authorization: `JWT ${token}`,
    },
  };
  try {
    const res = await axios.get(`${API_URL}/recommends/like/`, config);
    return res;
  } catch (err) {
    console.log(err);
  }
};

const getFavs = async () => {
  const token = JSON.parse(localStorage.getItem("user"));
  const config = {
    headers: {
      Authorization: `JWT ${token}`,
    },
  };
  try {
    const res = await axios.get(`${API_URL}/recommends/favorite/`, config);
    return res;
  } catch (err) {
    console.log(err);
  }
};

const postFav = async (number) => {
  const token = JSON.parse(localStorage.getItem("user"));
  const config = {
    headers: {
      Authorization: `JWT ${token}`,
    },
  };
  try {
    const res = await axios.post(
      `${API_URL}/recommends/favorite/${number}/`,
      { key: "value" },
      config
    );
    return res;
  } catch (err) {
    console.log(err);
  }
};

const postLike = async (number) => {
  const token = JSON.parse(localStorage.getItem("user"));
  const config = {
    headers: {
      Authorization: `JWT ${token}`,
    },
  };
  try {
    const res = await axios.post(
      `${API_URL}/recommends/like/${number}/`,
      { key: "value" },
      config
    );
    return res;
  } catch (err) {
    console.log(err);
  }
};

const recommStyle = async () => {
  return axios.get(`${API_URL}/recommends/recomm_style/`);
};

const exports = {
  getLikes,
  getFavs,
  postLike,
  postFav,
  recommStyle,
};

export default exports;
