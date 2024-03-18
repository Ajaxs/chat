<template>
  <div class="page-auth">
    <div class="auth-content">
      <router-view />
    </div>
  </div>
</template>

<script setup>
</script>

<style lang="less" scoped>
.page-auth {
    width: 1200px;
    min-height: 1000px;
    border-radius: 10px;
    background-color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;

    .auth-content {
      width: 400px;
    }
  }
</style>