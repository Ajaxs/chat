<template>
  <div class="content">
    <div class="messages-wrap">
      <div class="messages" v-if="messages.length > 0">
        <message v-for="message in messages" :key="message.id" :message />
      </div>
      <div v-else>Нет сообщений в этом диалоге</div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useMessagesStore } from '../../../store/messages';
import Message from './Message.vue';

const messagesStore = useMessagesStore();

const messages = computed(() => {
  return messagesStore.getMessages;
});
</script>

<style lang="less" scoped>
.content {
  flex-grow: 1;
  padding: 20px;

  .messages-wrap {
    overflow-y: auto;
    min-height: 100%;

    .messages {
      display: flex;
      flex-direction: column;
      flex-grow: 1;
      justify-content: flex-end;
      width: 100%;
      min-height: 100%;
    }
  }
}
</style>
