<template>
  <div class="login">
    <h2>Login</h2>
    <a-form
      :model="form"
      name="login"
      :label-col="{ span: 8 }"
      :wrapper-col="{ span: 16 }"
      autocomplete="off"
      @finish="login"
    >
      <a-form-item
        label="Email"
        name="email"
        :rules="[{ required: true, message: 'Please input your email!' }]"
      >
        <a-input v-model:value="form.email" />
      </a-form-item>

      <a-form-item
        label="Password"
        name="password"
        :rules="[{ required: true, message: 'Please input your password!' }]"
      >
        <a-input-password v-model:value="form.password" />
      </a-form-item>

      <a-form-item name="remember" :wrapper-col="{ offset: 8, span: 16 }">
        <a-checkbox v-model:checked="form.remember">Remember me</a-checkbox>
      </a-form-item>

      <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
        <a-button type="primary" html-type="submit">Login</a-button>
      </a-form-item>
    </a-form>

    <div class="links">
      <router-link to="/auth/registration">Registration</router-link>
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue';
import { useRouter } from 'vue-router';
import { httpRequest } from '../../config/httpRequest';

const router = useRouter();

const form = reactive({
  email: '',
  password: '',
  remember: true,
});

const login = async (values) => {
  try {
    const response = await httpRequest.post('/api/auth/login', values);
    localStorage.setItem('refreshToken', response.data.refreshToken);
    localStorage.setItem('accessToken', response.data.accessToken);
    router.push('/chat');
  } catch (error) {
    console.error(error);
  }

};
</script>

<style lang="less" scoped>
h2 {
  text-align: center;
  margin-bottom: 40px;
}
.links {
  text-align: center;
}
</style>