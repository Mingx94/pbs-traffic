import { RootState, TrafficStatus } from './types';

const visibiltyFilter = (
  trafficStatus: TrafficStatus[],
  showing: string
): TrafficStatus[] => {
  const pattern = RegExp(showing, 'g');
  return trafficStatus.filter(item => pattern.test(item.areaNm));
};

const getters = {
  showingList: (state: RootState) => {
    switch (state.visibilityFilter) {
      case 'SHOW_ALL':
        return state.trafficStatus;
      case 'SHOW_FREEWAY':
        return visibiltyFilter(state.trafficStatus, '國道');
      default:
        return state.trafficStatus;
    }
  },
};

export default getters;
