<template>
	<card class="border-0" hover shadow body-classes="py-4">
		<h6 class="text-uppercase" :class="`text-${getTypeFromDifficulty}`">{{data.name}}</h6>
		<p class="code mb-0">
			<span class="text-dark">CODE : </span>
			<span>{{data.code}}</span>
		</p>

		<hr class="my-3" />
		<div>
			<badge :type="getTypeFromDifficulty" rounded>DIFFICULTY : {{data.difficulty}}</badge>
			<badge type="primary" rounded>Perticipants : {{data.noOfUsers}}</badge>
		</div>
		<base-button v-if="userId != null && data.userId != null && data.userId == userId" @click="gotomanageRoom" type="primary" size="sm" class="mt-4">MANAGE Room</base-button>
		<base-button @click="$emit('join',data)" type="primary" size="sm" class="mt-4">JOIN Room</base-button>
	</card>
</template>

<script>
import {mapGetters} from "vuex"
export default {
	name: "RoomCard",
	props: {
		data: Object
	},
	computed: {
		...mapGetters("USER",["userId"]),
		roomPath() {
			return "/rooms/" + this.data.name.toLowerCase().split(" ").join("-")
		},
		getTypeFromDifficulty() {
			let { difficulty } = this.data
			return difficulty === 'Easy'
				? 'success' : difficulty === 'Medium' ? 'warning' : 'danger'
		},
	},
	methods: {
		gotomanageRoom(){
			this.$router.push({path: '/manage-room/'+this.data.name})
		}
	}
}
</script>
<style lang="scss" scoped>
	.code {
		font-size: 0.8em;
		.text-dark {
			color: #757575 !important;
		}
	}
</style>