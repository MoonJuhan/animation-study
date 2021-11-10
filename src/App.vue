<template>
  <RouterView />
</template>

<script>
export default {
  name: 'App',
  components: {},
}
</script>

<style lang="scss">
#app {
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

body {
  margin: 0;
}

ul {
  margin: 0;
  padding: 0;
  list-style: none;
}
</style>
