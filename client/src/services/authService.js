const logout = () => {
  localStorage.removeItem("user");
};

const getCurrentUser = () => {
  return localStorage.getItem("user");
};

const AuthService = {
  logout,
  getCurrentUser,
};

export default AuthService;
