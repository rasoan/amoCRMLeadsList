<template>
  <h3>
    Пример тестового задания
  </h3>
  <div>
    <QueryField />
  </div>
  <div>
    {{ store.leads }}
  </div>
</template>

<script>
  'use strict'

  import QueryField from "../src/components/QueryField/QueryField.vue";
  import {store} from "./store/store";

  export default {
    computed: {
      store() {
        return store
      }
    },
    components: {
      QueryField,
    }
  };
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
