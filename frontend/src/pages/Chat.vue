<template>
  <div class="page-chat">
    <sidebar />
    <div class="chat-content">
      <router-view />
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useUsersStore } from '../store/users';
import { useDialogStore } from '../store/dialogs';
import { useMessagesStore } from '../store/messages';
import Sidebar from '../components/chat/sidebar/Sidebar.vue';

const route = useRoute();
const usersStore = useUsersStore();
const messagesStore = useMessagesStore();
const dialogsStore = useDialogStore();

onMounted(async () => {
  usersStore.fetchAuthUser();
  dialogsStore.fetchDialogs();
  usersStore.fetchUsers();
  messagesStore.fetchMessagesDilog(Number(route.params.id));
});
</script>

<style lang="less" scoped>
.page-chat {
  width: 1200px;
  min-height: 1000px;
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
