import { defineStore } from 'pinia';
import httpRequest from '../config/httpRequest';
import { socket } from '../config/socket';

export const useUsersStore = defineStore('users', {
  state: () => ({
    authUser: {},
    users: [],
  }),
  getters: {
    getAuthUser(state) {
      return state.users.find((item) => item.id === state.authUser.id);
    },
    getUser(state) {
      return (id) => state.users.find((item) => item.id === id);
    },
    getUsersOnline(state) {
      return (usersId) =>
        state.users.filter(
          (item) => usersId.includes(item.id) && item.is_online
        ).length;
    },
    getUsers(state) {
      return state.users;
    },
  },
  actions: {
    bindEvents() {
      socket.on('update-user-status', (data) => {
        this.users = this.users.map((item) => {
          if (item.id === data.id) {
            return { ...item, is_online: data.is_online };
          }
          return item;
        });
      });
    },
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
