type ServiceLevel = 'AVAILABLE_SERVICE' | 'TEST';

type Internet = 'HIGH' | 'LOW';

type GpsStatus = 'VALID' | 'INVALID';

type TrainType = {
  ICE,
  IC,
}

enum WagonClass {
  First = 'FIRST',
  Second = 'SECOND',
}

interface Status {
  connection: boolean;
  servicelevel: ServiceLevel;
  internet: Internet;
  speed: number;
  gpsStatus: GpsStatus;
  latitude: number;
  longitude: number;
  serverTime: number;
  wagonClass: WagonClass;
  navigationChange: string;
}

interface Trip {
  tripDate: string;
  trainType: TrainType;
  vzn: string;
  actualPosition: number;
  distanceFromLastStop: number;
  totalDistance: number;
  stopInfo: StopInfo;
  stops: Stop[];
}

interface StopInfo {
  scheduledNext: string;
  actualNext: string;
  actualLast: string;
  actualLastStarted: string;
  finalStationName: string;
  finalStationEvaNr: string;
}

interface Geocoordinates {
  latitude: number;
  longitude: number;
}

interface Station {
  evaNr: string;
  name: string;
  geocoordinates: Geocoordinates;
}

interface Timetable {
  scheduledArrivalTime?: number;
  actualArrivalTime?: number;
  showActualArrivalTime?: boolean;
  arrivalDelay: string;
  scheduledDepartureTime: any;
  actualDepartureTime: any;
  showActualDepartureTime?: boolean;
  departureDelay: string;
}

interface Track {
  scheduled: string;
  actual: string;
}

interface Info {
  status: number;
  passed: boolean;
  distance: number;
  distanceFromStart: number;
}

interface Stop {
  station: Station;
  timetable: Timetable;
  track: Track;
  info: Info;
  delayReasons?: any;
}

interface ConflictInfo {
  status: string;
  text?: any;
}

interface SelectedRoute {
  conflictInfo: ConflictInfo;
  mobility?: any;
}
