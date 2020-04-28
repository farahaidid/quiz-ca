<template>
	<card type="secondary" shadow header-classes="bg-white pb-5" body-classes="px-lg-5 py-lg-5" class="border-0">
		<h4 class="text-center mb-4">Create a new room</h4>
		<h6 class="text-center mb-4">Enter the informations correctly to create a new room</h6>
		<form role="form">
			<div v-if="error" class="alert alert-danger" role="alert">
				<strong>{{error}}</strong>
				<button
					@click="error=null"
					type="button"
					class="close"
					data-dismiss="alert"
					aria-label="Close"
				>
					<span aria-hidden="true">&times;</span>
				</button>
			</div>
			<base-input v-model="roomName" alternative type="text" placeholder="Enter room name" />
			<base-input v-if="!isLogged" v-model="userName" alternative type="text" placeholder="Enter your name" />
			<div class="d-flex">
				<base-dropdown>
					<base-button slot="title" type="secondary" class="dropdown-toggle w-100">{{difficulty}}</base-button>
					<li
						v-for="(item, index) in difficulties"
						:key="index"
						@click="difficulty=item"
						class="dropdown-item"
					>{{item}}</li>
				</base-dropdown>
				<div class="spacer"></div>
				<base-dropdown>
					<base-button slot="title" type="secondary" class="dropdown-toggle w-100">{{showCategoryByValue(category)}}</base-button>
					<li
						v-for="(item, index) in categories"
						:key="index"
						@click="category=item.value"
						class="dropdown-item"
					>{{item.text}}</li>
				</base-dropdown>
			</div>
			<div class="text-center mt-3">
				<base-button @click="createRoom" type="primary">Create room</base-button>
			</div>
			<div class="text-center mt-4">
				<router-link to="/join">Join a room</router-link>
			</div>
		</form>
		<div v-if="loading" class="overlay pos-rel">
			<tile-spinner class="to-center" />
		</div>
	</card>
</template>
<script>

// Vuex
import { mapActions, mapGetters } from "vuex"
import GLOBAL from "@/mixins/GLOBAL"

export default {
	name: "CreateRoom",
	mixins: [GLOBAL],
	data: () => ({
		error: null,
		roomName: "",
		userName: "",
		// Difficulty
		difficulty: "Easy",
		difficulties: ['Easy', 'Medium', 'Hard'],
		loading: false,
		category: 'any',
	}),
	methods: {
		...mapActions("ROOM", ["CREATE_ROOM"]),
		async createRoom() {
			if(!this.userId) return
			if(this.isLogged) this.userName = this.user.fullName
			let isValid = this.roomName.trim() !== "" && this.userName.trim() !== ""
			if (isValid) {
				this.loading = true;
				let { error, message, name } = await this.CREATE_ROOM({
					userId: this.userId,
					name: this.roomName,
					userName: this.userName,
					difficulty: this.difficulty,
					category: this.category
				})
				this.loading = false
				if (error) { this.error = message }
				else {
					if (this.error) this.error = null
					this.$router.push("/rooms/" + name)
				}
			}
		}
	},
	computed:{
		...mapGetters("USER",["userId","isLogged","user"]),
	},
};
</script>
<style scoped>
	.section {
		min-height: 100vh;
	}
	>>>.dropdown-menu.show {
		max-height: 200px !important;
		overflow: scroll !important;
	}
	
</style>