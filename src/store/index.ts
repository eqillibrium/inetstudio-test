import { createLogger, createStore } from 'vuex'
import userModule from './modules/user.module'
import filterModule from './modules/filter.module'

const plugins = []
if (process.env.NODE_ENV === 'development') {
	plugins.push(createLogger())
}

export default createStore({
    plugins,
    state: {
    },
    getters: {
    },
    mutations: {
    },
    actions: {
    },
    modules: {
		userModule,
		filterModule
    }
})
