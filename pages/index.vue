<template>
  <div class="container">
    <h1 class="title">{{title}}</h1>
    <h2 class="subtitle">{{subtitle}}</h2>

    <ul v-if="countries && countries.length > 0">
      <li v-for="(country, i, k) in countries" :key="country-k">
        {{ country.name }}
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Home',
  data(){
    return{
      title: 'Test',
      subtitle: 'Get all country information you need! Alpha-codes, ISO-codes, Flags, currencies, ...',
      countries: []
    }
  },
  mounted(){
    axios.get('https://restcountries.eu/rest/v2/all?fields=name;alpha2Code;alpha3Code;region;callingCodes;flag;numericCode;currencies;topLevelDomain')
      .then(res => {
        this.countries = res.data;
      })
      .catch(err => {
        console.error('Error: ', err);
      });
  }
}
</script>