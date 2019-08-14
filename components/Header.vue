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

      <transition name="fade">
         <a class="reset-btn" href="#" v-if="search && search.length > 0" @click.prevent="resetSearch()">Reset Search</a>
      </transition>
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
         const searchTerms = [];

         this.$store.getters['country/all'].map(country => {
            if(country.name.toLowerCase().includes(term.toLowerCase()) || country.alpha2Code.toLowerCase().includes(term.toLowerCase()) || country.alpha3Code.toLowerCase().includes(term.toLowerCase())){
               searchTerms.push(country);
            }
         });

         this.$store.commit('country/updateSearchResults', searchTerms);
      },
      resetSearch(){
         this.doSearch('');
         this.search = '';
      },
   },
}
</script>

