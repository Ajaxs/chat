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
              <a-menu-item key="3" @click="logout">Выход</a-menu-item>
            </a-menu>
          </template>
        </a-dropdown>
      </div>
    </div>
    <!-- search dialogs -->
    <search-dialogs />

    <div class="dialog-list">
      <dialog-item
        v-for="dialog in dialogs"
        :key="dialog.id"
        :dialog="dialog"
      />
    </div>
    <!-- create dialog -->
    <create-dialog />
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { EllipsisOutlined } from '@ant-design/icons-vue';
import { useDialogStore } from '../../../store/dialogs';
import { useUsersStore } from '../../../store/users';
import DialogItem from './DialogItem.vue';
import CreateDialog from '../content/CreateDialog.vue';
import SearchDialogs from './SearchDialogs.vue';

const emit = defineEmits(['logout']);

const usersStore = useUsersStore();
const dialogsStore = useDialogStore();

const authUser = computed(() => {
  return usersStore.getAuthUser;
});

const dialogs = computed(() => {
  return dialogsStore.getDialogs;
});

const logout = () => {
  emit('logout');
};
</script>

<style lang="less" scoped>
.chat-sidebar {
  width: 350px;
  background-color: #f9f9f9;
  flex-grow: 0;
  border-radius: 10px 0 0 10px;
  display: flex;
  flex-direction: column;

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
    flex-grow: 1;
  }
}
</style>
./DialogItem.vue
