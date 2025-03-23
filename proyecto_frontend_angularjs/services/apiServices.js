const apiServices = {
  getToken() {
    return localStorage.getItem('token');
  },

  getUserId() {
    return localStorage.getItem('userId');
  }
};
