<template>
  <div id="app">
    <error-info></error-info>
  </div>
</template>

<script>
import ErrorInfo from './components/ErrorInfo'

export default {
  name: 'app',
  components: {
    ErrorInfo
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 10px;
}
</style>
