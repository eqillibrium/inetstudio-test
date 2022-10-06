import { ActionContext } from 'vuex'
import { IUser, IUserState } from './user.module'

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
    cityFilterState: number,
    scoreFilterState: string
}

const compareScore = (user: IUser, state: IFiltersState): boolean => {
    const operator = state.scoreFilterState.split(' ').shift()
    const score = Number(state.scoreFilterState.split(' ').pop())
    return operator === '>' ? user.score > score : user.score < score
}

export default {
    namespaced: true,
    root: true,
    state: {
        cityFilters: [],
        scoreFilters: [],
        cityFilterState: 0,
        scoreFilterState: '',
    },
    mutations: {
        setCityFiltersState(state: IFiltersState, payload: ICityFilter[]): void {
            state.cityFilters = payload
        },
        setScoreFiltersState(state: IFiltersState, payload: IScoreFilter[]): void {
            state.scoreFilters = payload
        },
        setCityFilterState(state: IFiltersState, payload: number): void {
            state.cityFilterState = payload
        },
        setScoreFilterState(state: IFiltersState, payload: string): void {
            state.scoreFilterState = payload
        },
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
        },
        filter({ state, dispatch, getters }: ActionContext<IFiltersState, any>) {

            if(!state.cityFilterState && !state.scoreFilterState) {
                const filtUsers = [...getters['getUsers']]
                dispatch('userModule/filter', filtUsers, { root: true })
                return
            }
            if(!state.cityFilterState && state.scoreFilterState) {
                const filtUsers = getters['getUsers'].filter((u: IUser) => compareScore(u, state))
                dispatch('userModule/filter', filtUsers, { root: true })
                return
            }
            if(state.cityFilterState && !state.scoreFilterState) {
                const filtUsers = getters['getUsers'].filter((u: IUser) => u.cityID === state.cityFilterState)
                dispatch('userModule/filter', filtUsers, { root: true })
                return
            }
            if(state.cityFilterState && state.scoreFilterState) {
                const filtUsers = getters['getUsers'].filter((u: IUser) => u.cityID === state.cityFilterState && compareScore(u, state))
                dispatch('userModule/filter', filtUsers, { root: true })
                return
            }
        }
    },
    getters: {
        cityfilters (state: IFiltersState): ICityFilter[] {
            return state.cityFilters
        },
        scorefilters (state: IFiltersState): IScoreFilter[] {
            return state.scoreFilters
        },
        getUsers (state: IUserState, __: any, ___: any, rootGetters: any): IUser[] {
            return rootGetters['userModule/users']
        },
    }
}