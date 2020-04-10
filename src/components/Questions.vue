<template>
	<div class="questions pb-5">
		<div class="text-center">
			<p class="lead text-primary">Solve the question and then click submit</p>
		</div>
		<card class="question mb-4" v-for="(qs, index) in questions" :key="index">
			<h6>
				<span>{{index+1}}.</span>
				<span>{{qs.question}}</span>
			</h6>
			<div class="options">
				<base-radio
					v-for="(option, opi) in qs.options"
					v-model="qs.checked"
					:name="option"
					:key="opi"
					class="option mb-3"
					:class="opi%2==0?'right':'left'"
				>{{option}}</base-radio>
			</div>
		</card>
		<base-button @click="onClickSubmit" type="primary" class="mt-4">Submit</base-button>
	</div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
	name: "Question",
	props: {
		data: Array
	},
	data: () => ({
		questions: []
	}),
	created() {
		this.questions = this.data ? this.data.map(qs => {
			let options = [...qs.incorrect_answers]
			let randomIndex = options.length === 1 ? this.randomBetween(0, 1) : this.randomBetween(0, 3)
			options.splice(randomIndex, 0, qs.correct_answer)
			return { ...qs, checked: null, options }
		}) : []
	},
	methods: {
		...mapActions('ROOM', ['UPDATE_SCORE']),
		async onClickSubmit() {
			let score = this.questions.reduce((counter, qs) => {
				return qs.correct_answer === qs.checked ? counter + 1 : counter
			}, 0)
			await this.UPDATE_SCORE(score)
			this.$emit("done")
		},
		randomBetween(min, max) {
			return Math.round(Math.random() * (max - min) + min);
		}
	}
}
</script>

<style lang="scss" scoped>
	.questions {
		.question {
			.options {
				width: 50%;
				display: grid;
				grid-template-columns: 1fr 1fr;
			}
		}
	}
</style>