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
      <v-toolbar-title class="text-uppercase grey--text--darken-1">
        <span class="font-weight-bold">警廣路況查詢</span>
      </v-toolbar-title>
      <v-spacer />
      <v-menu offset-y>
        <template v-slot:activator="{ on }">
          <v-btn color="primary" flat v-on="on">
            <v-icon left>menu</v-icon>
            <span>選單</span>
          </v-btn>
        </template>
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
      </v-menu>
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
  ];
}
</script>
