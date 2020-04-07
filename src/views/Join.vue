<template>
	<section class="section section-shaped my-0 py-0">
		<div class="shape shape-style-1 bg-gradient-default">
			<span></span>
			<span></span>
			<span></span>
			<span></span>
			<span></span>
			<span></span>
			<span></span>
			<span></span>
		</div>
		<div class="container">
			<div class="row justify-content-center">
				<div class="col-lg-5">
					<card
						type="secondary"
						shadow
						header-classes="bg-white pb-5"
						body-classes="px-lg-5 py-lg-5"
						class="border-0"
					>
						<h4 class="text-center mb-4">Enter your name and room key to join</h4>
						<form role="form">
							<base-input alternative type="text" class="mb-3" placeholder="Room name or code"></base-input>
							<base-input alternative type="text" placeholder="Enter your name"></base-input>
							<div class="text-center">
								<base-button type="primary" class="mt-4">Join room</base-button>
							</div>
						</form>
					</card>
				</div>
			</div>
		</div>
	</section>
</template>
<script>
export default {};
</script>
<style lang="scss" scoped>
	.section {
		min-height: 100vh;
	}
</style>