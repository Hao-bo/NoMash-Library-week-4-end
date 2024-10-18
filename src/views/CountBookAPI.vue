<template>
    <pre>{{ jsondata }}</pre>
</template>

<script >

import { onMounted, ref } from 'vue';
import axios from 'axios';

export default{
    data() {
        return{
            jsondata:null,
            error:null
        }
    },
    methods:{
        async getBookCountAPI(){
            try{
                const response = await axios.get('https://countbooks-tlbdkdtyea-uc.a.run.app')
                this.jsondata = response.data
                this.error = null
            } catch (error) {
                console.error('Error fetching book count'. error);
                this.error = error;
                this.count = null;
            }
        }
    },
    mounted(){
        this.getBookCountAPI();
    }
}


// const getBookCount = async () => {
//   try {
//     const response = await axios.get('https://countbooks-tlbdkdtyea-uc.a.run.app');
//     jsondata.value = jsondata.data
//     error.value = null;
//   } catch (err) {
//     console.error('Error fetching book count:', err);
//     error.value = error;
//     count.value = null;
//   }
// };
</script>