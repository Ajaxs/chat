import { defineStore } from 'pinia';
import httpRequest from '../config/httpRequest';
import { socket } from '../config/socket';

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
    searchContact(state) {
      return (usersIds) =>
        state.dialogs.find(
          (item) =>
            item.is_group === 0 &&
            JSON.stringify(item.users) === JSON.stringify(usersIds)
        );
    },
  },
  actions: {
    bindEvents() {
      socket.on('new-dialog', (data) => {
        this.dialogs.push(JSON.parse(data));
      });
    },
    async fetchDialogs() {
      try {
        const response = await httpRequest.get('/api/dialogs');
        this.dialogs = response.data;
      } catch (error) {
        console.error(error);
      }
    },
    async createDialog(dialog) {
      try {
        const response = await httpRequest.post('/api/dialogs', dialog);
        return response.data;
      } catch (error) {
        console.error(error);
      }
    },
    changeDraftToDialog(draftId, dialogId) {
      this.dialogs = this.dialogs.map((item) => {
        if (item.id === draftId) {
          delete item.is_draft;
          return { ...item, id: dialogId };
        }
        return item;
      });
    },
    createDraft(dialog) {
      this.dialogs.push(dialog);
    },
  },
});
