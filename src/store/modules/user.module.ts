import { ActionContext } from 'vuex'

interface IUser {
    name: string,
    text: string,
    cityID: number,
    score: number
}

interface IUserState {
    users: IUser[],
    filteredUsers: IUser[],
    cityFilter: number,
    scoreFilter: string
}

export default {
    namespaced: true,
    root: true,
    state: {
        users: [],
        filteredUsers: [],
    },

    mutations: {
        setUsersState (state: IUserState, payload: IUser[]): void {
            state.users = payload
        },
        setFilteredUsers(state: IUserState, payload: any): void {
            state.filteredUsers = payload
        }
    },

    actions: {
        async fetchUsers({ commit }: ActionContext<IUserState, any>): Promise<void> {
            try {
                const response = await fetch('http://localhost:3000/users')
                const data = await response.json()
                commit('setUsersState', data)
            } catch (e) {
                console.log(e)
            }
        },
        filterByCity({ state, commit, getters }: ActionContext<IUserState, any>, payload: number): void {
            if(payload === 0) {
                const users = getters['users']
                commit('setFilteredUsers', users)
                return
            }
            const users = state.users.filter(u => u.cityID === payload)
            commit('setFilteredUsers', users)
        },
        filterByScore({ state, commit, getters }: ActionContext<IUserState, any>, payload: string): void {
            if(!payload) {
                const users = getters['users']
                commit('setFilteredUsers', users)
                return
            }
            const operator = payload.split(' ').shift()
            const score = Number(payload.split(' ').pop())
            if(operator === '>') {
                const users = state.users.filter(u => u.score > score)
                commit('setFilteredUsers', users)
                console.log(users)
            } else {
                const users = state.users.filter(u => u.score < score)
                commit('setFilteredUsers', users)
            }
        }
    },

    getters: {
        users (state: IUserState) {
            return state.users
        },
        filteredUsers(state: IUserState) {
            return state.filteredUsers
        }
    }
}