<template>
  <div class="freeway">
    <v-container>
      <div class="px-2">
        <h1 class="headline font-weight-bold">國道路況</h1>
        <p class="grey--text">
          資料來源與警廣即時路況查詢網頁至多有1分鐘的時間差，每次取得最後更新的1000筆路況資料
        </p>
      </div>
      <v-layout row wrap>
        <v-flex xs6 md3 class="px-2">
          <v-select
            label="方向"
            :items="directionList"
            :value="directionFilter"
            @change="onDirectionChange"
          >
            <template slot="selection" slot-scope="data">
              {{ data.item || '全部' }}
            </template>
            <template slot="item" slot-scope="data">
              {{ data.item || '全部' }}
            </template>
          </v-select>
        </v-flex>
        <v-flex xs6 md3 class="px-2">
          <v-select
            label="地區"
            :items="regionList"
            :value="regionFilter"
            @change="onRegionChange"
          >
            <template slot="selection" slot-scope="data">
              {{ covertRegion(data.item) }}
            </template>
            <template slot="item" slot-scope="data">
              {{ covertRegion(data.item) }}
            </template>
          </v-select>
        </v-flex>
        <v-flex xs6 md3 class="px-2">
          <v-select
            label="國道"
            :items="freewayList"
            :value="freewayFilter"
            @change="onFreewayChange"
          >
            <template slot="selection" slot-scope="data">
              {{ data.item || '全部' }}
            </template>
            <template slot="item" slot-scope="data">
              {{ data.item || '全部' }}
            </template>
          </v-select>
        </v-flex>
        <v-flex xs6 md3 class="px-2">
          <v-btn color="warning" block large @click="initializeFilter">
            清除選項
          </v-btn>
        </v-flex>
      </v-layout>

      <div class="text-xs-center my-3">
        <v-pagination v-model="page" :length="pageLength" />
      </div>
      <v-card flat>
        <template v-if="statusList.length">
          <TrafficInfo
            v-for="traffic in sliceStatusList"
            :key="traffic.UID"
            :traffic="traffic"
            :covertRegion="covertRegion"
          />
        </template>
        <template v-else>
          <v-card-text class="title pa-4">查無資料</v-card-text>
        </template>
      </v-card>

      <div class="text-xs-center mt-3">
        <v-pagination v-model="page" :length="pageLength" />
      </div>
    </v-container>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Getter } from 'vuex-class';
import * as mutaionTypes from '@/store/mutation-types.ts';
import { TrafficStatus, RegionList, DirectionList, FreewayList } from '@/types';
import TrafficInfo from '@/components/TrafficInfo.vue';
import freewayRegList from '@/utils/freewayRegList';

@Component<Freeway>({
  name: 'Freeway',
  components: {
    TrafficInfo,
  },
  beforeRouteEnter(to, from, next) {
    next((vm: Freeway) => {
      vm.$store.commit(mutaionTypes.VISIBILTY_FILTER, 'SHOW_FREEWAY');
    });
  },
})
export default class Freeway extends Vue {
  @Getter('showingList') trafficStatus!: TrafficStatus[];

  regionFilter: RegionList = 'A';
  readonly regionList: RegionList[] = ['A', 'N', 'M', 'S', 'E'];

  directionFilter: DirectionList = '';
  readonly directionList: DirectionList[] = [
    '',
    '北上',
    '南下',
    '東向',
    '西行',
    '雙向',
  ];

  freewayFilter: FreewayList = '';
  readonly freewayList: FreewayList[] = [
    '',
    '1號',
    '1甲',
    '2號',
    '2甲',
    '3號',
    '3甲',
    '4號',
    '5號',
    '6號',
    '7號',
    '8號',
    '10號',
  ];

  page: number = 1;
  dataPerPage: number = 50;

  // methods
  covertRegion(r: RegionList) {
    switch (r) {
      case 'A':
        return '全部';
      case 'N':
        return '北部';
      case 'M':
        return '中部';
      case 'S':
        return '南部';
      case 'E':
        return '東部';
    }
  }
  switchRegion(r: RegionList) {
    this.regionFilter = r || 'A';
  }
  onRegionChange(r: RegionList) {
    this.regionFilter = r;
  }
  onDirectionChange(d: DirectionList) {
    this.directionFilter = d;
  }
  onFreewayChange(f: FreewayList) {
    this.freewayFilter = f;
  }
  initializeFilter() {
    this.freewayFilter = '';
    this.directionFilter = '';
    this.regionFilter = 'A';
  }

  // computed
  get statusList(): TrafficStatus[] {
    if (
      this.regionFilter === 'A' &&
      this.directionFilter === '' &&
      this.freewayFilter === ''
    ) {
      return this.trafficStatus;
    }
    let filterHandler = (item: TrafficStatus) => {
      let condition1 =
        this.regionFilter === 'A' || item.region === this.regionFilter;
      let condition2 =
        this.directionFilter === '' ||
        item.direction === '雙向' ||
        item.direction === this.directionFilter;
      let condition3 =
        this.freewayFilter === '' ||
        freewayRegList[this.freewayFilter].test(item.areaNm);

      return condition1 && condition2 && condition3;
    };

    return this.trafficStatus.filter(filterHandler);
  }
  get sliceStatusList() {
    return this.statusList.slice(
      (this.page - 1) * this.dataPerPage,
      this.page * this.dataPerPage
    );
  }
  get pageLength(): number {
    return Math.ceil(this.statusList.length / this.dataPerPage);
  }
}
</script>
