<template>
  <div class="new-message">
    <div class="message">
      <a-textarea
        v-model:value="message"
        placeholder="Enter message"
        :auto-size="{ minRows: 1, maxRows: 3 }"
      />
    </div>
    <div class="send">
      <a-button type="primary" shape="circle" size="default">
        <template #icon>
          <SendOutlined />
        </template>
      </a-button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { SendOutlined } from '@ant-design/icons-vue';
const message = ref('');
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