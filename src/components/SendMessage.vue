<template>
    <div class="send-message">
        <div class="input">
            <input type="text" v-model="text">
        </div>
        
        <div class="btn-send" @click="send">Send</div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';

const route = useRoute();
const store = useStore();
const text = ref('');

const send = () => {
    store.dispatch('addMessage', {
        id: Date.now(),
        user_id: store.state.profile.id,
        dialog_id: Number(route.params.id),
        text: text.value,
        date: new Date,
    });
};
</script>

<style lang="less" scoped>
.send-message {
    width: 100%;
    display: flex;
    justify-content: space-between;
    padding: 15px;
    border-top: 1px solid #ddd;

    .input {
        flex-grow: 1;

        input{
            border: 1px solid #ddd;
            border-radius: 4px;
            outline: none;
            width: 100%;
            padding: 10px;
            font-family: inherit;
            background-color: #eee;
        }
    }

    .btn-send {
        width: 60px;
        flex-shrink: 0;
    }
}
</style>