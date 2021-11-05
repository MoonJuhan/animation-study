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
body {
  margin: 0;
}

ul {
  margin: 0;
  padding: 0;
  list-style: none;
}

#app {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
