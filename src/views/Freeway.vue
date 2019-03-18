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
      <template v-if="statusList.length">
        <v-card flat>
          <v-layout
            row
            wrap
            v-for="traffic in sliceStatusList"
            :key="traffic.UID"
            class="py-4"
            :class="{
              'px-3': $vuetify.breakpoint.xs,
              'px-4': $vuetify.breakpoint.smAndUp,
            }"
          >
            <v-flex xs12 class="pb-2">
              <v-avatar size="30" class="mr-2">
                <img :src="textToSign(traffic.areaNm)" :alt="traffic.areaNm" />
              </v-avatar>
              <v-chip
                v-if="traffic.direction"
                small
                color="primary"
                text-color="white"
                class="subheading"
              >
                {{ traffic.direction }}
              </v-chip>
              <v-chip
                v-if="traffic.region"
                small
                color="secondary"
                text-color="white"
                class="subheading"
              >
                {{ covertRegion(traffic.region) }}
              </v-chip>
              <v-chip v-if="traffic.roadtype" small class="subheading">
                {{ traffic.roadtype }}
              </v-chip>
            </v-flex>
            <v-flex xs12>
              <div class="mt-1 subheading">{{ traffic.comment }}</div>
            </v-flex>
          </v-layout>
        </v-card>
      </template>
      <template v-else>
        <v-card flat>
          <v-card-text class="title pa-4">查無資料</v-card-text>
        </v-card>
      </template>
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

const freewayRegList = {
  '1號': /[1\uFF11][號]/,
  '1甲': /[1\uFF11][甲]/,
  '2號': /[2\uFF12][號]/,
  '2甲': /[2\uFF12][甲]/,
  '3號': /[3\uFF13][號]/,
  '3甲': /[3\uFF13][甲]/,
  '4號': /[4\uFF14][號]/,
  '5號': /[5\uFF15][號]/,
  '6號': /[6\uFF16][號]/,
  '7號': /[7\uFF17][號]/,
  '8號': /[8\uFF18][號]/,
  '10號': /[1\uFF11][0\uFF10][號]/,
};

@Component<Freeway>({
  name: 'Freeway',
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
  textToSign(name: string) {
    let number = name.split('國道')[1];
    if (freewayRegList['1號'].test(number)) {
      return require('@/assets/Sign/TWHW1.svg');
    }
    if (freewayRegList['1甲'].test(number)) {
      return require('@/assets/Sign/TWHW1a.svg');
    }
    if (freewayRegList['2號'].test(number)) {
      return require('@/assets/Sign/TWHW2.svg');
    }
    if (freewayRegList['2甲'].test(number)) {
      return require('@/assets/Sign/TWHW2a.svg');
    }
    if (freewayRegList['3號'].test(number)) {
      return require('@/assets/Sign/TWHW3.svg');
    }
    if (freewayRegList['3甲'].test(number)) {
      return require('@/assets/Sign/TWHW3a.svg');
    }
    if (freewayRegList['4號'].test(number)) {
      return require('@/assets/Sign/TWHW4.svg');
    }
    if (freewayRegList['5號'].test(number)) {
      return require('@/assets/Sign/TWHW5.svg');
    }
    if (freewayRegList['6號'].test(number)) {
      return require('@/assets/Sign/TWHW6.svg');
    }
    if (freewayRegList['7號'].test(number)) {
      return require('@/assets/Sign/TWHW7.svg');
    }
    if (freewayRegList['8號'].test(number)) {
      return require('@/assets/Sign/TWHW8.svg');
    }
    if (freewayRegList['10號'].test(number)) {
      return require('@/assets/Sign/TWHW10.svg');
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
