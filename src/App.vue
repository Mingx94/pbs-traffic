<template>
  <v-app class="grey lighten-4">
    <Navbar />
    <v-content
      :class="{
        'ma-1': $vuetify.breakpoint.xs,
        'ma-4': $vuetify.breakpoint.smAndUp,
      }"
    >
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import { Action } from 'vuex-class';
import Navbar from './components/Navbar.vue';

@Component({
  name: 'App',
  components: {
    Navbar,
  },
})
export default class App extends Vue {
  @Action('getData') actionGetData!: Function;
  created() {
    this.actionGetData();
  }
}
</script>
<style scoped>
.content {
  margin: 48px;
}
@media (max-width: 600px) {
  .content {
    margin: 15px;
  }
}
</style>
