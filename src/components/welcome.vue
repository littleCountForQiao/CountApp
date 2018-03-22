<template>
  <div class="welcome">

  </div>
</template>

<script>
export default {
  name: 'welcome',
  mounted () {
    setTimeout(() => {
      this.$router.replace('/main')
    }, 2000)
  }
}
</script>

<style>
.welcome {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: url("../../static/1.jpg") no-repeat center;
  background-size: 100%;

}
</style>
