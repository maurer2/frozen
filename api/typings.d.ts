export declare type ServiceLevel = 'AVAILABLE_SERVICE' | 'TEST';

export declare type Internet = 'HIGH' | 'LOW';

export declare type GpsStatus = 'VALID' | 'INVALID';

export declare enum TrainType {
  ICE,
  IC,
}

export declare enum WagonClass {
  First = 'FIRST',
  Second = 'SECOND',
}

export declare interface Status {
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

export declare interface Trip {
  tripDate: string;
  trainType: string;
  vzn: string;
  actualPosition: number;
  distanceFromLastStop: number;
  totalDistance: number;
  stopInfo: StopInfo;
  stops: Stop[];
}

export declare interface StopInfo {
  scheduledNext: string;
  actualNext: string;
  actualLast: string;
  actualLastStarted: string;
  finalStationName: string;
  finalStationEvaNr: string;
}

export declare interface Geocoordinates {
  latitude: number;
  longitude: number;
}

export declare interface Station {
  evaNr: string;
  name: string;
  geocoordinates: Geocoordinates;
}

export declare interface Timetable {
  scheduledArrivalTime?: number;
  actualArrivalTime?: number;
  showActualArrivalTime?: boolean;
  arrivalDelay: string;
  scheduledDepartureTime: any;
  actualDepartureTime: any;
  showActualDepartureTime?: boolean;
  departureDelay: string;
}

export declare interface Track {
  scheduled: string;
  actual: string;
}

export declare interface Info {
  status: number;
  passed: boolean;
  distance: number;
  distanceFromStart: number;
}

export declare interface Stop {
  station: Station;
  timetable: Timetable;
  track: Track;
  info: Info;
  delayReasons?: any;
}

export declare interface ConflictInfo {
  status: string;
  text?: any;
}

export declare interface SelectedRoute {
  conflictInfo: ConflictInfo;
  mobility?: any;
}

export declare interface TestResponse {
  speed: number,
  timestamp: number,
}
