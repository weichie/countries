<template>
  <div class="page-content">
    <div class="container m-auto">
      <div class="mb-10 text-center">
        <h1 class="mb-2">{{title}}</h1>
        <h2 class="subtitle">{{subtitle}}</h2>
      </div>
      <transition name="fade">
        <div class="panel" v-if="countries && countries.length > 0">
          <!--
            TODO: Add sort-options
          <div class="filters">
            <div class="search">
              search
            </div>
          </div> -->

          <table>
            <thead>
              <tr>
                <th>&nbsp;</th>
                <th @click="sortByCol('name')">Country</th>
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
                  <nuxt-link :to="'/country/' + country.alpha3Code.toLowerCase()" class="gt-home-country">
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
      </transition>

      <p v-if="countries && countries.length === 0" class="m-0 text-center">
        Loanding countries...
      </p>
    </div><!-- ./container -->
  </div><!-- ./page-content -->
</template>

<script>
export default {
  name: 'Home',
  data(){
    return{
      title: 'Country ISO-List',
      subtitle: 'All the country information you need',
      description: 'Get all country information you need! Alpha-codes, ISO-codes, Flags, currencies, ...'
    }
  },
  computed: {
    countries() {
      return (this.$store.getters['country/getSearch'] !== '') ? this.$store.getters['country/results'] : this.$store.getters['country/all'];
    },
  },
  methods: {
    sortByCol(key) {
      const test = this.countries.sort(function(a, b) {
        let x = a[key]; let y = b[key];
        return ((x < y) ? -1 : ((x > y) ? 1 : 0));
      });
      console.log(test);
      return test;
    }
  },
  head () {
    return {
      title: 'Country ISO-List - Population, size, area, ISO, ALPHA, country codes and more...',
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
