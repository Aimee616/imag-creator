<template>
  <!-- <img alt="Vue logo" src="./assets/logo.png" /> -->
  <CreateImage />
</template>

<script>
import CreateImage from "./components/CreateImage.vue";

export default {
  name: "App",
  components: {
    CreateImage,
  },
};
</script>

<style>
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  outline: none;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  width: 100%;
  height: 100vh;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  background: #2c3e50;
}
</style>
