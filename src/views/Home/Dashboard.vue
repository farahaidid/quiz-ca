<template>
	<div class="Dashboard py-3">
		<div v-if="loading" class="overlay">
			<tile-spinner class="to-center" />
		</div>
		<div class="container">
			<div class="d-flex mb-3">
				<h5 class="mb-4 w-100 mt-2">Newest rooms</h5>
				<div class="spacer"></div>
				<base-input v-model="filterKey" class="w-100" placeholder="Filter rooms" />
			</div>
			<div v-if="rooms.length>0" class="row row-grid">
				<div v-for="room in rooms" :key="room.id" class="col-lg-4 mb-5">
					<RoomCard @join="onJoinModal" :data="room" />
				</div>
			</div>
			<div v-else class="text-center">
				<h4 v-if="!loading">No rooms found!</h4>
			</div>
			<modal :show.sync="showJoinModal">
				<template slot="header">
					<h5 class="modal-title">
						<span>JOIN :</span>
						<span class="text-primary">{{modalRoom.name}}</span>
					</h5>
				</template>
				<div>
					<div v-if="modalError" class="alert alert-danger" role="alert">
						<strong>{{modalError}}</strong>
						<button
							@click="modalError=null"
							type="button"
							class="close"
							data-dismiss="alert"
							aria-label="Close"
						>
							<span aria-hidden="true">&times;</span>
						</button>
					</div>
					<base-input v-model="modalRoom.userName" placeholder="Your name" />
				</div>
				<template slot="footer">
					<base-button @click="onClickJoinRoom" type="primary">JOIN</base-button>
				</template>
			</modal>
		</div>
	</div>
</template>

<script>
import RoomCard from "../../components/RoomCard"
import { mapGetters, mapActions } from 'vuex'
export default {
	name: 'Dashboard',
	components: { RoomCard },
	data: () => ({
		// Booleans
		loading: true,

		filterKey: "",
		rooms: [],
		// Modal
		showJoinModal: false,
		modalError: null,
		modalRoom: { userName: "" },
	}),
	created() {
		this.FETCH_ROOMS().then(({ rooms }) => {
			this.rooms = rooms;
			this.loading = false
		})
	},
	computed: {
		...mapGetters('ROOM', ["ROOMS"])
	},
	methods: {
		...mapActions("ROOM", ["JOIN_ROOM", "FETCH_ROOMS"]),
		filterRooms() {
			this.rooms = this.ROOMS.filter(room => {
				return room.name.includes(this.filterKey.toUpperCase())
					|| room.code.includes(this.filterKey.toUpperCase())
			})
		},
		onJoinModal(room) {
			this.modalRoom = { ...this.modalRoom, ...room }
			this.showJoinModal = true
		},
		async onClickJoinRoom() {
			let isValid = this.modalRoom.userName.trim() !== ""
			if (isValid) {
				if (this.modalError) { this.modalError = null }
				let { error, message, name } = await this.JOIN_ROOM({
					name: this.modalRoom.name,
					userName: this.modalRoom.userName
				})
				if (error) { this.modalError = message }
				else {
					this.modalError = null
					this.$router.push("/rooms/" + name.toLowerCase().split(" ").join("-"))
				}
			}
			else { this.modalError = "You cann't leave the fields empty!" }
		}
	},
	watch: {
		filterKey() { this.filterRooms() },
		showJoinModal(val) {
			if (!val) { this.modalRoom = { userName: "" } }
		},
		//ROOMS(rooms) { this.rooms = rooms }
	}
}
</script>
