<template>
  <v-layout
    row
    wrap
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
    <v-flex xs12 sm6 class="my-2">
      <div class="caption grey--text">發生時間</div>
      <div class="mt-1 body-1">
        <span class="pr-2">
          {{ traffic.happentime.replace(/:00\.0000000/, '') }}
        </span>
        <span>
          {{ traffic.happendate.replace(/-/g, '/') }}
        </span>
      </div>
    </v-flex>
    <v-flex xs12 sm6 class="my-2">
      <div class="caption grey--text">消息來源</div>
      <div class="mt-1 body-1">{{ traffic.srcdetail || '-' }}</div>
    </v-flex>
    <v-flex xs12>
      <div class="caption grey--text">路況說明</div>
      <div class="mt-1 subheading">{{ traffic.comment }}</div>
    </v-flex>
  </v-layout>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { TrafficStatus, RegionList } from '@/types';
import freewayRegList from '@/utils/freewayRegList';

@Component({
  name: 'TrafficInfo',
})
export default class TrafficInfo extends Vue {
  @Prop(Object) traffic!: TrafficStatus;
  @Prop(Function) covertRegion!: (r: RegionList) => string;

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
}
</script>
