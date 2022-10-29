<template>
    <router-link :to="`/dialog/${dialog.id}`" class="dialog" >
        <div class="avatar">
            <img src="https://via.placeholder.com/40" alt="">
        </div>
        <div class="body">
            <div class="username">
                {{ users.join(', ') }}
            </div>
            <div class="short-message">Hello Kitty</div>
        </div>
        <div class="info">
            <div class="date">27.10.2022</div>
            <div class="counter">{{ countMessages }}</div> 
        </div>
    </router-link>
</template>

<script setup>
import { computed, defineProps } from 'vue';
import { useStore } from 'vuex';

const store = useStore();
const props = defineProps({
    dialog: Object,
});

const users = computed(() => {
    return props.dialog.contacts
        .filter(contact => contact !== store.state.profile.id)
        .map(contact => {        
            const user = store.state.users.find(user => user.id === contact);
            return user ? user.first_name : 'User not found';       
        
    });
});

const countMessages = computed(() => {
    return store.state.messages.filter(message => message.dialog_id === props.dialog.id).length;
});
</script>

<style lang="less" scoped>
.dialog {

    border-bottom: 1px solid #ccc;
        padding: 15px;
        display: flex;
        justify-content: space-between;
        text-decoration: none;

        .avatar { 
            width: 50px;
            flex-shrink: 0;

            img {
                border-radius: 50%;
            }
        }

        .body{
            flex-grow: 1;

            .username{
                 font-weight: 600;
                 margin-bottom: 5px;
                 color: #444;
            }

            .short-message {
                color: #888;
            }
        }

        .info{
            width: 60px;
            flex-shrink: 0;
            text-align: right;

            .date{
                margin-bottom: 5px;
                color: #888;
            }

            .counter{
                background-color: rgb(223, 73, 73);
                color: #fff;
                width: 20px;
                height: 20px;
                border-radius: 50%;
                text-align: center;
                padding-top: 2px;
                float: right;
            }
        }
    
}
</style>