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

    <div class="dialog-search">
      <a-input-search
        v-model:value="searchText"
        placeholder="Поиск диалога"
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

    <div class="create-dialog">
      <a-button type="primary" @click="toggleDialog(true)"
        >Новый диалог</a-button
      >
    </div>

    <a-modal
      v-model:open="modalDialog"
      title="Создать диалог"
      @ok="createDialog"
      @cancel="cancel"
    >
      <div class="modal-content">
        Групповой чат: <a-switch v-model:checked="isGroup" /><br /><br />
        <a-input
          v-model:value="chatName"
          placeholder="Название чата"
          :disabled="!isGroup"
        />
        <br /><br />
        <a-checkbox-group
          v-if="isGroup"
          v-model:value="selectedUsers"
          style="width: 100%"
        >
          <a-col class="user" :span="24" v-for="user in users" :key="user.id">
            <a-checkbox :value="user.id">
              {{ user.firstname }} {{ user.lastname }}
            </a-checkbox>
          </a-col>
        </a-checkbox-group>
        <a-radio-group v-else v-model:value="selectedUsers" style="width: 100%">
          <a-col class="user" :span="24" v-for="user in users" :key="user.id">
            <a-radio :value="user.id">
              {{ user.firstname }} {{ user.lastname }}
            </a-radio>
          </a-col>
        </a-radio-group>
      </div>
    </a-modal>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import { useRouter } from 'vue-router';
import { EllipsisOutlined } from '@ant-design/icons-vue';
import { useDialogStore } from '../../../store/dialogs';
import { useUsersStore } from '../../../store/users';
import DialogItem from './DialogItem.vue';

const emit = defineEmits(['logout']);

const searchText = ref('');
const chatName = ref('');
const modalDialog = ref(false);
const isGroup = ref(false);
const selectedUsers = ref([]);

const usersStore = useUsersStore();
const dialogsStore = useDialogStore();
const router = useRouter();

const toggleDialog = (state) => {
  modalDialog.value = state;
};

const clearSelectedUsers = () => {
  selectedUsers.value = [];
};

const createDialog = async () => {
  const users = isGroup.value ? selectedUsers.value : [selectedUsers.value];
  users.push(authUser.value.id);
  const newDialog = {
    title: 'Новый диалог',
    admin: authUser.value.id,
    users,
  };

  const createdDialogId = await dialogsStore.addDialog(newDialog);
  clearSelectedUsers();
  toggleDialog(false);
  router.push(`/chat/${createdDialogId}`);
};

const cancel = () => {};

const authUser = computed(() => {
  return usersStore.getAuthUser;
});

const users = computed(() => {
  return usersStore.getUsers.filter((item) => item.id !== authUser.value.id);
});

const dialogs = computed(() => {
  return dialogsStore.getDialogs;
});

const logout = () => {
  emit('logout');
};

const onSearch = () => {};

watch(isGroup, (value) => {
  selectedUsers.value = value ? [] : null;
});
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

  .create-dialog {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 20px;
    text-align: center;
  }
}

.modal-content {
  padding: 25px 0;
  .user {
    margin-bottom: 10px;
  }
}
</style>
./DialogItem.vue
