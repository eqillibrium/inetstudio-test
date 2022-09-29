import { ActionContext } from 'vuex'

interface ICityFilter {
    label: string,
    value: number
}

interface ICityFiltersState {
    cityFilters: ICityFilter[],
}

export default {
    namespaced: true,
    root: true,
    state: {
        cityFilters: []
    },
    mutations: {
        setCityFiltersState(state: ICityFiltersState, payload: ICityFilter[]): void {
            state.cityFilters = payload
        }
    },
    actions: {
        async fetchCityFilters({ commit }: ActionContext<ICityFiltersState, any>): Promise<void> {
            try {
                const response = await fetch('http://localhost:3000/filters')
                const data = await response.json()
                commit('setCityFiltersState', data)
            } catch (e) {
                console.log(e)
            }
        }
    },
    getters: {
        cityfilters (state: ICityFiltersState) {
            return state.cityFilters
        }
    }
}