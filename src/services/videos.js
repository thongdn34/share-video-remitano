import { database } from "../firebase";

const db = database.ref("videos");

class VideoDataService {
  getAll() {
    return db.once('value');
  }

  create(video) {
    return db.push(video);
  }

  update(key, value) {
    console.log('value', value)
    return database.ref(`videos/${key}`).update(value)
  }

  delete(key) {
    return db.child(key).remove();
  }

  deleteAll() {
    return db.remove();
  }
}

export default new VideoDataService();
