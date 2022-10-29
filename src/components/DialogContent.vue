<template>
    <div class="dialog">
        <template v-if="messages.length > 0">
            <message v-for="message in messages" :key="message.id" :message="message" />
        </template>
        <template v-else>
            <div class="no-messages">Messages not found</div>
        </template>
    </div>
</template>

<script setup>
import Message from '@/components/Message.vue';

import { computed } from 'vue';
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';

const route = useRoute();
const store = useStore();

const messages = computed(() => {
    return store.state.messages
        .filter(message => message.dialog_id === Number(route.params.id))
        .sort((a, b) => a.date - b.date)
        .reduce((group, message) => {
            const date = `${message.date.getDate()}-${message.date.getMonth()}-${message.date.getFullYear()}`;
            group[date] = group[date] ?? [];
            group[date].push(message);
            return group;
        }, {});
});

console.log(messages.value);
</script>

<style lang="less" scoped>
.dialog {
    flex-grow: 1;
    padding: 20px;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
}
</style>