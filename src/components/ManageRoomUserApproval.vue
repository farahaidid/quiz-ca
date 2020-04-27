<template>
  <div v-if="loading" class="overlay">
    <tile-spinner class="to-center" />
  </div>
  <div v-else id="manage-room-user-approval-container">
    <div v-if="error" class="alert alert-danger" role="alert">
      <strong>{{error}}</strong>
    </div>
    <div class="px-5 pb-5">
      <b-row>
        <b-col md="6" class="mb-2">
          <b-form-group horizontal label="Filter" class="mb-0">
            <b-input-group>
              <b-form-input v-model="userReqTableSettings.filter" placeholder="Type to Search" />
              <b-input-group-append>
                <b-btn :disabled="!userReqTableSettings.filter" @click="userReqTableSettings.filter = ''">Clear</b-btn>
              </b-input-group-append>
            </b-input-group>
          </b-form-group>
        </b-col>
        <b-col md="6" class="mb-2">
          <b-row>
            <b-col md="3">
              <b-form-group horizontal label="Rows" class="mb-0">
                <b-input-group>
                  <b-form-select v-model="userReqTableSettings.perPage" slot="append">
                    <option
                      :value="num"
                      :selected="i==0"
                      v-for="(num,i) in userReqTableSettings.pageOptions"
                      :key="i"
                    >{{num}}</option>
                  </b-form-select>
                </b-input-group>
              </b-form-group>
            </b-col>
          </b-row>
        </b-col>
      </b-row>
      <b-table
        class="caption w-100 data-table"
        head-variant="light"
        hover
        striped
        show-empty
        small
        responsive
        foot-clone
        :items="roomUsers"
        :fields="userReqTableHeader"
        :filter="userReqTableSettings.filter"
        :sort-by.sync="userReqTableSettings.sortBy"
        :sort-desc.sync="userReqTableSettings.sortDesc"
        :sort-direction="userReqTableSettings.sortDirection"
        @filtered="onUserReqTableFiltered"
        :busy="isUserReqTableBusy"
      >
        <template v-slot:cell(joinedAt)="row">
          <span>
            {{formatDate(row.item.joinedAt)}}
          </span>
        </template>
        <template v-slot:cell(isApproved)="row">
          <span v-if="row.item.isApproved == true" class="text-success">APPROVED</span>
          <span v-else class="text-danger">BLOCKED</span>
        </template>
        <template v-slot:cell(actions)="row">
          <span v-if="row.item.isOwner" class="text-success title">OWNER</span>
          <span v-else>
            <button class="btn btn-sm btn-danger" @click="blockUser(row.item.id)" v-if="row.item.isApproved">BLOCK</button>
            <button class="btn btn-sm btn-success" @click="approveUser(row.item.id)" v-else>APPROVE</button>
          </span>
        </template>
        <div slot="table-busy" class="text-center my-2">
          <b-spinner class="align-middle"></b-spinner>&nbsp;
          <strong>Loading...</strong>
        </div>
      </b-table>
    </div>

  </div>
</template>

<script>
import {mapActions} from "vuex"
import GLOBAL from "@/mixins/GLOBAL"
export default {
  mixins: [GLOBAL],
  data(){
    return {
      loading: true,
      room: null,
      error: null,
      userReqTableSettings: {
        currentPage: 1,
        perPage: 100,
        totalRows: 0,
        pageOptions: [100, 250, 500, 1000],
        sortBy: 'time',
        sortDesc: false,
        sortDirection: "desc",
        filter: null
      },
      isUserReqTableBusy: true,
      userReqTableHeader: [
        {
          key: "name",
          label: "NAME",
          sortable: true,
          thClass: "text-left",
          tdClass: "text-left"
        },
        {
          key: "joinedAt",
          label: "JOINED AT",
          sortable: true,
          thClass: "text-left",
          tdClass: "text-left"
        },
        {
          key: "isApproved",
          label: "APPROVAL",
          sortable: true,
          thClass: "text-left",
          tdClass: "text-left"
        },
        {
          key: "actions",
          label: "ACTIONS",
          sortable: false,
          thClass: "text-left",
          tdClass: "text-left"
        },
      ]
    }
  },
  created(){
    if(this.$route.params.name){
      this.fetchRoomData()
    }else{
      this.loading = false
      this.error = "No Room Name Provided"
    }
  },
  computed:{
    roomUsers(){
      return this.room.users || []
    }
  },
  methods: {
    ...mapActions("ROOM",["FETCH_ROOM","APPROVE_USER","BLOCK_USER"]),
    onUserReqTableFiltered(filteredItems) {
      this.userReqTableSettings.totalRows = filteredItems.length;
      this.userReqTableSettings.currentPage = 1;
		},
    async fetchRoomData(){
      await this.FETCH_ROOM(this.$route.params.name).then(room => {
        if(!room.error){
          this.room = room.data
        }else{
          this.error = room.message
        }
        this.loading = false
        this.isUserReqTableBusy = false
      })
    },
    async approveUser(uid){
      let data = {
        roomId: this.room.id,
        uId: uid
      }
      await this.APPROVE_USER(data)
      this.room.users.map(u => {
        if(u.id == uid) u.isApproved = true
        return u
      })
    },
    async blockUser(uid){
      let data = {
        roomId: this.room.id,
        uId: uid
      }
      await this.BLOCK_USER(data)
      this.room.users.map(u => {
        if(u.id == uid) u.isApproved = false
        return u
      })
    },
  }
}
</script>

<style>
tfoot{
	display: none !important;
}
th{
  background-color: rgb(94,114,228) !important;
  color: white !important;
}
</style>