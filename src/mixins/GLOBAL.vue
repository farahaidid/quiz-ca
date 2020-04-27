<template>
  <div></div>
</template>

<script>
import moment from "moment"
export default {
  methods:{
		formatDate(dt){
			let d = moment(dt).format("D MMM YYYY HH:mm")
			if(d == 'Invalid date') return ''
			return d
		},
  }
}
</script>

<style>

</style>