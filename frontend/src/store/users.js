import { defineStore } from 'pinia';
import httpRequest from '../config/httpRequest';

export const useUsersStore = defineStore('users', {
  state: () => ({
    authUser: null,
    users: [],
  }),
  getters: {
    getAuthUser(state) {
      return state.users.find((item) => item.id === state.authUser.id);
    },
    getUser(state) {
      return (id) => state.users.find((item) => item.id === id);
    },
    getUsers(state) {
      return state.users;
    },
  },
  actions: {
    async fetchAuthUser() {
      try {
        const response = await httpRequest.get('/api/auth/user');
        this.authUser = response.data;
      } catch (error) {
        console.error(error);
      }
    },
    async fetchUsers() {
      try {
        const response = await httpRequest.get('/api/users');
        this.users = response.data;
      } catch (error) {
        console.error(error);
      }
    },
  },
});
