import axios from 'axios'

export default ({ app: { store } }) => {
    if(store.state.country.countries.length === 0){
        axios.get('https://restcountries.eu/rest/v2/all')
            .then(res => {
                store.commit('country/add', res.data)
            })
             .catch(err => {
                console.error('Error: ', err);
            });
    }
}