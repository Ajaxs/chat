<template>
  <div class="header">
    <div class="avatar">
      <img src="https://avatar.iran.liara.run/public/5" width="50" alt="" />
    </div>
    <div class="chat-info">
      <div class="username" v-if="dialog">
        {{ dialog.title }} {{ dialog.users }} <span class="status"></span>
      </div>
      <div class="info" v-if="info">{{ info }}, {{ usersOnline }}</div>
    </div>

    <div class="settings-dialog">
      <SearchOutlined />
      <StarOutlined />
      <a-dropdown :trigger="['click']">
        <a class="ant-dropdown-link" @click.prevent>
          <EllipsisOutlined />
        </a>
        <template #overlay>
          <a-menu>
            <a-menu-item key="0">
              <a href="#">Информация</a>
            </a-menu-item>
            <a-menu-item key="1">
              <a href="#">Выкл. уведомления</a>
            </a-menu-item>
            <a-menu-divider />
            <a-menu-item key="3">Удалить</a-menu-item>
          </a-menu>
        </template>
      </a-dropdown>
    </div>
  </div>
</template>

<script setup>
import {
  EllipsisOutlined,
  StarOutlined,
  SearchOutlined,
} from '@ant-design/icons-vue';
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { useDialogStore } from '../../../store/dialogs';
import { useUsersStore } from '../../../store/users';

const route = useRoute();
const dialogStore = useDialogStore();
const usersStore = useUsersStore();

const dialog = computed(() => {
  return dialogStore.getDialog(Number(route.params.id));
});

const info = computed(() => {
  if (dialog.value && dialog.value.users.length > 2) {
    return `${dialog.value.users.length} участника`;
  } else {
    return '';
  }
});

const usersOnline = computed(() => {
  return `${usersStore.getUsersOnline(dialog.value.users)} в сети`;
});
</script>

<style lang="less" scoped>
.header {
  padding: 20px;
  display: flex;
  align-items: center;
  box-shadow: 0px 0px 4px #bebebe;

  .avatar {
    margin-right: 20px;
  }

  .chat-info {
    flex-grow: 1;

    .username {
      font-weight: 700;
    }

    .info {
      color: #aaa;
      margin-top: 5px;
    }

    .status {
      display: inline-block;
      width: 10px;
      height: 10px;
      margin-left: 5px;
      border-radius: 50%;
      background-color: #658fff;
    }
  }

  .settings-dialog {
    font-size: 24px;
    display: flex;
    gap: 15px;
  }
}
</style>
