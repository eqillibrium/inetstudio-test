import { ActionContext } from 'vuex'

export interface IUser {
    name: string,
    text: string,
    cityID: number,
    score: number
}

export interface IUserState {
    users: IUser[],
    filteredUsers: IUser[]
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
        filter({ commit }: ActionContext<IUserState, any>, payload: IUser[]): void {
            commit('setFilteredUsers', payload)
        },
    },

    getters: {
        users (state: IUserState): IUser[] {
            return state.users
        },
        filteredUsers(state: IUserState): IUser[] {
            return state.filteredUsers
        }
    }
}