<template>
	<div class="home">
		<AppBar />
		<router-view />
	</div>
</template>

<script>
import AppBar from "@/components/AppBar"
import { mapActions } from 'vuex'
export default {
	name: "Home",
	components: { AppBar },
	created() {
		this.FETCH_ROOMS()
	},
	methods: {
		...mapActions("ROOM", ['FETCH_ROOMS']),
	}
}
</script>
<style lang="scss" scoped>
	.home {
		min-height: 100vh;
	}
</style>