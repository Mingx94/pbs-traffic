import { GetterTree } from 'vuex';
import { RootState, TrafficStatus } from '../types';

const showFreeway = (
  trafficStatus: TrafficStatus[],
  show: boolean
): TrafficStatus[] => {
  const pattern = /國道/;
  return trafficStatus.filter(item =>
    show ? pattern.test(item.areaNm) : !pattern.test(item.areaNm)
  );
};

const getters: GetterTree<RootState, any> = {
  showingList: state => {
    switch (state.visibilityFilter) {
      case 'SHOW_NON_FREEWAY':
        return showFreeway(state.trafficStatus, false);
      case 'SHOW_FREEWAY':
        return showFreeway(state.trafficStatus, true);
      default:
        return state.trafficStatus;
    }
  },
};

export default getters;
