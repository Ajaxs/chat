<template>
  <div
    class="dialog-item"
    :class="{ active: dialog.id === currentDialogId }"
    @click="goChat(dialog.id)"
  >
    <div class="avatar">
      <img src="https://avatar.iran.liara.run/public/5" width="40" alt="" />
    </div>
    <div class="body">
      <div class="username">
        {{ dialog.title }}
      </div>
      <div class="message">
        <template v-if="lastMessage">
          {{ lastMessage.text }}
        </template>
        <template v-else> Нет сообщений </template>
      </div>
    </div>
    <div class="actions">
      <div class="date">13.03.2024</div>
      <div class="count" v-if="unreadedMessageCount > 0">
        {{ unreadedMessageCount }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter, useRoute } from 'vue-router';
import { useMessagesStore } from '../../../store/messages';
import { computed } from 'vue';

const { dialog } = defineProps({
  dialog: Object,
});

const router = useRouter();
const route = useRoute();
const messagesStore = useMessagesStore();

const timestampLastReadedMessage = computed(() => {
  return messagesStore.getTimestampLastReadedMessage(dialog.id);
});

const lastMessage = computed(() => {
  return messagesStore.getLastMessageInDialog(dialog.id);
});

const currentDialogId = computed(() => {
  return Number(route.params.id);
});

const unreadedMessageCount = computed(() => {
  return messagesStore.getUnreadedMessagesInDialog(
    dialog.id,
    timestampLastReadedMessage.value
  );
});

const goChat = (id) => {
  router.push(`/chat/${id}`);
};
</script>

<style lang="less" scoped>
.dialog-item {
  display: flex;
  padding: 20px;
  align-items: center;
  border-bottom: 1px solid #eaeaea;
  cursor: pointer;

  &.active {
    background-color: #e8e8e8;
  }

  &:hover {
    background: #e0e0e0;
  }

  .avatar {
    margin-right: 10px;

    img {
      border-radius: 50%;
      border: 1px solid #bbb;
    }
  }

  .body {
    flex-grow: 1;
    max-width: 200px;

    .username {
      font-weight: 700;
      margin-bottom: 5px;
      color: #628ff5;
    }

    .message {
      color: #858787;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }

  .actions {
    text-align: right;
    align-self: flex-start;

    .date {
      margin-bottom: 6px;
      color: #858787;
      font-size: 12px;
    }

    .count {
      display: inline-block;
      background-color: #336af3;
      color: #fff;
      text-align: center;
      padding: 2px 7px;
      border-radius: 10px;
    }
  }
}
</style>
