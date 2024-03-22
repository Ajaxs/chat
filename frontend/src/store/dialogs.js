import { defineStore } from 'pinia';
import httpRequest from '../config/httpRequest';

export const useDialogStore = defineStore('dialogs', {
  state: () => ({
    dialogs: [],
  }),
  getters: {
    getDialog(state) {
      return (id) => state.dialogs.find((item) => item.id === id);
    },
    getDialogs(state) {
      return state.dialogs;
    },
  },
  actions: {
    async fetchDialogs() {
      try {
        const response = await httpRequest.get('/api/dialogs');
        this.dialogs = response.data;
      } catch (error) {
        console.error(error);
      }
    },
  },
});
