import axios from "axios";


const API_URL = process.env.REACT_APP_SERVER_URL;

const token = JSON.parse(localStorage.getItem("user"));
const config = {
  headers: {
    Authorization: `JWT ${token}`,
  },
};

const getLikes = async () => {
  if (token) {
    try {
      const res = await axios.get(`${API_URL}/recommends/like/`, config);
      return res;
    } catch (err) {
      console.log(err);
    }
  }
};

const getFavs = async () => {
  if (token) {
    try {
      const res = await axios.get(`${API_URL}/recommends/favorite/`, config);
      return res;
    } catch (err) {
      console.log(err);
    }
  }
};

const postFav = async (number) => {
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

const exports = {
  getLikes,
  getFavs,
  postLike,
  postFav,
};

export default exports;
