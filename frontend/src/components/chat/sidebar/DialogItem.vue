<template>
  <div class="dialog-item" @click="goChat(dialog.id)">
    <div class="avatar">
      <img src="https://avatar.iran.liara.run/public/5" width="40" alt="">
    </div>
    <div class="body">
      <div class="username">{{ dialog.title }}</div>
      <div class="message">Hello everion!</div>
    </div>
    <div class="actions">
      <div class="date">13.03.2024</div>
      <div class="count">3</div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
const { dialog } = defineProps(['dialog']);
const router = useRouter();

const goChat = (id) => {
  router.push(`/chat/${id}`);
}
</script>

<style lang="less" scoped>
.dialog-item {
  display: flex;
  padding: 20px;
  align-items: center;
  border-bottom: 1px solid #ddd;
  cursor: pointer;

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

    .username {
      font-weight: 700;
      margin-bottom: 5px;
      color: #628ff5;
    }

    .message {
      color: #858787;
    }
  }

  .actions {
    text-align: right;

    .date {
      margin-bottom: 6px;
      color: #858787;
      font-size: 12px;
    }

    .count {
      display: inline-block;
      width: 20px;
      background-color: #336af3;
      color: #fff;
      text-align: center;
      padding: 2px;
      border-radius: 50%;
    }
  }
}
</style>