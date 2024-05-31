import { defineStore } from 'pinia';
import httpRequest from '../config/httpRequest';
import { socket } from '../config/socket';

export const useMessagesStore = defineStore('messages', {
  state: () => ({
    messages: [],
    readedMessages: JSON.parse(localStorage.getItem('readedMessages')) || {},
  }),
  getters: {
    getMessagesInDialog(state) {
      return (dialogId) => {
        const messages = state.messages.filter(
          (item) => item.dialog_id === dialogId
        );
        return Object.groupBy(messages, ({ date }) => date);
      };
    },
    getLastMessageInDialog(state) {
      return (dialogId) => {
        return state.messages
          .filter((item) => item.dialog_id === dialogId)
          .pop();
      };
    },
    getTimestampLastReadedMessage(state) {
      return (dialogId) => {
        return state.readedMessages[dialogId] || 0;
      };
    },
    getUnreadedMessagesInDialog(state) {
      return (dialogId, timestamp) => {
        return state.messages.filter(
          (item) => item.dialog_id === dialogId && item.timestamp > timestamp
        ).length;
      };
    },
  },
  actions: {
    bindEvents() {
      socket.on('new-message', (data) => {
        this.messages.push(JSON.parse(data));
      });
    },
    async fetchMessagesDilog() {
      try {
        const response = await httpRequest.get('/api/messages');
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
    updateReadedMessage(dialogId, timestamp) {
      this.readedMessages[dialogId] = timestamp;
      localStorage.setItem(
        'readedMessages',
        JSON.stringify(this.readedMessages)
      );
    },
    async sendMessage(message) {
      await httpRequest.post('/api/messages', message);
    },
  },
});
