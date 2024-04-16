<template>
  <content-header />
  <content ref="contentRef" />
  <new-message @add-new-message="addNewMessage" />
</template>

<script setup>
import { ref } from 'vue';
import ContentHeader from './Header.vue';
import Content from './Content.vue';
import NewMessage from './NewMessage.vue';

const contentRef = ref('');

const addNewMessage = () => {
  contentRef.value.scrollEndMessage();
};
</script>

<style lang="less" scoped></style>
