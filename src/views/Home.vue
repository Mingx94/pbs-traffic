<template>
  <div class="home">
    <v-container>
      <v-btn color="primary" large to="/freeway">
        高速公路
      </v-btn>
      <v-btn color="primary" large to="/non-freeway">
        平面道路
      </v-btn>
    </v-container>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({})
export default class Home extends Vue {
  mounted() {}
}
</script>

<style scoped>
.home {
  height: 100%;
}
.container {
  height: 70%;
}
</style>
