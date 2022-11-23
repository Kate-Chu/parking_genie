// Fetched Parking Lots Type
type PeriodFareInfo = {
  Period: string;
  Fare: string;
};

export type FareInfo =
  | {
      WorkingDay?: PeriodFareInfo[] | undefined;
      Holiday?: PeriodFareInfo[] | undefined;
    }
  | undefined;

type EntrancecoordInfo = {
  Xcod: string;
  Ycod: string;
  Address: string;
};

export type ParkingLotsInfo = {
  id: string;
  area: string;
  name: string;
  type: string;
  type2?: string;
  summary: string;
  address: string;
  tel: string;
  payex: string;
  serviceTime: string;
  tw97x: string;
  tw97y: string;
  totalcar: number;
  totalmotor: number;
  totalbike: number;
  totalbus: number;
  Pregnancy_First?: string;
  Handicap_First?: string;
  Taxi_OneHR_Free?: string;
  AED_Equipment?: string;
  CellSignal_Enhancement?: string;
  Accessibility_Elevator?: string;
  Phone_Charge?: string;
  Child_Pickup_Area?: string;
  FareInfo: FareInfo;
  EntranceCoord: {
    EntrancecoordInfo: EntrancecoordInfo[];
  };
  distanceFromOrigin?: number;
};

// Fetched Parking Lots Info JSON Type
export type ParkingLotsInfoData = {
  data: {
    UPDATETIME: string;
    park: ParkingLotsInfo[];
  };
};

// Fetched Available Parking Space Type
export type AvailableSpacesInfo = {
  id: string;
  availablecar: number;
  availablemotor: number;
  availablebus: number;
};

// Fetched Available Spaces JSON Type
export type AvailableSpacesData = {
  data: {
    UPDATETIME: string;
    park: AvailableSpacesInfo[];
  };
};

// Fetched Google Geocoding Type
type Address_Components = {
  long_name: string;
  short_name: string;
  types: string[];
};

type Geocoding_LatLng = {
  lat: number;
  lng: number;
};

export type GeocodingData = {
  results: [
    {
      address_components: Address_Components[];
      formatted_address: string;
      geometry: {
        location: Geocoding_LatLng;
        location_type: string;
        viewport: {
          northeast: Geocoding_LatLng;
          southwest: Geocoding_LatLng;
        };
      };
      partial_match: true;
      place_id: string;
      plus_code: {
        compound_code: string;
        global_code: string;
      };
      types: string[];
    },
  ];
  status: string;
};

export type autoComplete = {
  bounds: [number, number][];
  label: string;
  raw: {
    boundingbox: string[];
    class: string;
    display_name: string;
    icon: string;
    importance: number;
    lat: string;
    licence: string;
    lon: string;
    osm_id: number;
    osm_type: string;
    place_id: number;
    type: string;
  };
  x: number;
  y: number;
};
