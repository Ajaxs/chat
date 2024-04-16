<template>
  <div
    class="message"
    :class="{
      mine: message.user_id === user?.id,
      unreaded: message.timestamp > timestampLastReadedMessage,
    }"
    :data-timestamp="message.timestamp"
  >
    <div class="header">
      {{ message.time }}
    </div>
    <div class="body">{{ message.text }}</div>
  </div>
</template>

<script setup>
const { message, user, timestampLastReadedMessage } = defineProps({
  message: Object,
  user: Object,
  timestampLastReadedMessage: {
    type: Number,
    default() {
      return 0;
    },
  },
});
</script>

<style lang="less" scoped>
.message {
  max-width: 500px;
  background-color: #ebeaea;
  border-radius: 10px;
  color: #858787;
  padding: 10px;
  display: inline-block;
  align-self: flex-start;
  margin-bottom: 10px;

  &.mine {
    align-self: flex-end;
    background-color: #628ff5;
    color: #fff;
  }

  &.unreaded {
    opacity: 0.4;
  }

  .header {
    margin-bottom: 5px;
    font-size: 12px;
    opacity: 0.6;
    text-align: right;
  }
}
</style>
