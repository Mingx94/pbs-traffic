import { MutationTree } from 'vuex';
import { RootState, TrafficStatus } from '../types';
import * as mutationTypes from './mutation-types';

const mutations: MutationTree<RootState> = {
  [mutationTypes.STORE_STATUS](state: RootState, data: TrafficStatus[]) {
    state.trafficStatus = data;
  },
  [mutationTypes.VISIBILTY_FILTER](state: RootState, filter: string) {
    state.visibilityFilter = filter;
  },
};

export default mutations;
