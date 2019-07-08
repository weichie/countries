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
      //TODO: Search function
      searchCountry(){
         console.log('searching for ' + this.search);
      }
   }
}
</script>

