import { defineStore } from 'pinia';
import httpRequest from '../config/httpRequest';

export const useMessagesStore = defineStore('messages', {
  state: () => ({
    messages: [],
  }),
  getters: {
    getMessages(state) {
      return state.messages;
    },
  },
  actions: {
    async fetchMessagesDilog(id) {
      try {
        const response = await httpRequest.get('/api/messages', {
          params: {
            dialog_id: id,
          },
        });
        this.messages = response.data;
      } catch (error) {
        console.error(error);
      }
    },
    async fetchMessages() {
      try {
        const response = await httpRequest.get('/api/messages');
        this.messages = response.data;
      } catch (error) {
        console.error(error);
      }
    },
  },
});
