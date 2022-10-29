<template>
    <div class="sidebar">
        <div class="profile">
            <div class="avatar">
                <span>{{ profile.first_name[0] }}{{ profile.last_name[0] }}</span>
            </div>
            <div class="name">
                {{ profile.first_name }} {{ profile.last_name }}
            </div>
        </div>
        <div class="dialogs">
            <dialog-item v-for="dialog in dialogs" :key="dialog.id" :dialog="dialog" />
        </div>
    </div>
</template>

<script setup>
import DialogItem from '@/components/DialogItem.vue'

import { computed } from 'vue';
import { useStore } from 'vuex'

const store = useStore();

const profile = computed(() => {
    return store.state.users.find(item => item.id === store.state.profile.id);
});

const dialogs = computed(() => {
    return store.state.dialogs.filter(item => store.state.profile.dialogs.includes(item.id));
});

// const contacts = computed(() => {
//     return store.state.users.filter(item => store.state.profile.contacts.includes(item.id));
// });
</script>

<style lang="less" scoped>
.sidebar {
    border-right: 1px solid #ccc;
}

.profile{
    border-bottom: 1px solid #ddd;
    padding: 15px;
    display: flex;
    align-items: center;

    .avatar {
        width: 55px;
        height: 55px;
        border-radius: 50%;
        border: 1px solid #ddd;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-right: 10px;
        font-size: 20px;
        font-weight: 600;
        background-color: #82cef3;
    }

    .name {
        font-size: 16px;
        font-weight: 600;
    }
}
</style>