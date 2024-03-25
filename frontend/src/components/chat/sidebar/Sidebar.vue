<template>
  <div class="chat-sidebar">
    <div class="user-info" v-if="authUser">
      <div class="avatar">
        <img :src="authUser.avatar" width="60" alt="" />
      </div>
      <div class="username">
        {{ authUser.firstname }} {{ authUser.lastname }} {{ authUser.id }}
      </div>
      <div class="profile">
        <a-dropdown :trigger="['click']">
          <a class="ant-dropdown-link" @click.prevent>
            <EllipsisOutlined />
          </a>
          <template #overlay>
            <a-menu>
              <a-menu-item key="0">
                <a href="http://www.alipay.com/">Редактировать профиль</a>
              </a-menu-item>
              <a-menu-divider />
              <a-menu-item key="3">Выход</a-menu-item>
            </a-menu>
          </template>
        </a-dropdown>
      </div>
    </div>

    <div class="dialog-search">
      <a-input-search
        v-model:value="searchText"
        placeholder="Search messages"
        enter-button
        @search="onSearch"
      />
    </div>
    <div class="dialog-list">
      <dialog-item
        v-for="dialog in dialogs"
        :key="dialog.id"
        :dialog="dialog"
      />
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, computed } from 'vue';
import { EllipsisOutlined } from '@ant-design/icons-vue';
import DialogItem from './DialogItem.vue';
import { useDialogStore } from '../../../store/dialogs';
import { useUsersStore } from '../../../store/users';

const searchText = ref('');

const usersStore = useUsersStore();
const dialogsStore = useDialogStore();

const authUser = computed(() => {
  return usersStore.getAuthUser;
});

const dialogs = computed(() => {
  return dialogsStore.getDialogs;
});

onMounted(() => {});

const onSearch = () => {};
</script>

<style lang="less" scoped>
.chat-sidebar {
  width: 350px;
  background-color: #f9f9f9;
  flex-grow: 0;
  border-radius: 10px 0 0 10px;
  position: relative;

  .user-info {
    padding: 20px;
    display: flex;
    align-items: center;

    .avatar {
      margin-right: 15px;

      img {
        border-radius: 50%;
        border: 1px solid #bbb;
      }
    }

    .username {
      font-weight: 700;
      font-size: 16px;
      flex-grow: 1;
    }

    .profile {
      font-size: 28px;
      cursor: pointer;
    }
  }

  .dialog-search {
    padding: 20px;
  }

  .dialog-list {
  }
}
</style>
./DialogItem.vue
