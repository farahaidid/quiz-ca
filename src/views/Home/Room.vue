<template>
	<div class="room py-5">
		<div class="container">
			<card class="mb-3">
				<header class="d-flex">
					<p class="lead my-0 mb-0 w-100">{{ROOM.name}}</p>
					<div class="spacer"></div>
					<base-button @click="quizStarted=true" type="primary">Start quiz</base-button>
				</header>
				<div class="d-flex">
					<p class="code mb-0 mr-5">
						<span class="text-dark">CODE : </span>
						<span>{{ROOM.code}}</span>
					</p>
					<p class="code mb-0">
						<span class="text-dark">YOUR SCORE : </span>
						<span>{{myScore}}</span>
					</p>
				</div>
				<hr class="my-3" />
				<badge type="success" rounded>DIFFICULTY : {{ROOM.difficulty}}</badge>
				<badge type="primary" rounded>PERTICIPANTS : {{ROOM.noOfUsers}}</badge>
				<badge type="warning" rounded>TOP SCORE : {{topScore}} / 50</badge>
				<badge type="danger" rounded>AVERAGE SCORE : {{averageScore}}</badge>
			</card>
			<card v-if="topScorers.length>0">
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
			return this.ROOM.users ? this.ROOM.users
				.filter(u => u.score)
				.sort((a, b) => b.score && a.score ? b.score - a.score : 0)
				.map(u => ({ name: u.name, score: u.score * 2 }))
				.slice(0, 3) : []
		},
		topScore() {
			return this.topScorers.length > 0 ? this.topScorers[0].score / 2 : 0
		},
		averageScore() {
			if (!this.ROOM.users) { return 0 }
			let totalScore = this.ROOM.users.reduce(
				(totalScore, user) => user.score ? totalScore + user.score : totalScore
				, 0
			)
			return (totalScore / this.ROOM.noOfUsers).toFixed(2)
		},
		myScore() {
			if (!this.ROOM.users) return 0
			let user = this.ROOM.users.find(user => user.name === this.ROOM.joinedAs.name)
			return user ? user.score : 0
		}
	},
	methods: {
		...mapActions("ROOM", ['FETCH_ROOM'])
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