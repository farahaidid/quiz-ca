<template>
	<base-nav type="primary" effect="dark" expand>
		<a class="navbar-brand" href="/">Quiz App</a>

		<div class="row" slot="content-header" slot-scope="{closeMenu}">
			<div class="col-6 collapse-brand">
				<a href="https://demos.creative-tim.com/vue-argon-design-system/documentation/">
					<img src="https://demos.creative-tim.com/vue-argon-design-system/img/brand/blue.png" />
				</a>
			</div>
			<div class="col-6 collapse-close">
				<close-button @click="closeMenu"></close-button>
			</div>
		</div>

		<ul class="navbar-nav ml-lg-auto">
			<router-link to="/join" class="mt-1 mr-3">
				<base-button type="warning">Join room</base-button>
			</router-link>
			<router-link to="/create" class="mt-1" v-if="isLogged">
				<base-button type="success">Create room</base-button>
			</router-link>
			<router-link to="/login" class="mt-1" v-if="!isLogged">
				<base-button type="success">Log In</base-button>
			</router-link>
			<base-button class="mt-1 ml-3" v-else @click="logout" type="danger">Log Out</base-button>
		</ul>
	</base-nav>
</template>
<script>
import BaseNav from "../components/VueArgon/BaseNav"
import {mapGetters,mapMutations} from "vuex"
export default {
	name: "Appbar",
	data: () => ({

	}),
	components: { "base-nav": BaseNav },
	computed: {
		...mapGetters("USER",["isLogged"])
	},
	methods:{
		...mapMutations("USER",["LOGOUT"]),
		logout(){
			this.LOGOUT()
			this.$router.push({name:'Dashboard'})
		},
	},
}
</script>