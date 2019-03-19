<template>
  <v-app class="grey lighten-4">
    <Navbar />
    <v-content
      :class="{
        'ma-1': $vuetify.breakpoint.xs,
        'ma-4': $vuetify.breakpoint.smAndUp,
      }"
    >
      <router-view />
    </v-content>
    <transition name="fade">
      <v-btn
        color="error"
        fixed
        fab
        right
        bottom
        v-scroll="onScroll"
        v-show="btnShow"
        @click="$vuetify.goTo(1, { duration: 400 })"
      >
        <v-icon>keyboard_arrow_up</v-icon>
      </v-btn>
    </transition>
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
  btnShow = false;
  created() {
    this.actionGetData();
  }
  onScroll() {
    if (typeof window === 'undefined') return;
    const top = window.pageYOffset || document.documentElement.offsetTop || 0;
    this.btnShow = top > 300;
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
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
.fade-enter-active {
  transition: opacity 0.3s;
}
.fade-leave-active {
  transition: opacity 0.2s;
}
</style>
