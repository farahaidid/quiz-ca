<template>
	<div class="Dashboard py-3">
		<div class="container">
			<h5 class="mb-4">Newest rooms</h5>
			<div class="row row-grid">
				<div v-for="room in ROOMS" :key="room.id" class="col-lg-4">
					<RoomCard :data="room" />
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import RoomCard from "../../components/RoomCard"
import { mapGetters } from 'vuex'
export default {
	name: 'Dashboard',
	components: { RoomCard },
	computed: {
		...mapGetters('ROOM', ["ROOMS"])
	}
}
</script>
