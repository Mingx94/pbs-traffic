<template>
  <v-app class="grey lighten-4">
    <Navbar />
    <v-content class="ma-4">
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
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
  mounted() {
    this.actionGetData();
  }
}
</script>
