import { getInfoVideo } from "../helpers/api";

const getId = (url) => {
  var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  var match = url.match(regExp);

  if (match && match[2].length === 11) {
    return match[2];
  } else {
    return "error";
  }
};

const getInfoFromAUrl = (url) => {
  const id = getId(url);

  return new Promise(async (resolve, reject) => {
    try {
      const data = await getInfoVideo(id)
      resolve(data)
    } catch (error) {
      reject(error.message || 'Get info fail')
    }
  })
}

export { getId, getInfoFromAUrl };
