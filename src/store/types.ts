export type TrafficStatus = {
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

export type RootState = {
  trafficStatus: TrafficStatus[];
  visibilityFilter: string;
};
