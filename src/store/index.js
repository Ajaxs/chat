import { createStore } from 'vuex'

export default createStore({
  state: {
    profile: {
      id: 1,
      contacts: [2,3,5],
      dialogs: [1, 2]
    },
    users: [
      {
        id: 1,
        first_name: 'Oliver',
        last_name: 'Smith',
        avatar: 'User 1',
      },
      {
        id: 2,
        first_name: 'Jack',
        last_name: 'Williams',
        avatar: 'User 2',
      },
      {
        id: 3,
        first_name: 'Harry',
        last_name: 'Brown',
        avatar: 'User 3',
      },
      {
        id: 4,
        first_name: 'Charley',
        last_name: 'Davis',
        avatar: 'User 4',
      },
      {
        id: 5,
        first_name: 'Thomas',
        last_name: 'Miller',
        avatar: 'User 5',
      },
    ],
    dialogs: [
      {
        id: 1,
        contacts: [1,2],
      },
      {
        id: 2,
        contacts: [1,3,5],
      }
    ],
    messages: [
      {
        id: 1,
        user_id: 1,
        dialog_id: 1,
        text: 'What about going to the theatre this weekend, Jane?',
        date: new Date(2022, 9, 25, 10, 11, 23),
      },
      {
        id: 2,
        user_id: 2,
        dialog_id: 1,
        text: 'I don’t mind, Mark. Do you know what is on at our Opera House?',
        date: new Date(2022, 9, 25, 10, 11, 58),
      },
      {
        id: 3,
        user_id: 1,
        dialog_id: 1,
        text: 'It’s “The Queen of Spades” by Tchaikovsky. And I am lucky enough to have two tickets for this Sunday. I’d like to invite you, Jane.',
        date: new Date(2022, 9, 25, 10, 13, 46),
      },
      {
        id: 3,
        user_id: 1,
        dialog_id: 1,
        text: 'It’s OK',
        date: new Date(2022, 9, 25, 10, 16, 12),
      }
    ],
  },
  getters: {
  },
  mutations: {
    addMessage (state, message) {
      state.messages.push(message);
    }
  },
  actions: {
    addMessage({ commit }, message) {
      commit('addMessage', message);
    },
  },
  modules: {
  }
})
