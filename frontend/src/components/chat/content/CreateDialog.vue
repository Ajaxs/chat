<template>
  <div class="create-dialog">
    <a-button type="primary" @click="toggleDialog(true)">Новый диалог</a-button>
  </div>

  <a-modal v-model:open="modalDialog" centered title="Создать диалог">
    <div class="modal-content">
      Группа: <a-switch v-model:checked="isGroup" /><br /><br />
      <a-input
        v-model:value="newDialogName"
        placeholder="Название группы"
        class="dialog-name"
        v-if="isGroup"
      />

      <div class="contacts">
        <div class="contact" v-for="user in users" :key="user.id">
          <a-checkbox
            v-if="isGroup"
            :checked="isCheckUser(user.id)"
            @change="selectUser(user.id)"
          />
          <img :src="user.avatar" alt="" width="25" />
          <div class="contact-name" @click="showDialog(user.id)">
            {{ user.firstname }} {{ user.lastname }}
          </div>
        </div>
      </div>
    </div>

    <template #footer>
      <a-button @click="closeCreateDialog">Отмена</a-button>
      <a-button
        type="primary"
        :disabled="isDiasabledCreateButton"
        @click="createDraft"
        >Создать</a-button
      >
    </template>
  </a-modal>
</template>

<script setup>
import { ref, watch, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useUsersStore } from '../../../store/users';
import { useDialogStore } from '../../../store/dialogs';

const router = useRouter();
const usersStore = useUsersStore();
const dialogsStore = useDialogStore();

const newDialogName = ref('');
const modalDialog = ref(false);
const isGroup = ref(false);
const selectedUsers = ref(null);

const authUser = computed(() => {
  return usersStore.getAuthUser;
});

const toggleDialog = (state) => {
  modalDialog.value = state;
};

const closeCreateDialog = () => {
  modalDialog.value = false;
  isGroup.value = false;
  selectedUsers.value = null;
};

const createDraft = () => {
  let users = isGroup.value ? selectedUsers.value : [selectedUsers.value];
  users.push(authUser.value.id);
  const id = new Date().getTime();

  const newDialog = {
    id,
    is_group: isGroup.value ? 1 : 0,
    is_draft: true,
    admin: authUser.value.id,
    users,
  };

  if (isGroup.value) {
    newDialog.title = newDialogName.value ?? 'Новый диалог';
  }

  dialogsStore.createDraft(newDialog);
  router.push(`/chat/${id}`);
  closeCreateDialog();
};

// const createDialog = async () => {
//   const users = isGroup.value ? selectedUsers.value : [selectedUsers.value];
//   users.push(authUser.value.id);

//   const newDialog = {
//     admin: authUser.value.id,
//     users,
//   };

//   if (isGroup.value) {
//     newDialog.title = newDialogName.value ?? 'Новый диалог';
//   }

//   const createdDialogId = await dialogsStore.addDialog(newDialog);

//   router.push(`/chat/${createdDialogId}`);
// };

const isCheckUser = (id) => {
  return selectedUsers.value.includes(id);
};

const selectUser = (id) => {
  if (isGroup.value && selectedUsers.value.includes(id)) {
    selectedUsers.value = selectedUsers.value.filter((item) => item !== id);
  } else {
    selectedUsers.value.push(id);
  }
};

const showDialog = (id) => {
  if (isGroup.value) {
    selectUser(id);
  } else {
    let usersContact = [authUser.value.id, id];
    usersContact.sort();
    const contact = dialogsStore.searchContact(usersContact);

    // если диалог с контактом уже есть, то редиректим на него
    if (contact) {
      router.push(`/chat/${contact.id}`);
      closeCreateDialog();
    } else {
      // Или создаем новый черновик
      createDraft();
    }
  }
};

const users = computed(() => {
  return usersStore.getUsers.filter((item) => item.id !== authUser.value.id);
});

const isDiasabledCreateButton = computed(() => {
  if (isGroup.value) {
    return selectedUsers.value.length === 0;
  }
  return !selectedUsers.value;
});

watch(isGroup, (value) => {
  selectedUsers.value = value ? [] : null;
});
</script>

<style lang="less" scoped>
.create-dialog {
  padding: 20px;
  text-align: center;
}

.modal-content {
  padding: 25px 0;
  .user {
    margin-bottom: 10px;
  }

  .dialog-name {
    margin-bottom: 10px;
  }

  .contact {
    display: flex;
    gap: 10px;
    width: 100%;
    padding: 10px 0;

    .contact-name {
      display: inline-block;
      cursor: pointer;
    }
  }
}
</style>
