<template>
  <card type="secondary" shadow header-classes="bg-white pb-5" body-classes="px-lg-5 py-lg-5" class="join-card border-0">
		<h5 class="text-center mb-4">Create A New Account</h5>
		<form role="form">
			<div v-if="error" class="alert alert-danger" role="alert">
				<strong>{{error}}</strong>
				<button @click="error=null" type="button" class="close" data-dismiss="alert" aria-label="Close">
					<span aria-hidden="true">&times;</span>
				</button>
			</div>
			<base-input v-model="fullName" alternative type="text" placeholder="Full Name" required />
			<base-input v-model="email" alternative type="text" placeholder="Email" required />
			<base-input v-model="password" alternative type="password" placeholder="Password" required />
			<base-input v-model="password2" alternative type="password" placeholder="Retype Password" required />
			<div class="d-flex mt-4">
				<base-button @click="signup" class="w-100" type="primary">
          <span v-if="!loading">Submit</span>
          <div v-if="loading" class="overlay pos-rel d-inline-block">
            <tile-spinner class="to-center" />
          </div>
        </base-button>
        <div class="spacer"></div>
				<router-link to="/login" class="mw-max mt-2">Already have an account?</router-link>
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
      fullName: '',
      email: '',
      password: '',
      password2: '',
    }
  },
  methods:{
    ...mapActions("USER",["SIGNUP"]),
    async signup(){
      if(this.loading) return
      if(this.validateForm()){
        this.loading = true
        let data = {
          fullName: this.fullName.trim(),
          email: this.email.trim().toLowerCase(),
          password: this.password.trim()
        }
        await this.SIGNUP(data).then(user => {
          this.loading = false
          this.$router.push({name: 'Dashboard'})
        }).catch(err => {
          this.error = err.message.split("Error: ")[1]
          this.loading = false
        })
      }
    },
    validateForm(){
      let str = ''
      if (this.fullName.trim().length == 0){
        str = 'Name Required'
      }else if (this.email.trim().length == 0){
        str = 'Email Required'
      }else if (!this.validateEmail(this.email)){
        str = 'Email is not valid'
      }else if (this.password.trim().length == 0){
        str = 'Password Required'
      }else if(this.password.trim() != this.password2.trim()){
        str = 'Password didnot match'
      }
      if(str.length>0){
        this.error = str
        return false
      }else {
        this.error = null
        return true
      }
    },
    validateEmail(email) {
      var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(email).toLowerCase());
    }
  }
}
</script>

<style>

</style>