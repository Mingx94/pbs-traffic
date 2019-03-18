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

export type RegionList = 'A' | 'N' | 'M' | 'S' | 'E' | '';
export type DirectionList = '' | '北上' | '南下' | '東向' | '西行' | '雙向';
export type FreewayList =
  | ''
  | '1號'
  | '1甲'
  | '2號'
  | '2甲'
  | '3號'
  | '3甲'
  | '4號'
  | '5號'
  | '6號'
  | '7號'
  | '8號'
  | '10號';

export type RootState = {
  trafficStatus: TrafficStatus[];
  visibilityFilter: string;
};
