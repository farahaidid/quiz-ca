<template>
	<card class="border-0" hover shadow body-classes="py-4">
		<h6 class="text-primary text-uppercase">{{data.name}}</h6>
		<div>
			<badge type="success" rounded>DIFFICULTY : {{data.difficulty}}</badge>
			<badge type="primary" rounded>Perticipants : 20</badge>
		</div>
		<!-- <div class="d-flex">
		<base-input class="mb-0" type="text" placeholder="Your name" />-->
		<!-- <router-link :to="roomPath"> -->
		<base-button disabled type="primary" size="sm" class="mt-4">JOIN Room</base-button>
		<!-- </router-link> -->
		<!-- </div> -->
	</card>
</template>

<script>
export default {
	name: "RoomCard",
	props: {
		data: Object
	},
	computed: {
		roomPath() {
			console.log(this.data)
			return "/rooms/" + this.data.name.toLowerCase().split(" ").join("-")
		}
	}
}
</script>