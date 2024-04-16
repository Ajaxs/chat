<template>
  <div class="content">
    <div class="wrap-messages">
      <div
        class="messages"
        id="messages"
        v-if="Object.keys(messages).length > 0"
      >
        <template v-for="(group, date) in messages" :key="date">
          <div class="messages-date">{{ date }}</div>
          <message
            v-for="message in group"
            :key="message.id"
            :message
            :user="authUser"
            :timestamp-last-readed-message="timestampLastReadedMessage"
          />
        </template>
      </div>
      <div class="no-messages" v-else>Нет сообщений в этом диалоге</div>
    </div>
  </div>
</template>

<script setup>
import { computed, watch, onMounted, onUpdated, nextTick } from 'vue';
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

const observers = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const messageDetect = entry.target;
        messagesStore.updateReadedMessage(
          dialogId.value,
          Number(messageDetect.dataset.timestamp)
        );
        observer.unobserve(messageDetect);
      }
    });
  },
  {
    root: document.querySelector('.wrap-messages'),
    rootMargin: '0px',
    threshold: 1,
  }
);

const updateMessagesObserver = () => {
  const messagesList = document.querySelectorAll('.message.unreaded');
  messagesList.forEach((elem) => {
    observers.observe(elem);
  });
};

const scrollUnreadedMessages = () => {
  const lastReadedMessage = document.querySelector(
    `[data-timestamp="${timestampLastReadedMessage.value}"]`
  );
  //console.log(lastReadedMessage, timestampLastReadedMessage.value);
  if (lastReadedMessage) {
    lastReadedMessage.scrollIntoView({ block: 'end', behavior: 'auto' });
  }
};

const scrollEndMessage = () => {
  document
    .querySelector('#messages')
    .scrollIntoView({ block: 'end', behavior: 'auto' });
};

watch(dialogId, async () => {
  await nextTick();
  scrollUnreadedMessages();
});

onMounted(async () => {
  updateMessagesObserver();
  await nextTick();
  scrollUnreadedMessages();
});

onUpdated(() => {
  updateMessagesObserver();
});

defineExpose({ scrollEndMessage });
</script>

<style lang="less" scoped>
.content {
  flex-grow: 1;

  .wrap-messages {
    overflow-y: auto;
    min-height: 100%;
    height: 100px;

    .messages {
      padding: 0 20px;
      margin: 20px 0;
      display: flex;
      flex-direction: column;
      flex-grow: 1;
      justify-content: flex-end;
      width: 100%;
      min-height: 100%;
    }

    .messages-date {
      text-align: center;
      margin: 25px 0;
    }

    .no-messages {
      padding: 20px;
      text-align: center;
    }
  }
}
</style>
