<template>
  <div class="container">
    <h1 class="title">{{title}}</h1>
    <h2 class="subtitle">{{subtitle}}</h2>

    <table v-if="countries && countries.length > 0">
      <thead>
        <tr>
          <th>&nbsp;</th>
          <th>Country</th>
          <th>ISO 2</th>
          <th>ISO 3</th>
          <th>Numeric</th>
          <th>Calling</th>
          <th>Region</th>
          <th>Web</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(country, i) in countries" :key="`country-${i}`">
          <td><img :src="country.flag" :alt="country.name + '-flag'" /></td>
          <td>{{country.name}}</td>
          <td>{{country.alpha2Code}}</td>
          <td>{{country.alpha3Code}}</td>
          <td>{{country.numericCode}}</td>
          <td>+{{country.callingCodes[0]}}</td>
          <td>{{country.region}}</td>
          <td>{{country.topLevelDomain[0]}}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from 'axios'
import { mapActions } from 'vuex'

export default {
  name: 'Home',
  data(){
    return{
      title: 'Test',
      subtitle: 'Get all country information you need! Alpha-codes, ISO-codes, Flags, currencies, ...'
    }
  },
  created(){
    console.log(this.$store.state.country.countries.length);
    if(!this.$store.state.country.countries.length){
      axios.get('https://restcountries.eu/rest/v2/all?fields=name;alpha2Code;alpha3Code;region;callingCodes;flag;numericCode;currencies;topLevelDomain')
        .then(res => {
          this.$store.commit('country/add', res.data)
        })
        .catch(err => {
          console.error('Error: ', err);
        });
    }
  },
  computed: {
    countries() {
      return this.$store.state.country.countries;
    }
  },
}
</script>

<style scoped>
  th{
    text-align: left;
  }

  img{
    width: 25px;
    height: auto;
  }
</style>
