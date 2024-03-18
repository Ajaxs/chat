<template>
  <div class="page-chat">
    <sidebar />
    <div class="chat-content">
      <router-view />
    </div>
  </div>
</template>

<script setup>
import Sidebar from '../components/chat/sidebar/Sidebar.vue';
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