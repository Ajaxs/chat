<template>
    <div class="message" :class="{ 'mine': user.id === store.state.profile.id }">
        <div class="name">{{ user.first_name }} {{ user.last_name }} - {{ props.message.date.getHours() }}:{{ props.message.date.getMinutes() }}</div>
        <div class="text">{{ props.message.text }}</div>
    </div>
</template>

<script setup>
import { computed, defineProps } from 'vue';
import { useStore } from 'vuex';

const store = useStore();
const props = defineProps({
    message: Object,
});

const user = computed(() => {
    return store.state.users.find(user => user.id === props.message.user_id);
});
</script>

<style lang="less" scoped>
.message {
    display: inline-block;
    border: 1px solid #ddd;
    padding: 15px;
    border-radius: 5px;
    margin-bottom: 10px;
    max-width: 500px;

    &.mine {
        align-self: flex-end;
        
    }

    .name {
        //text-align: right;
        font-weight: 600;
        margin-bottom: 5px;
    }
}
</style>