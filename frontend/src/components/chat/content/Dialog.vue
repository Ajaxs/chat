<template>
  <content-header :is-draft="isDraft" />
  <content ref="contentRef" />
  <new-message :is-draft="isDraft" @add-new-message="scrollToNewMessage" />
</template>

<script setup>
import { computed, ref } from 'vue';
import { useRoute } from 'vue-router';
import ContentHeader from './Header.vue';
import Content from './Content.vue';
import NewMessage from './NewMessage.vue';

const contentRef = ref('');
const route = useRoute();

const scrollToNewMessage = () => {
  contentRef.value.scrollEndMessage();
};

const isDraft = computed(() => {
  return route.meta.draft;
});
</script>

<style lang="less" scoped></style>
