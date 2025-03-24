export interface WeatherData {
  temperature: number
  feelsLike: number
  minTemp: number
  maxTemp: number
  humidity: number
  pressure: number
  windSpeed: number
  windDirection: number
  windGust: number
  condition: string
  iconUrl: string
  sunrise: string
  sunset: string
  dayLength: string
  date: string
  precipitation: number
  rainChance: number
}

export interface ForecastData {
  date: string
  time?: string
  temperature: number
  minTemp: number
  maxTemp: number
  condition: string
  iconUrl: string
  rainChance: number
  windSpeed: number
  isDaily: boolean
}

