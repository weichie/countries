<template>
  <div class="page-content">
    <div class="container lg">
      <div class="title">
        <h1>{{title}}</h1>
        <h2 class="subtitle">{{subtitle}}</h2>
      </div>

      <div class="panel">
        <div class="filters">
          <div class="search">
            search
          </div>
        </div><!-- filters -->

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
              <td>
                <nuxt-link :to="'/country/' + country.alpha3Code.toLowerCase()">
                  {{country.name}}
                </nuxt-link>
              </td>
              <td>{{country.alpha2Code}}</td>
              <td>{{country.alpha3Code}}</td>
              <td>{{country.numericCode}}</td>
              <td>+{{country.callingCodes[0]}}</td>
              <td>{{country.region}}</td>
              <td>{{country.topLevelDomain[0]}}</td>
            </tr>
          </tbody>
        </table>
      </div><!-- ./panel -->
    </div><!-- ./container -->
  </div><!-- ./page-content -->
</template>

<script>
import axios from 'axios'
import { mapActions } from 'vuex'

export default {
  name: 'Home',
  data(){
    return{
      title: 'Country ISO-List',
      subtitle: 'Get all country information you need! Alpha-codes, ISO-codes, Flags, currencies, ...',
      description: 'Get all country information you need! Alpha-codes, ISO-codes, Flags, currencies, ...'
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
    },
    
  },
  filters: {
    urlify(val){
      return val.replace(/\s+/g, '-').toLowerCase();
    }
  },
  head () {
    return {
      title: this.title,
      meta: [
        // hid is used as unique identifier. Do not use `vmid` for it as it will not work
        { hid: 'description', name: 'description', content: this.description }
      ]
    }
  }
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
