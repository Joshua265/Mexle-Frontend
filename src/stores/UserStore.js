export function createUserStore() {
  return {
    loggedIn: false,
    username: "",
    password: "",
    authToken: "",
    role: "admin",

    login(username, password) {
      this.loggedIn = true;
      this.username = username;
      this.password = password;
    },
  };
}
