<template>
	<card type="secondary" shadow header-classes="bg-white pb-5" body-classes="px-lg-5 py-lg-5" class="join-card border-0">
		<h5 class="text-center mb-4">Join a room with room name or code</h5>
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
			<base-input
				v-model="room.nameOrCode"
				alternative
				type="text"
				placeholder="Room name or code"
			/>
			<base-checkbox v-model="room.isCode" class="mb-3">It is a room code</base-checkbox>
			<base-input v-if="!isLogged" v-model="room.userName" alternative type="text" placeholder="Enter your name" />
			<div class="d-flex mt-4">
				<base-button @click="onClickJoinRoom" class="w-100" type="primary">Join room</base-button>
								<div class="spacer"></div>
				<router-link to="/create" class="mw-max mt-2">Create a new room</router-link>
			</div>
		</form>
		<div v-if="loading" class="overlay pos-rel">
			<tile-spinner class="to-center" />
		</div>
	</card>
</template>
<script>

// Vuex
import { mapActions,mapGetters } from "vuex"

export default {
	name: "Join",
	data: () => ({
		error: null,
		room: {
			nameOrCode: "",
			isCode: false,
			userName: ""
		},
		loading: false
	}),
	computed:{
		...mapGetters("USER", ["isLogged","user"]),
	},
	methods: {
		...mapActions("ROOM", ["JOIN_ROOM"]),
		async onClickJoinRoom() {
			if(this.isLogged) this.room.userName = this.user.fullName
			let isValid = this.room.nameOrCode.trim() !== "" && this.room.userName.trim() !== ""
			if (isValid) {
				this.loading = true
				if (this.error) { this.error = null }
				let { error, message, name } = await this.JOIN_ROOM({
					isCode: this.room.isCode,
					[this.room.isCode ? 'code' : 'name']: this.room.nameOrCode,
					userName: this.room.userName
				})
				this.loading = false
				if (error) { this.error = message }
				else {
					this.error = null
					this.$router.push("/rooms/" + name)
				}
			}
			else { this.error = "You cann't leave the fields empty!" }
		}
	}
};
</script>
<style lang="scss" scoped>
	.section {
		min-height: 100vh;
	}
</style>