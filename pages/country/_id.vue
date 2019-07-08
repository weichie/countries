<template>
   <div class="page-content">
      <div class="container lg">
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
                           <td>{{ country.area }} <small>km<sup>2</sup></small></td>
                        </tr>
                        <tr>
                           <td>Population</td>
                           <td>{{ country.population }}</td>
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
               </div>
            </div><!-- ./panel -->
         </transition>
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

      }
   },
   mounted(){
      axios.get(`https://restcountries.eu/rest/v2/alpha/${this.$route.params.id}`)
         .then(res => {
            console.log(res.data);
            this.country = res.data;
         })
         .catch(err => {
            console.error('Error:', err);
         });
   },
   methods: {
      mapLanguages(val){
         if(!val) return false; 
         return val;
      },
      formatter(){
         return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 2
         });
      }
   },
   head(){
    return {
      title: this.country.name + ' country information',
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

