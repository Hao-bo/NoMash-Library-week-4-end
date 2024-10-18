<template>
    <div>
        <h1>
            Add Book
        </h1>
        <form @submit.prevent = "addBook">
            <div>
                <label for ="isbn" >ISBN:</label>
                <input type="text" v-model="isbn" id = "isbn" required />    
            </div>
            <div>
                <label for="name" > Name:</label>
                <input type="text" v-model="name" id = "name" required/>
            </div>
            <button @click="addBook">Add Book</button>
        </form>

        <h2>Book List</h2>
        <ul>
            <li v-for="book in books" :key="book.id">
                ISBN: {{ book.isbn }} - Name: {{ book.name }}
                <button @click="editBook(book)">Edit</button>
                <button @click="deleteBook(book.id)">Delete</button>
            </li>
        </ul>

        <div v-if="editingBook">
            <h3>Edit Book</h3>
            <form @submit.prevent="updateBook">
                <div>
                    <label for="editIsbn">ISBN:</label>
                    <input type="text" v-model="editIsbn" id="editIsbn" required />
                </div>
                <div>
                    <label for="editName">Name:</label>
                    <input type="text" v-model="editName" id="editName" required />
                </div>
                <button type="submit">Update Book</button>
                <button @click="cancelEdit">Cancel</button>
            </form>
        </div>
    </div>
</template>

<script setup>

import db from '@/Firebase/init';
import { collection, doc, updateDoc, deleteDoc, onSnapshot } from 'firebase/firestore';
import { ref, onMounted} from 'vue';
import BookList from '@/components/BookList.vue';
import axios from 'axios'

const isbn = ref("");
const name = ref("");
const books = ref([]);
const editingBook = ref(null); // 当前正在编辑的书籍
const editIsbn = ref("");
const editName = ref("");

const addBook = async () => {
    try {
        const isbnNumber = Number(isbn.value);
        if (isNaN(isbnNumber)) {
            alert("ISBN must be a valid number");
            return;
        }

        await axios.post('https://addbookwithuppercase-tlbdkdtyea-uc.a.run.app', {
        isbn: isbnNumber,
        name: name.value
    });
        // await addDoc(collection(db, 'books'), {
        //     isbn: isbnNumber,
        //     name: name.value
        // });
        isbn.value = ""
        name.value = ""
        alert('Book added successfully!')
    }catch(error){
        console.error('Error adding book: ', error)
    }
}

onMounted(() => {
    const booksCollection = collection(db, 'books');
    onSnapshot(booksCollection, (snapshot) => {
        books.value = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    });
});

const editBook = (book) => {
    editingBook.value = book;
    editIsbn.value = book.isbn;
    editName.value = book.name;
};

const updateBook = async () => {
    try {
        const isbnNumber = Number(editIsbn.value);
        if (isNaN(isbnNumber)) {
            alert("ISBN must be a valid number");
            return;
        }

        const bookRef = doc(db, 'books', editingBook.value.id);
        await updateDoc(bookRef, {
            isbn: isbnNumber,
            name: editName.value,
        });

        alert('Book updated successfully!');
        cancelEdit();
    } catch (error) {
        console.error('Error updating book: ', error);
    }
};
const cancelEdit = () => {
    editingBook.value = null;
    editIsbn.value = "";
    editName.value = "";
};

const deleteBook = async (id) => {
    try {
        await deleteDoc(doc(db, 'books', id));
        alert('Book deleted successfully!');
    } catch (error) {
        console.error('Error deleting book: ', error);
    }
};
</script>

// const addBook = async () => {
//     try{
//         await db.collection('books').add({
//             isbn: Number(isbn.value),
//             name: name.value
//         })

//         isbn.value = null,
//         name.value = ''
//         alert('Book added successfully!');

//     }catch (error){
//         console.error('Error adding book: ', error)
//     }
// }
