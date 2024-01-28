interface IDetails {
  air_pressure_at_sea_level: number;
  air_temperature: number;
  cloud_area_fraction: number;
  cloud_area_fraction_high: number;
  cloud_area_fraction_low: number;
  cloud_area_fraction_medium: number;
  dew_point_temperature: number;
  fog_area_fraction: {
    value: string;
    type: string;
  }
  relative_humidity: number;
  ultraviolet_index_clear_sky: number;
  wind_from_direction: number;
  wind_speed: number;
}

interface IInstant {
  details: IDetails;
}

interface INext_12_Hours {
  summary: {
    symbol_code: string;
  };
  details: {}
}

interface INext_1_Hours {
  summary: {
    symbol_code: string;
  };
  details: {
    precipitation_amount: number;
  }
}

interface INext_6_Hours {
  summary: {
    symbol_code: string;
  };
  details: {
    air_temperature_max: number;
    air_temperature_min: number;
    precipitation_amount: number;
  }
}

export default interface ITimeserie {
  time: string;
  data: {
    instant: IInstant;
    next_12_hours: INext_12_Hours;
    next_1_hours: INext_1_Hours;
    next_6_hours: INext_6_Hours;
  };
}