<template>
  <div class="wrapper">
    <router-view />
  </div>
</template>

<script setup></script>

<style lang="less" scoped>
.wrapper {
  height: 100vh;
  min-height: 800px;
  background-color: #658fff;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
