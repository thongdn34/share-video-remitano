import axios from "axios";

const APIKEY = "AIzaSyB6Izic5eDN4axlvZcXZvg-6YnSbG5f1Zk";
export const $http = axios.create({
  baseURL: "https://www.googleapis.com/youtube/v3",
  timeout: 5000
});

export async function $get(path) {
  const { data } = await $http.get(path);

  return data;
}

export const getInfoVideo = async (id) => {
  const data = await $get(
    `/videos?part=snippet&id=${id}&fields=items/snippet/title,items/snippet/description&key=${APIKEY}`
  );

  return data;
};
