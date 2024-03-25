<template>
  <div class="page-chat">
    <sidebar />
    <div class="chat-content">
      <router-view />
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, watch } from 'vue';
import { useRouter } from 'vue-router';
import { useUsersStore } from '../store/users';
import { useDialogStore } from '../store/dialogs';
import { useMessagesStore } from '../store/messages';
import { socket } from '../config/socket';
import Sidebar from '../components/chat/sidebar/Sidebar.vue';

const usersStore = useUsersStore();
const messagesStore = useMessagesStore();
const dialogsStore = useDialogStore();
const router = useRouter();

const accessToken = localStorage.getItem('accessToken');
const refreshToken = localStorage.getItem('refreshToken');

const goLogin = async () => {
  await router.push('/auth/login');
};

if (!accessToken && !refreshToken) {
  goLogin();
}

const authUser = computed(() => {
  return usersStore.getAuthUser;
});

watch(authUser, (user) => {
  socket.auth = { userId: user.id };
  socket.connect();
});

onMounted(async () => {
  usersStore.fetchUsers();
  usersStore.fetchAuthUser();
  dialogsStore.fetchDialogs();
  messagesStore.fetchMessagesDilog();
  messagesStore.bindEvents();
});

window.addEventListener('focus', () => {
  socket.emit('change-user-status', {
    userId: authUser.value.id,
    isOnline: true,
  });
});

window.addEventListener('blur', () => {
  socket.emit('change-user-status', {
    userId: authUser.value.id,
    isOnline: false,
  });
});
</script>

<style lang="less" scoped>
.page-chat {
  width: 1200px;
  min-height: 800px;
  border-radius: 10px;
  background-color: #fff;
  display: flex;

  .chat-content {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
  }
}
</style>
