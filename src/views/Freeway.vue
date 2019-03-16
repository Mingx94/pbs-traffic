<template>
  <div class="freeway">
    <v-container>
      <h1 class="headline font-weight-bold">國道路況</h1>
      <p class="grey--text">
        資料來源與警廣即時路況查詢網頁至多有1分鐘的時間差，每次取得最後更新的1000筆路況資料
      </p>
      <template v-if="trafficStatus.length">
        <v-card
          flat
          class="pa-3"
          v-for="traffic in trafficStatus"
          :key="traffic.UID"
        >
          <v-layout row wrap>
            <v-flex xs6 sm4 md2>
              <div class="caption grey--text">Area</div>
              <div>{{ traffic.areaNm || '-' }}</div>
            </v-flex>
            <v-flex xs6 sm4 md2>
              <div class="caption grey--text">Direction</div>
              <div>{{ traffic.direction || '-' }}</div>
            </v-flex>
            <v-flex xs6 sm4 md2>
              <div class="caption grey--text">srcdetail</div>
              <div>{{ traffic.srcdetail }}</div>
            </v-flex>
            <v-flex xs6 sm4 md2>
              <div class="caption grey--text">region</div>
              <div>{{ traffic.region }}</div>
            </v-flex>
            <v-flex xs6 sm4 md2>
              <div class="caption grey--text">y1</div>
              <div>{{ traffic.y1 }}</div>
            </v-flex>
            <v-flex xs6 sm4 md2>
              <div class="caption grey--text">happendate</div>
              <div>{{ traffic.happendate }}</div>
            </v-flex>
            <v-flex xs6 sm4 md2>
              <div class="caption grey--text">happentime</div>
              <div>{{ traffic.happentime }}</div>
            </v-flex>
            <v-flex xs6 sm4 md2>
              <div class="caption grey--text">road</div>
              <div>{{ traffic.road }}</div>
            </v-flex>
            <v-flex xs6 sm4 md2>
              <div class="caption grey--text">roadtype</div>
              <div>{{ traffic.roadtype }}</div>
            </v-flex>
            <v-flex xs6 sm4 md2>
              <div class="caption grey--text">modDttm</div>
              <div>{{ traffic.modDttm }}</div>
            </v-flex>
            <v-flex xs6 sm4 md2>
              <div class="caption grey--text">x1</div>
              <div>{{ traffic.x1 }}</div>
            </v-flex>
            <v-flex xs12>
              <div class="caption grey--text">comment</div>
              <div>{{ traffic.comment }}</div>
            </v-flex>
          </v-layout>
        </v-card>
      </template>
    </v-container>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Getter } from 'vuex-class';

type TrafficStatus = {
  region: string;
  srcdetail: string;
  areaNm: string;
  UID: string;
  direction: string;
  y1: string;
  happentime: string;
  roadtype: string;
  road: string;
  modDttm: string;
  comment: string;
  happendate: string;
  x1: string;
};

@Component({})
export default class About extends Vue {
  @Getter('showingList') trafficStatus!: TrafficStatus[];
  mounted() {
    console.log(this.$store);
  }
}
</script>
