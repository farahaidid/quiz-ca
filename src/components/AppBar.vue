<template>
	<base-nav type="primary" effect="dark" expand>
		<a class="navbar-brand" href="/">Quiz App</a>

		<div class="row" slot="content-header" slot-scope="{closeMenu}">
			<div class="col-6 collapse-brand">
				<a href="https://demos.creative-tim.com/vue-argon-design-system/documentation/">
					<img src="https://demos.creative-tim.com/vue-argon-design-system/img/brand/blue.png" />
				</a>
			</div>
			<div class="col-6 collapse-close">
				<close-button @click="closeMenu"></close-button>
			</div>
		</div>

		<ul class="navbar-nav ml-lg-auto">
			<router-link to="/join" class="mt-1 mr-3">
				<base-button type="warning">Join room</base-button>
			</router-link>
			<router-link to="/create" class="mt-1">
				<base-button type="success">Create room</base-button>
			</router-link>
		</ul>
	</base-nav>
</template>
<script>
import BaseNav from "../components/VueArgon/BaseNav"
export default {
	name: "Appbar",
	data: () => ({

	}),
	components: { "base-nav": BaseNav }
}
</script>