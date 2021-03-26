import { database } from "../firebase";

const db = database.ref('videos')

class VideoDataService {
  getAll() {
    return db;
  }

  create(video) {
    return db.push(video);
  }

  update(key, value) {
    return db.child(key).update(value);
  }

  delete(key) {
    return db.child(key).remove();
  }

  deleteAll() {
    return db.remove();
  }
}

export default new VideoDataService();
