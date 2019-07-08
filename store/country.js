export const state = () => ({
    countries: []
})

export const mutations = {
    add (state, payload) {
        state.countries = payload;
    }
}