import { ActionContext } from 'vuex'

interface ICityFilter {
    label: string,
    value: number
}

interface IScoreFilter {
    label: string,
    value: string
}

interface IFiltersState {
    cityFilters: ICityFilter[],
    scoreFilters: IScoreFilter[],
}

export default {
    namespaced: true,
    root: true,
    state: {
        cityFilters: [],
        scoreFilters: []
    },
    mutations: {
        setCityFiltersState(state: IFiltersState, payload: ICityFilter[]): void {
            state.cityFilters = payload
        },
        setScoreFiltersState(state: IFiltersState, payload: IScoreFilter[]): void {
            state.scoreFilters = payload
        }
    },
    actions: {
        async fetchFilters({ commit }: ActionContext<IFiltersState, any>): Promise<void> {
            try {
                const response = await fetch('http://localhost:3000/filters')
                const data = await response.json()
                commit('setCityFiltersState', data.city)
                commit('setScoreFiltersState', data.score)
            } catch (e) {
                console.log(e)
            }
        }
    },
    getters: {
        cityfilters (state: IFiltersState) {
            return state.cityFilters
        },
        scorefilters (state: IFiltersState) {
            return state.scoreFilters
        }
    }
}