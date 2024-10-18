<template>
    <div>
      <h1>All Books</h1>
      <div v-if="books">
        <pre>{{ books }}</pre> 
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    name: "AllBooks",
    data() {
      return {
        books: null, 
      };
    },
    mounted() {
      this.getBooks();
    },
    methods: {
      async getBooks() {
        try {
          const response = await axios.get("https://getallbooks-tlbdkdtyea-uc.a.run.app");
          this.books = response.data; 
        } catch (error) {
          console.error("Error fetching books:", error);
        }
      }
    }
  };
  </script>
  