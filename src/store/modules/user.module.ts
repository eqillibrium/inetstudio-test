import { ActionContext } from 'vuex'

interface IUser {
    name: string,
    text: string,
    cityID: number
}

interface IUserState {
    users: IUser[],
    cityFilter: number
}

export default {
    namespaced: true,
    root: true,
    state: {
        users: [],
        cityFilter: 0,
    },

    mutations: {
        setUsersState (state: IUserState, payload: IUser[]): void {
            state.users = payload
        },
        setCityFilterState(state: IUserState, payload: number): void {
            state.cityFilter = payload
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
        } 
    },

    getters: {
        users (state: IUserState) {
            if(state.cityFilter === 0) {
                return state.users
            }
            return state.users.filter(el => el.cityID === state.cityFilter)
        }
    }
}