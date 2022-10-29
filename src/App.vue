<template>
  <div class="chat-wrap">
        <div class="chat">
            <sidebar />
            <div class="body">
              <router-view/>                
            </div>            
        </div>
    </div>   
</template>

<script setup>
import Sidebar from '@/components/Sidebar.vue';
</script>

<style lang="less">
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500&display=swap');

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  background-color: #85adf7;
  font-family: 'Roboto', sans-serif; 
  font-weight: 400;
  font-size: 13px;  
}

.chat-wrap {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;

    .chat {
        width: 1000px;
        height: 800px;
        background-color: #fff;
        border-radius: 5px;
        box-shadow: 0 0 5px #eee;
        display: flex;

        .body {
            flex-grow: 1;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
        }
    }
}
</style>
