<template>
  <div class="header">
    <div class="avatar">
      <img src="https://avatar.iran.liara.run/public/5" width="50" alt="" />
    </div>
    <div class="usernames">
      {{ chat?.title }}
      <span class="status"></span>
    </div>
    <div class="settings-dialog">
      <SearchOutlined />
      <HeartOutlined />
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
  HeartOutlined,
  SearchOutlined,
} from '@ant-design/icons-vue';
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { useDialogStore } from '../../../store/dialogs';
import { useUsersStore } from '../../../store/users';

const route = useRoute();
const dialogStore = useDialogStore();
const usersStore = useUsersStore();

const userAuth = computed(() => {
  return usersStore.getAuthUser;
});

const chat = computed(() => {
  const dialog = dialogStore.getDialog(Number(route.params.id));
  if (dialog && userAuth.value) {
    if (dialog.users.length > 2) {
      return { title: dialog.title, info: `${dialog.users.length} участника` };
    } else {
      const { id } = dialog.users.find((item) => item.id !== userAuth.value.id);
      const companion = usersStore.getUser(id);
      if (companion) {
        return {
          title: `${companion.firstname} ${companion.lastname}`,
          info: '-',
        };
      } else {
        return 'Loading';
      }
    }
  }
  return 'Loading';
});
</script>

<style lang="less" scoped>
.header {
  border-bottom: 1px solid #ccc;
  padding: 20px;
  display: flex;
  align-items: center;

  .avatar {
    margin-right: 20px;
  }

  .usernames {
    flex-grow: 1;
    font-weight: 700;

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
