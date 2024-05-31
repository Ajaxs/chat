<template>
  <div class="dialog-search">
    <a-input-search
      v-model:value="searchText"
      placeholder="Поиск диалога"
      enter-button
      @search="onSearch"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue';

const searchText = ref('');

const onSearch = () => {};
</script>

<style lang="less" scoped></style>
