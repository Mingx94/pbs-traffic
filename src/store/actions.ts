import * as mutationTypes from './mutation-types';
import { TrafficStatus } from './types';
import { ActionTree } from 'vuex';

const actions: ActionTree<any, any> = {
  getData({ commit }) {
    fetch(process.env.VUE_APP_API)
      .then(response => response.json())
      .then((data: TrafficStatus[]) => {
        commit(mutationTypes.STORE_STATUS, data);
      });
  },
};

export default actions;
