import { rankApi } from 'api'
import * as TYPE from '../actionType/rankType'
import _ from 'lodash'

const state = {
	ranklist: []
}

const getters = {
	ranklist: state => state.ranklist
}

const actions = {
	ranklist({commit, rootState}) {
		rootState.requesting = true
		commit(TYPE.RANK_LIST_REQUEST)
		rankApi.ranking3().then((response) => {
			rootState.requesting = false
			commit(TYPE.RANK_LIST_SUCCESS, response)
		}, () => {
			rootState.requesting = false
			commit(TYPE.RANK_LIST_FAILURE)
		})
	}
}

const mutations = {
	[TYPE.RANK_LIST_REQUEST] () {

	},
	[TYPE.RANK_LIST_SUCCESS] (state, response) {
		state.ranklist = _.values(response.recommend.list)
	},
	[TYPE.RANK_LIST_FAILURE] () {

	}
}

export default {
	state,
	getters,
	actions,
	mutations
}