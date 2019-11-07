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
  positionStatus: string;
  distance: number;
  distanceFromStart: number;
}

export interface DelayReason {
  code: string;
  text: string;
}

export interface Stop {
  station: Station;
  timetable: Timetable;
  track: Track;
  info: Info;
  delayReasons: DelayReason[];
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

export interface ConflictInfo {
  status: string;
  text?: any;
}

export interface SelectedRoute {
  conflictInfo: ConflictInfo;
  mobility?: any;
}

export interface RootObject {
  trip: Trip;
  connection?: any;
  selectedRoute: SelectedRoute;
  active?: any;
}
