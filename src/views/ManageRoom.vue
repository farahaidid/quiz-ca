<template>
  <div class="Dashboard py-3">
		<div class="container">
      <div class="d-flex mb-3">
				<h5 class="mb-4 w-100 mt-2">Manage Room</h5>
				<div class="spacer"></div>
			</div>
      <manage-room-user-approval /> 
		</div>
  </div>
</template>

<script>
import ManageRoomUserApproval from "@/components/ManageRoomUserApproval"
export default {
  components:{
    ManageRoomUserApproval
  }
}
</script>

<style>

</style>