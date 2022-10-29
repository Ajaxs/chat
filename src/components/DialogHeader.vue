<template>
    <div class="header">
        {{ users.join(', ') }}
    </div>
</template>

<script setup>
import { computed } from 'vue';
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';

const store = useStore();
const route = useRoute();

const dialog = computed(() => {
    return store.state.dialogs.find(item => item.id === Number(route.params.id));
});

const users = computed(() => {
    return dialog.value.contacts
        .filter(contact => contact !== store.state.profile.id)
        .map(contact => {        
            const user = store.state.users.find(user => user.id === contact);
            return user ? user.first_name : 'User not found';       
        
    })
});
</script>

<style lang="less" scoped>
.header{
    height: 60px;
    border-bottom: 1px solid #ddd;
    padding: 18px;
    font-size: 20px;
}
</style>