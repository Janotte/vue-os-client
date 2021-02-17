import http from "../http-common";

class UserDataService {
  getAll() {
    return http.get("/users");
  }

  get(code) {
    return http.get(`/users/${code}`);
  }

  create(data) {
    return http.post("/users", data);
  }

  update(code, data) {
    return http.put(`/users/${code}`, data);
  }

  delete(code) {
    return http.delete(`/users/${code}`);
  }

  deleteAll() {
    return http.delete(`/users`);
  }


  findByFirstName(firstName) {
    return http.get(`/users/firstName?firstName=${firstName}`);
  }

  findByEmail(email) {
    return http.get(`/users/email?email=${email}`);
  }
}

export default new UserDataService();