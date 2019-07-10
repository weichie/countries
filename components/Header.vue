<template>
   <header>
      <nuxt-link class="back-button" :class="{'active': $route.name !== 'index'}" to="/">
         <span></span>
      </nuxt-link>

      <form 
         action="" 
         class="searchform" 
         :class="{'active': $route.name !== 'index'}"
         @submit.prevent="searchCountry">
         <input v-model="search" type="text" placeholder="Search name, iso, currency, region, ..." >
      </form>
   </header>
</template>

<script>
export default {
   name: 'Header',
   data(){
      return{
         search: '',
      }
   },
   methods: {
      searchCountry(){
         this.$store.commit('country/searchTerm', this.search);
         if(this.$route.name === 'country-id'){
            this.$router.push("/");
         }
         this.doSearch(this.search);
      },
      doSearch(term){
         const helper = [];

         this.$store.getters['country/all'].map(country => {
            if(country.name.toLowerCase().includes(term.toLowerCase()) || country.alpha2Code.toLowerCase().includes(term.toLowerCase()) || country.alpha3Code.toLowerCase().includes(term.toLowerCase())){
               helper.push(country);
            }
         });

         this.$store.commit('country/updateSearchResults', helper);
      }
   },
}
</script>

