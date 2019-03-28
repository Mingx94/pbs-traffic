<template>
  <nav>
    <v-toolbar
      flat
      app
      :class="{
        'px-1': $vuetify.breakpoint.xs,
        'px-4': $vuetify.breakpoint.smAndUp,
      }"
    >
      <v-toolbar-title>
        <router-link to="/" class="toolbar-title grey--text text--darken-2">
          警廣路況查詢
        </router-link>
      </v-toolbar-title>
      <v-spacer />
      <v-toolbar-items>
        <v-btn
          flat
          v-for="link in links"
          :key="link.text"
          :to="link.route"
          class="nav-button"
          :class="{
            'px-0': $vuetify.breakpoint.xsOnly,
          }"
        >
          <v-icon>{{ link.icon }}</v-icon>
          <span class="pl-2 hidden-sm-and-down">{{ link.text }}</span>
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
  </nav>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({
  name: 'Navbar',
})
export default class Navbar extends Vue {
  drawer: boolean = false;
  links = [
    { icon: 'home', text: '首頁', route: '/' },
    { icon: 'directions_car', text: '高速公路', route: '/freeway' },
    { icon: 'motorcycle', text: '平面道路', route: '/non-freeway' },
  ];
}
</script>
<style scoped>
.toolbar-title {
  text-decoration: inherit;
}

@media (max-width: 599.5px) {
  .nav-button {
    min-width: 50px;
  }
}
</style>
