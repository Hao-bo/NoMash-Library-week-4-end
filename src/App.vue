
<template>
  <div class = "main-container">
    <header v-if="showHeader">
    <BHeader />
  </header>
  <main class="main-box">
     <router-view></router-view>
  </main>  
</div>  
</template>

<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import CountBookAPI from './views/CountBookAPI.vue';
import BHeader from './components/BHeader.vue';

// 使用 `useRoute` 钩子来获取当前路由信息
const route = useRoute();

// 计算属性，用来判断是否显示 BHeader 组件
const showHeader = computed(() => route.name !== 'CountBookAPI');
</script>

<!-- <script>
import CountBookAPI from './views/CountBookAPI.vue';
import BHeader from './components/BHeader.vue';

export default{
  name: 'App',
  components: {
    BHeader,
    CountBookAPI
  },
  computed: {
    showHeader() {
      return this.$route.name !== 'CountBookAPI';
    }
  }
}
</script> -->

<style scoped>
/* header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
} */
</style>
