<template>
  <card type="secondary" shadow header-classes="bg-white pb-5" body-classes="px-lg-5 py-lg-5" class="join-card border-0">
		<h5 class="text-center mb-4">Log In</h5>
		<form role="form">
			<div v-if="error" class="alert alert-danger" role="alert">
				<strong>{{error}}</strong>
				<button @click="error=null" type="button" class="close" data-dismiss="alert" aria-label="Close">
					<span aria-hidden="true">&times;</span>
				</button>
			</div>
			<base-input v-model="email" alternative type="text" placeholder="Email" />
			<base-input v-model="password" alternative type="password" placeholder="Password" />
			<div class="d-flex mt-4">
				<base-button @click="login" class="w-100" type="primary">
          <span v-if="!loading">Log in</span>
          <div v-if="loading" class="overlay pos-rel">
            <tile-spinner class="to-center" />
          </div>
        </base-button>
        <div class="spacer"></div>
				<router-link to="/signup" class="mw-max mt-2">Create new account</router-link>
			</div>
		</form>
	</card>
</template>

<script>
import {mapActions} from "vuex"
export default {
  data(){
    return{
      error: null,
      loading: false,
      email: '',
      password: '',
    }
  },
  methods:{
    ...mapActions("USER",["LOGIN"]),
    async login(){
      if(this.loading) return
      this.loading = true
      let data = {
        email: this.email.toLowerCase().trim(),
        password: this.password.trim()
      }
      await this.LOGIN(data).then(user => {
        this.loading = false
        this.$router.push({name: 'Dashboard'})
      }).catch(err => {
        this.error = err.message.split("Error: ")[1]
        this.loading = false
      })
    },
  }
}
</script>

<style>

</style>