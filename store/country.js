export const state = () => ({
    countries: [],
    searchResults: [],
    search: ''
})

export const getters = {
    getSearch: state => state.search,
    all: state => state.countries,
    results: state => state.searchResults,
}

export const mutations = {
    add (state, payload) {
        state.countries = payload;
    },
    searchTerm(state, payload){
        state.search = payload;
    },
    updateSearchResults(state, payload){
        state.searchResults = payload;
    }
}