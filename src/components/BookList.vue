<template>
    <div>
        <h1>Retrieve Books</h1>
        <button @click="fetchBooks">Retrieve Books</button>
        <ul>
            <li v-for="book in books" :key="book.id">
                ISBN: {{ book.isbn }} - Name: {{ book.name }}
            </li>
        </ul>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import db from '../Firebase/init'
import { collection, query, where, orderBy, limit, getDocs } from 'firebase/firestore';

const books = ref([])
const fetchBooks = async () => {
    // 
    try {
        const booksQuery = query(
            collection(db, 'books'),
            where('isbn', '>=', 1000),       
            orderBy('name', 'asc'),          
            limit(3)                         
        );

        // 执行查询并获取结果
        const querySnapshot = await getDocs(booksQuery);
        books.value = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

        console.log('Books retrieved:', books.value);
    } catch (error) {
        console.error('Error retrieving books:', error);
    }
}

// onMounted(() => {
//     fetchBooks();
// })

</script>