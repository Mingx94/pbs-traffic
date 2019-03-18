<template>
  <div class="home">
    <v-container>
      <v-card
        flat
        class="pa-3 mx-auto"
        style="width: 90%;max-width: 500px; height: 80%"
      >
        <v-layout align-center column justify-center style="height: 100%">
          <v-btn color="primary" large class="mb-5" to="/freeway">
            國道路況
          </v-btn>
          <v-btn color="primary" large> 平面道路 </v-btn>
        </v-layout>
      </v-card>
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
  height: 100%;
}
</style>
