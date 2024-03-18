<template>
  <div class="content">
    <div class="messages-wrap">
      <div class="messages">
        <message />
        <message />
      </div>
    </div>
  </div>
</template>

<script setup>
import Message from './Message.vue';
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