<template>
  <div class="new-message">
    <div class="message">
      <a-textarea
        v-model:value="text"
        placeholder="Ваше сообщение"
        :auto-size="{ minRows: 1, maxRows: 3 }"
      />
    </div>
    {{ dialog?.is_draft }}
    <div class="send">
      <a-button
        type="primary"
        shape="circle"
        size="default"
        @click="sendMessage"
      >
        <template #icon>
          <SendOutlined />
        </template>
      </a-button>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue';
import httpRequest from '../../../config/httpRequest';
import { useRoute, useRouter } from 'vue-router';
import { useUsersStore } from '../../../store/users';
import { useDialogStore } from '../../../store/dialogs';
import { useMessagesStore } from '../../../store/messages';
import { SendOutlined } from '@ant-design/icons-vue';

const emit = defineEmits(['add-new-message']);

const usersStore = useUsersStore();
const dialogsStore = useDialogStore();
const messagesStore = useMessagesStore();
const route = useRoute();
const router = useRouter();
const text = ref('');

const authUser = computed(() => {
  return usersStore.getAuthUser;
});

const dialog = computed(() => {
  return dialogsStore.getDialog(Number(route.params.id));
});

const clearTextarea = () => {
  text.value = '';
};

const sendMessage = async () => {
  const newMessage = {
    user_id: authUser.value.id,
    dialog_id: Number(route.params.id),
    text: text.value,
  };

  if (dialog.value?.is_draft) {
    const createDialog = { ...dialog.value };
    delete createDialog.id;
    delete createDialog.is_draft;
    const dialogId = await dialogsStore.createDialog(createDialog);
    dialogsStore.changeDraftToDialog(dialog.value.id, dialogId);
    newMessage.dialog_id = dialogId;
    router.push(`/chat/${dialogId}`);
  }

  try {
    await messagesStore.sendMessage(newMessage);

    emit('add-new-message');
    clearTextarea();
  } catch (error) {
    console.error(error);
  }
};
</script>

<style lang="less" scoped>
.new-message {
  border-top: 1px solid #ccc;
  padding: 20px;
  display: flex;
  align-items: center;

  .message {
    flex-grow: 1;
    margin-right: 10px;
  }
}
</style>
