<template>
  <div class="new-message">
    <div class="message">
      <a-textarea
        v-model:value="text"
        placeholder="Enter message"
        :auto-size="{ minRows: 1, maxRows: 3 }"
      />
    </div>
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
import { useRoute } from 'vue-router';
import { useUsersStore } from '../../../store/users';
import { SendOutlined } from '@ant-design/icons-vue';

const usersStore = useUsersStore();
const route = useRoute();
const text = ref('');

const authUser = computed(() => {
  return usersStore.getAuthUser;
});

const sendMessage = async () => {
  try {
    await httpRequest.post('/api/messages', {
      user_id: authUser.value.id,
      dialog_id: Number(route.params.id),
      text: text.value,
    });

    text.value = '';
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
