export type ServiceLevel = 'AVAILABLE_SERVICE' | 'TEST';

export type Internet = 'HIGH' | 'LOW';

export type GpsStatus = 'VALID' | 'INVALID';

export enum TrainType {
  ICE,
  IC,
}

export enum WagonClass {
  First = 'FIRST',
  Second = 'SECOND',
}

export interface Status {
  connection: boolean;
  servicelevel: string;
  internet: string;
  speed: number;
  gpsStatus: string;
  latitude: number;
  longitude: number;
  serverTime: number;
  wagonClass: string;
  navigationChange: string;
}

export interface Trip {
  tripDate: string;
  trainType: string;
  vzn: string;
  actualPosition: number;
  distanceFromLastStop: number;
  totalDistance: number;
  stopInfo: StopInfo;
  stops: Stop[];
}

export interface StopInfo {
  scheduledNext: string;
  actualNext: string;
  actualLast: string;
  actualLastStarted: string;
  finalStationName: string;
  finalStationEvaNr: string;
}

export interface Geocoordinates {
  latitude: number;
  longitude: number;
}

export interface Station {
  evaNr: string;
  name: string;
  geocoordinates: Geocoordinates;
}

export interface Timetable {
  scheduledArrivalTime?: number;
  actualArrivalTime?: number;
  showActualArrivalTime?: boolean;
  arrivalDelay: string;
  scheduledDepartureTime: any;
  actualDepartureTime: any;
  showActualDepartureTime?: boolean;
  departureDelay: string;
}

export interface Track {
  scheduled: string;
  actual: string;
}

export interface Info {
  status: number;
  passed: boolean;
  distance: number;
  distanceFromStart: number;
}

export interface Stop {
  station: Station;
  timetable: Timetable;
  track: Track;
  info: Info;
  delayReasons?: any;
}

export interface ConflictInfo {
  status: string;
  text?: any;
}

export interface SelectedRoute {
  conflictInfo: ConflictInfo;
  mobility?: any;
}

export interface TestResponse {
  speed: number;
  timestamp: number;
}
