<template>
  <nav>
    <v-toolbar flat app>
      <v-toolbar-side-icon class="grey--text" @click="drawer = !drawer" />
      <v-toolbar-title class="text-uppercase grey--text--darken-1">
        <span class="font-weight-bold">警廣路況查詢</span>
      </v-toolbar-title>
    </v-toolbar>
    <v-navigation-drawer app v-model="drawer">
      <v-list>
        <v-list-tile
          v-for="link in links"
          :key="link.text"
          router
          :to="link.route"
        >
          <v-list-tile-action>
            <v-icon>{{ link.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>{{ link.text }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
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
  ];
}
</script>
