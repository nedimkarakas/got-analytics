const auth = {
    isAuthenticated() {
        return !!localStorage.getItem('token');
    },
    getUser() {
        return JSON.parse(localStorage.getItem('user'));
    },
    logout() {
      localStorage.clear();
    }
}

export default auth;
