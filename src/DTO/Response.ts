import IUnits from "@/DTO/Units.ts";
import ITimeserie from "@/DTO/Timeserie.ts";

export default interface IResponse {
  data: {
    properties: {
      meta: {
        units: IUnits
      }
      timeseries: ITimeserie[]
    }
  }
}