import db from "../../firebase/init.firebase"
const initialState = {
  user: null
}

const state = { ...initialState }

const getters = {
  isLogged: s => s.user != null,
  user: s => s.user,
  userId: s => s.user ? s.user.id : null
}

const mutations = {
  SET_USER: (state, val) => {
    state.user = val
  },
  LOGOUT: (state,val) => {
    state.user = null
  }
}

const actions = {
  SIGNUP: async ({dispatch},data) => {
    return await db.collection("users").where("email","==",data.email).get().then(async snaps => {
      if(snaps.size > 0) throw new Error('Email already exists')
      return await db.collection("users").add(data).then( async ref =>{
        return await dispatch('FETCH_USER_BY_ID',ref.id)
      }).catch(serr => {throw new Error(serr)})
    }).catch(err => {throw new Error(err)})
  },
  LOGIN: async ({dispatch},data) => {
    return await db.collection("users").where("email","==",data.email).where("password","==",data.password).limit(1).get().then(async snaps => {
      if(snaps.size == 0) throw new Error('User not exists')
      return await dispatch('FETCH_USER_BY_ID',snaps.docs[0].id)
    }).catch(err => {throw new Error(err)})
  },
  FETCH_USER_BY_ID: async ({commit},uid) => {
    return await db.collection("users").doc(uid).get().then(doc => {
      let d = doc.data()
      delete d.password
      let obj = Object.assign({id:doc.id},d)
      commit('SET_USER',obj)
      return obj
    }).catch(err => {
      console.log(`FETCH_USER_BY_ID`,err);
      commit('SET_USER',null)
      return null
    })
  }
}

export default {
   namespaced: true, state,
   getters, mutations, actions
}