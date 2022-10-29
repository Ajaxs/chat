<template>
    <div class="dialog-page">
        <dialog-header />
        <dialog-content />
        <send-message />
    </div>
</template>

<script setup>
import DialogContent from '@/components/DialogContent.vue';
import SendMessage from '@/components/SendMessage.vue';
import DialogHeader from '@/components/DialogHeader.vue';
</script>

<style lang="less" scoped>
.dialog-page{
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
}
</style>