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
	body {
		overflow: auto !important;
		scroll-behavior: smooth !important;
	}
	#app {
		font-family: Avenir, Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		color: #212121;
	}
	.spacer {
		width: 100%;
	}
	.to-center {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	}
	.pos-rel {
		position: relative;
	}
	.overlay {
		position: absolute;
		top: 0;
		left: 0;
		height: 100%;
		width: 100%;
		background-color: rgba(255, 255, 255, 0.85);
		border-radius: 0.4rem;
		z-index: 100;
	}
	.mw-max {
		min-width: max-content;
	}
</style>
