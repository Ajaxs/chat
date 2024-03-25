<template>
  <div class="content">
    <div class="wrap-messages">
      <div class="messages" v-if="messages.length > 0">
        <message
          v-for="message in messages"
          :key="message.id"
          :message
          :user="authUser"
          :timestamp-last-readed-message="timestampLastReadedMessage"
        />
      </div>
      <div class="no-messages" v-else>Нет сообщений в этом диалоге</div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, onUpdated } from 'vue';
import { useRoute } from 'vue-router';
import { useMessagesStore } from '../../../store/messages';
import { useUsersStore } from '../../../store/users';
import Message from './Message.vue';

const messagesStore = useMessagesStore();
const usersStore = useUsersStore();
const route = useRoute();

const dialogId = computed(() => {
  return Number(route.params.id);
});

const messages = computed(() => {
  return messagesStore.getMessagesInDialog(dialogId.value);
});

const timestampLastReadedMessage = computed(() => {
  return messagesStore.getTimestampLastReadedMessage(dialogId.value);
});

const authUser = computed(() => {
  return usersStore.getAuthUser;
});

const options = {
  root: document.querySelector('.wrap-messages'),
  rootMargin: '0px',
  threshold: 1,
};

const observers = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const messageDetect = entry.target;
      //console.log(messageDetect);
      messagesStore.updateReadedMessage(
        dialogId.value,
        Number(messageDetect.dataset.timestamp)
      );
      observer.unobserve(messageDetect);
    }
  });
}, options);

const updateMessageObserver = () => {
  const messagesList = document.querySelectorAll('.message.unreaded');
  messagesList.forEach((elem) => {
    observers.observe(elem);
  });
};

onMounted(() => {
  updateMessageObserver();
});

onUpdated(() => {
  updateMessageObserver();
});
</script>

<style lang="less" scoped>
.content {
  flex-grow: 1;

  .wrap-messages {
    overflow-y: auto;
    min-height: 100%;
    height: 100px;

    .messages {
      padding: 20px;
      display: flex;
      flex-direction: column;
      flex-grow: 1;
      justify-content: flex-end;
      width: 100%;
      min-height: 100%;
    }

    .no-messages {
      padding: 20px;
      text-align: center;
    }
  }
}
</style>
