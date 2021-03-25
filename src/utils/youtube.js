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
  const APIKEY = ''
  const apiUrl = `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${id}&fields=items/snippet/title,items/snippet/description&key=${APIKEY}`

  return new Promise(async (resolce, reject) => {
    const res = await 
  })
  try {
    
  } catch (error) {
    
  }
}

export { getId };
