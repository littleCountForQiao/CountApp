<template>
  <div id="app">
    <!--<v-icon>accessibility</v-icon>-->
    <transition name="scale-transition">
      <router-view/>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
</style>
