<template>
   <div class="page-content">
      <h1 v-if="country.name">{{ country.name }}</h1>
      <h2 class="subtitle">{{ country.region }}</h2>
   </div>
</template>

<script>
import axios from 'axios';

export default {
   name: 'Single',
   data(){
      return{
         country: {}
      }
   },
   mounted(){
      console.log(this.$route.params.id);
      axios.get(`https://restcountries.eu/rest/v2/alpha/${this.$route.params.id}`)
         .then(res => {
            this.country = res.data;
         })
         .catch(err => {
            console.error('Error:', err);
         });
   }
}
</script>

