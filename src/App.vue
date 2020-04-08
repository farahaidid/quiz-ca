<template>
	<div id="app">
		<main>
			<fade-transition origin="center" mode="out-in" :duration="250">
				<router-view />
			</fade-transition>
		</main>
	</div>
</template>
<script>
import { FadeTransition } from "vue2-transitions";
export default {
	name: "App",
	components: { FadeTransition }
};
</script>

<style lang="scss">
	#app {
		font-family: Avenir, Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		color: #212121;
	}
	.spacer {
		width: 100%;
	}
</style>
