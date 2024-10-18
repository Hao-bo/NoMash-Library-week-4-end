<template>
    <div id = "app">
        <h1>Book Count</h1>
        <button @click="getBookCount">Get Book Count</button>
        <p v-if="count !== null">Total number of books: {{ count }}</p>
        <p v-if="error">{{ error }}</p>
    </div>
</template>

<script setup>

import { ref } from 'vue';
import axios from 'axios';

const count = ref(null);
const error = ref(null);

const getBookCount = async () => {
  try {
    const response = await axios.get('https://countbooks-tlbdkdtyea-uc.a.run.app');
    count.value = response.data.count;
    error.value = null;
  } catch (err) {
    console.error('Error fetching book count:', err);
    error.value = error;
    count.value = null;
  }
};
</script>