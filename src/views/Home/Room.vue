<template>
	<div class="room py-5">
		<div class="container">
			<card class="mb-3">
				<header class="d-flex">
					<p class="lead my-0 mb-2 w-100">{{ROOM.name}}</p>
					<div class="spacer"></div>
					<base-button @click="quizStarted=true" type="primary">Start quiz</base-button>
				</header>
				<badge type="success" rounded>DIFFICULTY : {{ROOM.difficulty}}</badge>
				<badge type="primary" rounded>PERTICIPANTS : {{ROOM.users.length}}</badge>
				<badge type="warning" rounded>TOP SCORE : 48/50</badge>
				<badge type="danger" rounded>AVERAGE SCORE : 32/50</badge>
			</card>
			<card>
				<p class="lead my-0">Leaderboard</p>
				<badge type="success" class="mb-3" rounded>TOP THREE SCORER</badge>
				<div class="top-3">
					<base-progress
						v-for="(user, index) in topScorers"
						:key="index"
						class="pt-0"
						type="success"
						:label="user.name"
						:value="user.score"
					/>
				</div>
			</card>
			<Questions
				@done="quizStarted=false"
				v-if="ROOM.questions&&quizStarted"
				:data="ROOM.questions.questions"
			/>
		</div>
	</div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

// Components
import Questions from "../../components/Questions"

export default {
	name: "Room",
	data: () => ({
		quizStarted: false
	}),
	components: {
		Questions
	},
	created() {
		let roomName = this.$route.params.name.toUpperCase().split("-").join(" ")
		this.FETCH_ROOM(roomName)
	},
	computed: {
		...mapGetters('ROOM', ['ROOM']),
		topScorers() {
			return this.ROOM.users
				.sort((a, b) => b.score && a.score ? b.score - a.score : 0)
				.map(u => ({ name: u.name, score: (u.score / 50) * 100 }))
				.slice(0, 2)
		}
	},
	methods: {
		...mapActions("ROOM", ['FETCH_ROOM'])
	}
}
</script>