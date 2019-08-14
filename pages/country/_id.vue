<template>
   <div class="page-content">
      <div class="container m-auto">
         <transition name="fade">
            <div class="panel" v-show="country.name">
               <div class="single-title">
                  <img :src="country.flag" :alt="country.name + ' flag'" />
                  <div class="wrap">
                     <h1>{{ country.name }} <small v-if="country.nativeName">&middot; {{ country.nativeName }}</small></h1>
                     <h2 class="subtitle">{{ country.region }}<small v-if="country.subregion">: {{country.subregion}}</small></h2>
                  </div>
               </div>
               <div class="panel-body">
                  <div class="flex">
                     <table class="half left-td">
                        <tbody>
                           <tr>
                              <td>Capital</td>
                              <td>{{ country.capital }}</td>
                           </tr>
                           <tr>
                              <td>Demonym</td>
                              <td>{{ country.demonym }}</td>
                           </tr>
                           <tr>
                              <td>Languages</td>
                              <td>
                                 <ul class="lang-list" v-if="country.languages">
                                    <li v-for="(lang, i) in country.languages" :key="'lang-' + i">
                                       <strong>{{lang.name}}</strong> <small>({{lang.iso639_1}})</small>
                                    </li>
                                 </ul>
                              </td>
                           </tr>
                           <tr>
                              <td>Area</td>
                              <td>{{ country.area | formatNumber }} <small>km<sup>2</sup></small></td>
                           </tr>
                           <tr>
                              <td>Population</td>
                              <td>{{ country.population | formatNumber }} <small>people</small></td>
                           </tr>
                           <tr>
                              <td>Timezone<span v-if="country.timezones && country.timezones.length > 1">s</span></td>
                              <td>
                                 <ul class="lang-list">
                                    <li v-for="(item, i) in country.timezones" :key="'timezone-' + i">
                                       {{item}}
                                    </li>
                                 </ul>
                              </td>
                           </tr>
                           <tr>
                              <td>Currencies</td>
                              <td>
                                 <ul class="lang-list">
                                    <li v-for="(item, i) in country.currencies" :key="'timezone-' + i">
                                       <strong>{{item.name}}</strong> <small>({{item.symbol}}/{{item.code}})</small>
                                    </li>
                                 </ul>
                              </td>
                           </tr>
                           <tr>
                              <td>Alpha-2 code</td>
                              <td>{{ country.alpha2Code }}</td>
                           </tr>
                           <tr>
                              <td>Alpha-3 code</td>
                              <td>{{ country.alpha3Code }}</td>
                           </tr>
                        </tbody>
                     </table>

                     <GChart
                        :settings="{
                           'packages':['geochart'],
                           'callback': drawRegionsMap
                        }"
                        type="geochart"
                        :resizeDebounce="500"
                        id="regions_div"
                     />
                  </div>

                  <div class="surroundings" v-show="displayBorders && displayBorders.length > 0">
                     <p>
                        Surrounding countries ({{displayBorders.length}}): <br>
                        <span v-for="(item, i) in displayBorders" :key="'neighbour-' + i">
                           <nuxt-link :to="'/country/' + item[0].alpha3Code.toLowerCase()" class="gt-border-country">
                              {{item[0].name}}
                           </nuxt-link>
                        </span>
                     </p>
                  </div>
               </div>
            </div><!-- ./panel -->
         </transition>

         <p v-if="!country.name" class="mb-m10 text-center">
            Loanding country data...
         </p>
      </div><!-- ./container -->
   </div>
</template>

<script>
import axios from 'axios';

export default {
   name: 'Single',
   data(){
      return{
         country: {},
         borders: [],
      }
   },
   mounted(){
      axios.get(`https://restcountries.eu/rest/v2/alpha/${this.$route.params.id}`)
         .then(res => {
            this.country = res.data;
            this.drawRegionsMap();
         })
         .catch(err => {
            console.error('Error:', err);
         });
   },
   methods: {
      drawRegionsMap() {
         const data = google.visualization.arrayToDataTable([
            ['Country', 'Population'],
            [this.country.name, this.country.population],
         ]);

         const options = {
            title: this.country.name,
            legend: 'none'
         };

         const chart = new google.visualization.GeoChart(document.getElementById('regions_div'));

         chart.draw(data, options);
      },
   },
   computed: {
      displayBorders(){
         const allCountries = this.$store.getters['country/all'];
         const borderCountries = [];

         if(this.country.borders && this.country.borders.length > 1) {
            this.country.borders.forEach(e => {
               let add = allCountries.filter(country => {
                  return country.alpha3Code === e;
               });
               borderCountries.push(add);
            });
         }

         return borderCountries;
      },
   },
   head(){
    return {
      title: this.country.name + ' / ' + this.country.nativeName + ' country information, ISO-codes, population, currecies, localestring, ...',
      meta: [
         // hid is used as unique identifier. Do not use `vmid` for it as it will not work
         {
            hid: 'description',
            name: 'description',
            content: `All country information about ${this.country.name}. ISO-codes, population, currency, languages, area, ...`
         }
      ]
    }
  }
}
</script>

