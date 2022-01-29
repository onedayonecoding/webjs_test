<template>
  <div>
    <b-modal id="modal-device-inform" :title="getTitle" @ok="onSubmit">
      <div>
        <b-form-group v-if="inputMode === 'update'" label="id" label-for="code" label-cols="4">
          <b-form-input id="id" v-model="device.id" disabled></b-form-input>
        </b-form-group>
        <b-form-group label="이름" label-for="code" label-cols="4">
          <b-form-input id="name" v-model="device.name"></b-form-input>
        </b-form-group>
        <b-form-group label="장비이름" label-for="code" label-cols="4">
          <b-form-input id="device_model_name" v-model="device.device_model_name"></b-form-input>
        </b-form-group>
        <b-form-group label="모델명" label-for="code" label-cols="4">
          <b-form-input id="manufacturer" v-model="device.manufacturer"></b-form-input>
        </b-form-group>
        <b-form-group label="설치위치" label-for="code" label-cols="4">
          <b-form-input id="location" v-model="device.location"></b-form-input>
        </b-form-group>
        <b-form-group label="엣지 시리얼 번호" label-for="code" label-cols="4">
          <b-form-input id="edge_serial_number" v-model="device.edge_serial_number"></b-form-input>
        </b-form-group>
        <b-form-group label="통신 인터페이스" label-for="code" label-cols="4">
          <b-form-input id="network_interface" v-model="device.network_interface"></b-form-input>
        </b-form-group>
        <b-form-group label="통신 설정정보" label-for="code" label-cols="4">
          <b-form-textarea id="network_config" v-model="device.network_config"></b-form-textarea>
        </b-form-group>
        <b-form-group label="상세정보" label-for="code" label-cols="4">
          <b-form-textarea id="description" v-model="device.description"></b-form-textarea>
        </b-form-group>
        <b-form-group v-if="inputMode === 'update'" label="등록일" label-for="code" label-cols="4">
          <b-form-input id="createdAt" :value="getCreatedAt" disabled></b-form-input>
        </b-form-group>
      </div>
    </b-modal>
  </div>
</template>

<script>
export default {
  data() {
    return {
      device: {
        id: null,
        name: null,
        device_model_name: null,
        manufacturer: null,
        location: null,
        edge_serial_number: null,
        network_interface: null,
        network_config: null,
        description: null,
        createdAt: null
      }
    }
  },
  computed: {
    infoData() {
      return this.$store.getters.Device
    },
    inputMode() {
      return this.$store.getters.DeviceInputMode
    },
    getTitle() {
      let title = ''
      if (this.inputMode === 'insert') {
        title = '장비정보 입력'
      } else if (this.inputMode === 'update') {
        title = '장비정보 수정'
      }

      return title
    },
    getCreatedAt() {
      return this.device.createdAt && this.device.createdAt.substring(0, 10)
    }
  },
  watch: {
    // 모달이 열린 이후에 감지됨
    infoData(value) {
      this.device = { ...value }
    }
  },
  created() {
    // 모달이 최초 열릴때 감지됨
    this.device = { ...this.infoData }
  },
  methods: {
    onSubmit() {
      // 1. 등록인 경우
      if (this.inputMode === 'insert') {
        this.$store.dispatch('actDeviceInsert', this.device) // 입력 실행
      }

      // 2. 수정인 경우
      if (this.inputMode === 'update') {
        this.$store.dispatch('actDeviceUpdate', this.device) // 수정 실행
      }
    }
  }
}
</script>

<style lang="scss" scoped></style>
