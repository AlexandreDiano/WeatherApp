import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger,} from "@/components/ui/tooltip"
import {Input} from "@/components/ui/input.tsx";
import {useCallback, useEffect, useState} from "react";
import axios from "axios";
import IUnits from "@/DTO/Units.ts";
import ITimeserie from "@/DTO/Timeserie.ts";
import IResponse from "@/DTO/Response.ts";
import {weatherTypes} from "@/utils/weatherTypes.ts";
import {Search} from 'lucide-react'

function App() {
  const [data, setData] = useState<ITimeserie[]>([])
  const [units, setUnits] = useState<IUnits>()
  const [prevision, setPrevision] = useState<ITimeserie>()
  const [address, setAddress] = useState<string>('');
  const [coordinates, setCoordinates] = useState({lat: -25.533816, lng: -49.2072163});
  const [sense, setSense] = useState<number>()

  const API_KEY = process.env.OPEN_CAGE_API_KEY

  const handleGeocode = async () => {
    try {
      const response = await axios.get('https://api.opencagedata.com/geocode/v1/json', {
        params: {
          q: address,
          key: API_KEY,
        },
      })

      const result = response.data.results[0];
      const {lat, lng} = result.geometry;

      setCoordinates({lat, lng});
    } catch (e) {
      console.log(e)
    }
  }

  const fetchData = useCallback(async () => {
    try {
      const response: IResponse = await axios.get(`https://api.met.no/weatherapi/locationforecast/2.0/complete?lat=${coordinates.lat}&lon=${coordinates.lng}&altitude=920`)

      setData(response.data.properties.timeseries)
      setUnits(response.data.properties.meta.units)
    } catch (e) {
      console.log(e)
    }
  }, [coordinates.lat, coordinates.lng])

  const handleWeatherTime = () => {
    const currentIso = new Date().toISOString()
    let formatedIso = currentIso.split(':')
    const newIso = formatedIso[0] + ':00:00Z'
    data.forEach(item => {
      if (item.time === newIso) {
        setPrevision(item)
        return;
      }
    })
  }

  const handleWindChill = () => {
    if (prevision) {
      const windVelocity = Math.pow(prevision.data.instant.details.wind_speed, 0.16)
      const tempFahrenheit = (prevision.data.instant.details.air_temperature * 9 / 5) + 32;
      const wildChill = 13.12 + 0.6215 * tempFahrenheit - 11.37 * windVelocity + 0.3965 * tempFahrenheit * windVelocity
      setSense((wildChill - 32) / 1.8)
    }
  }

  useEffect(() => {
    fetchData();
  }, [coordinates]);

  useEffect(() => {
    handleWeatherTime();
    handleWindChill();
  }, [data]);

  return (
    <div className="container">
      <header>
        <Input type="text" placeholder="Search Location..."
               value={address}
               onChange={e => setAddress(e.target.value)}
               className="border-2 w-1/3 h-12 font-black italic text-cyan-100 text-lg placeholder:font-black placeholder:italic placeholder:text-cyan-950"/>

        <button type="submit" onClick={handleGeocode}><Search className="ml-5 w-6 h-6"/></button>
      </header>

      <div className="flex flex-col justify-center content-center">
        <img className="w-48 ml-5 absolute right-1/4"
             src={`/public/weather_icons/${prevision?.data.next_1_hours.summary.symbol_code}.svg`}
             alt="weater type"/>
        <h1 className="text-9xl font-black">{prevision?.data.instant.details.air_temperature} °C</h1>
        {/*@ts-ignore*/}
        <h3 className="text-2xl font-black">{weatherTypes[prevision?.data.next_1_hours.summary.symbol_code]}</h3>
      </div>

      <footer className="font-black">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger className="italic">
              <div className="flex justify-center content-center flex-col mx-10">
                <h2 className="text-3xl">Air Pressure</h2>
                <h2
                  className="text-center text-2xl">{prevision?.data.instant.details.air_pressure_at_sea_level} {units?.air_pressure_at_sea_level}</h2>
              </div>
            </TooltipTrigger>
            <TooltipContent className="max-w-xl bg-cyan-800">
              <p>Air Pressure, also known as atmospheric pressure, is the force exerted by the Earth's atmosphere
                per
                unit area. It is caused by the weight of air molecules above the Earth's surface due to gravity.
                Atmospheric pressure varies with altitude, decreasing as you ascend and increasing as you descend.
                The
                standard unit for atmospheric pressure is the pascal (Pa), often expressed in hectopascals (hPa).
                Understanding air pressure is crucial for meteorology, aviation, and other fields, influencing
                weather
                patterns and natural processes such as cloud formation and wind behavior.</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger className="italic">
              <div className="flex justify-center content-center flex-col mx-10">
                <h2 className="text-3xl">Humidity</h2>
                <h2
                  className="text-center text-2xl">{prevision?.data.instant.details.relative_humidity} {units?.relative_humidity}</h2>
              </div>
            </TooltipTrigger>
            <TooltipContent className="max-w-xl bg-cyan-800">
              <p>Humidity is the amount of water vapor present in the air. It is usually expressed as a percentage
                and
                represents the relative moisture content in the atmosphere. Higher humidity indicates more moisture
                in
                the air, while lower humidity suggests drier conditions. Humidity plays a crucial role in weather
                patterns and can impact our perception of temperature.</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger className="italic">
              <div className="flex justify-center content-center flex-col mx-10">
                <h2 className="text-3xl">Wind Direction</h2>
                <h2
                  className="text-center text-2xl">{prevision?.data.instant.details.wind_from_direction} {units?.wind_from_direction}</h2>
              </div>
            </TooltipTrigger>
            <TooltipContent className="max-w-xl bg-cyan-800">
              <p>Wind direction is the compass direction from which the wind is blowing. It is
                measured in degrees, with
                360 degrees representing a full circle. For example, a wind direction of 90 degrees means the wind
                is
                coming from the east. Wind direction is a key factor in understanding weather patterns and is often
                combined with wind speed to provide a complete picture of wind conditions.</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger className="italic">
              <div className="flex justify-center content-center flex-col mx-10">
                <h2 className="text-3xl">Wind Speed</h2>
                <h2
                  className="text-center text-2xl">{prevision?.data.instant.details.wind_speed} {units?.wind_speed}</h2>
              </div>
            </TooltipTrigger>
            <TooltipContent className="max-w-xl bg-cyan-800">
              <p>Wind speed is the rate at which air is moving horizontally. It is typically measured in units like
                meters per second (m/s) or kilometers per hour (km/h). Wind speed, along with wind direction, helps
                describe the intensity and characteristics of the wind. Higher wind speeds can impact weather
                conditions
                and affect various activities, including sailing, aviation, and outdoor events.</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger className="italic">
              <div className="flex justify-center content-center flex-col mx-10">
                <h2 className="text-3xl">UV</h2>
                <h2
                  className="text-center text-2xl">{prevision?.data.instant.details.ultraviolet_index_clear_sky}</h2>
              </div>
            </TooltipTrigger>
            <TooltipContent className="max-w-xl bg-cyan-800">
              <p>UV radiation is a type of electromagnetic radiation emitted by the sun. It is categorized into
                different levels, such as UVA, UVB, and UVC. UV radiation has both positive and negative effects.
                While
                it is essential for the production of vitamin D, overexposure can lead to sunburn and increase the
                risk
                of skin cancer. UV levels are often measured on a scale, and protective measures like sunscreen are
                recommended, especially during periods of high UV radiation.</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger className="italic">
              <div className="flex justify-center content-center flex-col mx-10">
                <h2 className="text-3xl">Thermal Sensation</h2>
                <h2 className="text-center text-2xl">{sense?.toFixed(2)} °C</h2>
              </div>
            </TooltipTrigger>
            <TooltipContent className="max-w-xl bg-cyan-800">
              <p>UV radiation is a type of electromagnetic radiation emitted by the sun. It is categorized into
                different levels, such as UVA, UVB, and UVC. UV radiation has both positive and negative effects.
                While
                it is essential for the production of vitamin D, overexposure can lead to sunburn and increase the
                risk
                of skin cancer. UV levels are often measured on a scale, and protective measures like sunscreen are
                recommended, especially during periods of high UV radiation.</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </footer>
    </div>
  )
}

export default App
