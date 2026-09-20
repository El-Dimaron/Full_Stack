export const API_ROUTES = {
  items: "/api/items",
  item: (id: string) => `/api/items/${id}`,
  users: "/api/users",
  auth: {
    login: "/api/auth/login",
    register: "/api/auth/register",
    logout: "/api/auth/logout",
  },

  deleteAllItems: "/api/test/delete-all-items",
};
