import ROOMS from "../../api/room.api"

const initialState = {
   rooms: [],
   room: null
}

const state = { ...initialState }

const getters = {
   ROOMS: state => state.rooms,
   ROOM: state => state.room
}

const mutations = {
   SET_STATE: (state, payload) => {
      Object.keys(payload).forEach(key => state[key] = payload[key])
   }
}

const actions = {
   FETCH_ROOMS: async ({ commit }) => {
      let { error, data, mesaage } = await ROOMS.FETCH_ROOMS()
      if (error) return { error, mesaage }
      commit('SET_STATE', { rooms: data })
      return { error, rooms: data }
   },
   FETCH_ROOM: async ({ commit, state }, payload) => {
      let { error, data, message } = await ROOMS.FETCH_ROOM(payload)
      if (error) { return { error, message } }
      commit('SET_STATE', { room: { ...state.room, ...data } })
      return { error, message }
   },
   JOIN_ROOM: async ({ commit }, payload) => {
      let { error, data, message } = await ROOMS.JOIN_ROOM(payload)
      if (error) {
         return { error, message }
      }
      commit('SET_STATE', { room: data })
      return { name: data.name }
   },
   CREATE_ROOM: async ({ commit }, payload) => {
      let { error, data, message } = await ROOMS.CREATE_ROOM(payload)
      if (error) { return { error, message } }
      commit('SET_STATE', { room: data })
      return { name: data.name }
   },
   UPDATE_SCORE: async ({ state, dispatch }, score) => {
      await ROOMS.UPDATE_SCORE({
         roomId: state.room.id, userId: state.room.joinedAs.id, score
      })
      dispatch('FETCH_ROOM', state.room.name)
   }
}

export default {
   namespaced: true, state,
   getters, mutations, actions
}