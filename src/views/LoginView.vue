<template>
    <div class="login-view">
      <h1>Login</h1>
      <form @submit.prevent="handleSubmit">
        <div>
          <label for="username">Username:</label>
          <input type="text" id="username" v-model="username" required />
        </div>
        <div>
          <label for="password">Password:</label>
          <input type="password" id="password" v-model="password" required />
        </div>
        <a href="#" @click.prevent="handleLogin" class="login-button">Login</a>
        <!-- 显示身份验证状态 -->
        <p v-if="isAuthenticated">Authenticated Successfully!</p>
        <p v-if="authError" class="error">{{ authError }}</p>
      </form>
    </div>
  </template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

// 使用 ref 创建响应式变量
const username = ref('');
const password = ref('');
const isAuthenticated = ref(false);
const authError = ref('');
const router = useRouter();

// 硬编码的用户名和密码
const validUsername = 'test';
const validPassword = 'password';

// 使用箭头函数定义表单提交处理方法
const handleSubmit = () => {
  console.log('Form submitted with:', {
    username: username.value,
    password: password.value,
  });
  // 在这里添加登录逻辑，例如调用 API 或验证输入
};

// 点击链接后的处理方法
const handleLogin = () => {
  // 验证用户名和密码
  if (username.value === validUsername && password.value === validPassword) {
    isAuthenticated.value = true;
    authError.value = '';
    sessionStorage.setItem('isAuthenticated', 'true'); // 存储身份验证状态
    router.push('/about'); // 导航到 About 页面
  } else {
    isAuthenticated.value = false;
    sessionStorage.setItem('isAuthenticated', 'false'); // 存储身份验证状态
    authError.value = 'Invalid username or password';
  }
};
</script>

