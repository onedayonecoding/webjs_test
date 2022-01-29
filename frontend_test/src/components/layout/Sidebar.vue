<template>
  <div>
    <b-list-group>
      <b-list-group-item
        href="#"
        :class="this.$route.path === '/dashboard' ? 'click' : ''"
        @click="onsubmit('/dashboard')"
        >대시보드
      </b-list-group-item>
      <b-list-group-item
        href="#"
        :class="this.$route.path === '/department' ? 'click' : ''"
        @click="onsubmit('/department')"
        >부서 관리
      </b-list-group-item>

      <b-list-group-item href="#" :class="this.$route.path === '/user' ? 'click' : ''" @click="onsubmit('/user')"
        >사용자 관리</b-list-group-item
      >
      <b-list-group-item href="#" :class="this.$route.path === '/device' ? 'click' : ''" @click="onsubmit('/device')"
        >장비 관리</b-list-group-item
      >
    </b-list-group>
  </div>
</template>

<script>
export default {
  methods: {
    onsubmit(path) {
      if (this.$route.path !== path) {
        this.$router.push(path)
      }
    }
  }
}
</script>
<style scoped>
.click {
  background-color: gray;
  font-weight: bold;
  color: white;
}
</style>
