<template>
  <div>
    <h1>장비 관리</h1>
    <div>
      <b-row>
        <b-col style="text-align: left">
          <b-input-group style="width: 250px">
            <b-form-input v-model="search.name" placeholder="장비 검색"></b-form-input>
            <b-input-group-append>
              <b-button variant="primary" size="sm" @click="searchDeviceList">검색</b-button>
            </b-input-group-append>
          </b-input-group>
        </b-col>
        <b-col style="text-align: right">
          <b-button variant="info" @click="onClickNewAdd">신규등록</b-button>
        </b-col>
      </b-row>
    </div>

    <b-table striped hover :items="DeviceList" :fields="fields">
      <template #cell(createdAt)="row">
        {{ row.item.createdAt.substring(0, 10) }}
      </template>
      <template #cell(updateBtn)="row">
        <b-button sm variant="success" @click="onClickEdit(row.item.id)">수정</b-button>
      </template>
      <template #cell(deleteBtn)="row">
        <b-button sm variant="danger" @click="onClickDelete(row.item.id)">삭제</b-button>
      </template>
    </b-table>
    <!-- 모달 -->
    <Inform />
  </div>
</template>

<script>
import Inform from './inform.vue'
export default {
  components: {
    Inform
  },
  data() {
    return {
      search: { name: null },
      fields: [
        { key: 'id', label: 'id' },
        { key: 'name', label: '이름' },
        { key: 'device_model_name', label: '장비이름' },
        { key: 'createdAt', label: '생성일' },
        { key: 'updateBtn', label: '수정' },
        { key: 'deleteBtn', label: '삭제' }
      ]
    }
  },
  computed: {
    DeviceList() {
      return this.$store.getters.DeviceList
    },
    insertResult() {
      return this.$store.getters.DeviceInsertedResult
    },
    updateResult() {
      return this.$store.getters.DeviceUpdatedResult
    },
    deleteResult() {
      return this.$store.getters.DeviceDeletedResult
    }
  },
  watch: {
    insertResult(value) {
      console.log('insertedResult', value)
      if (value !== null) {
        if (value > 0) {
          this.$bvToast.toast('등록되었습니다.', {
            title: 'SUCCESS',
            variant: 'success',
            solid: true
          })
          //등록 성공 후 장비 리스트가 재검색 되어야 함.
          this.searchDeviceList()
        } else {
          this.$bvToast.toast('실패하였습니다.', {
            title: 'Fail',
            variant: 'danger',
            solid: true
          })
        }
      }
    },
    updateResult(value) {
      console.log('updateResult', value)
      if (value !== null) {
        if (value > 0) {
          this.$bvToast.toast('수정되었습니다.', {
            title: 'SUCCESS',
            variant: 'success',
            solid: true
          })
          //수정 성공 후 장비 리스트가 재검색 되어야 함.
          this.searchDeviceList()
        } else {
          this.$bvToast.toast('실패하였습니다.', {
            title: 'Fail',
            variant: 'danger',
            solid: true
          })
        }
      }
    },
    deleteResult(value) {
      console.log('deleteResult', value)
      if (value !== null) {
        if (value > 0) {
          this.$bvToast.toast('삭제되었습니다.', {
            title: 'SUCCESS',
            variant: 'warning',
            solid: true
          })
          //삭제 성공 후 장비 리스트가 재검색 되어야 함.
          this.searchDeviceList()
        } else {
          this.$bvToast.toast('실패하였습니다.', {
            title: 'Fail',
            variant: 'danger',
            solid: true
          })
        }
      }
    }
  },
  created() {
    this.searchDeviceList()
  },
  methods: {
    searchDeviceList() {
      //검색 실행
      this.$store.dispatch('actDeviceList', this.search)
    },
    onClickNewAdd() {
      this.$store.dispatch('actDeviceInputMode', 'insert')
      this.$store.dispatch('actDeviceInit')
      this.$bvModal.show('modal-device-inform')
    },
    onClickEdit(id) {
      this.$store.dispatch('actDeviceInputMode', 'update')
      this.$store.dispatch('actDeviceInfo', id)
      this.$bvModal.show('modal-device-inform', {})
    },
    onClickDelete(id) {
      this.$bvModal
        .msgBoxConfirm('삭제하시겠습니까?')
        .then(value => {
          if (value) {
            this.$store.dispatch('actDeviceDelete', id)
          }
        })
        .catch(err => {
          console.log(err)
        })
      console.log('삭제')
    }
  }
}
</script>
