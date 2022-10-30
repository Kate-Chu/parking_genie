type FareInfo = {
  Period: string;
  Fare: string;
};

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
  type2: string;
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
  Pregnancy_First: string;
  Handicap_First: string;
  Taxi_OneHR_Free: string;
  AED_Equipment: string;
  CellSignal_Enhancement: string;
  Accessibility_Elevator: string;
  Phone_Charge: string;
  Child_Pickup_Area: string;
  FareInfo: {
    WorkingDay: FareInfo[];
    Holiday: FareInfo[];
  };
  EntranceCoord: {
    EntrancecoordInfo: EntrancecoordInfo[];
  };
};

// export type AvailableInfo = {
// }
