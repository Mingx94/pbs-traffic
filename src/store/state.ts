import { RootState, TrafficStatus } from './types';

const state: RootState = {
  trafficStatus: [] as TrafficStatus[],
  visibilityFilter: 'SHOW_FREEWAY',
};

export default state;
