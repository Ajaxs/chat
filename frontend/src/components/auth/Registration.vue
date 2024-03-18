<template>
  <div class="registration">
    <h2>Registration</h2>
    <a-form
      :model="form"
      name="registration"
      :label-col="{ span: 8 }"
      :wrapper-col="{ span: 16 }"
      autocomplete="off"
      @finish="registration"
    >
      <a-form-item
        label="Firstname"
        name="firstname"
        :rules="[{ required: true, message: 'Please input your firstname!' }]"
      >
        <a-input v-model:value="form.firstname" />
      </a-form-item>

      <a-form-item
        label="Lastname"
        name="lastname"
        :rules="[{ required: true, message: 'Please input your lastname!' }]"
      >
        <a-input v-model:value="form.lastname" />
      </a-form-item>

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


      <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
        <a-button type="primary" html-type="submit">Registration</a-button>
      </a-form-item>
    </a-form>

    <div class="links">
      <router-link to="/auth/login">Login</router-link>
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue';
import { httpRequest } from '../../config/httpRequest';
import { RouterLink } from 'vue-router';

const form = reactive({
  firstname: '',
  lastname: '',
  email: '',
  password: '',
});

const registration = (values) => {
  httpRequest.post('/api/users', values);
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