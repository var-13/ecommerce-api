import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type { ForecastData } from "@/lib/types"
import { Cloud, CloudRain, Sun, Droplets, Wind } from "lucide-react"

interface WeatherForecastProps {
  forecastData: ForecastData[]
  useCelsius: boolean
}

export default function WeatherForecast({ forecastData, useCelsius }: WeatherForecastProps) {
  // Convert temperature based on unit preference
  const formatTemperature = (temp: number) => {
    if (useCelsius) {
      return `${temp}°C`
    } else {
      // Convert Celsius to Fahrenheit: (C × 9/5) + 32
      const fahrenheit = (temp * 9) / 5 + 32
      return `${Math.round(fahrenheit)}°F`
    }
  }

  // Group forecast data by day
  const dailyForecast = forecastData.filter((item) => item.isDaily)
  const hourlyForecast = forecastData.filter((item) => !item.isDaily)

  // Get weather icon based on condition
  const getWeatherIcon = (condition: string) => {
    const lowerCondition = condition.toLowerCase()
    if (lowerCondition.includes("rain") || lowerCondition.includes("drizzle")) {
      return <CloudRain className="h-6 w-6 text-blue-500" />
    } else if (lowerCondition.includes("cloud")) {
      return <Cloud className="h-6 w-6 text-slate-500" />
    } else {
      return <Sun className="h-6 w-6 text-amber-500" />
    }
  }

  return (
    <div>
      <Tabs defaultValue="daily">
        <TabsList className="w-full max-w-xs mb-4">
          <TabsTrigger value="daily">Daily Forecast</TabsTrigger>
          <TabsTrigger value="hourly">Hourly Forecast</TabsTrigger>
        </TabsList>

        <TabsContent value="daily" className="mt-0">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {dailyForecast.map((day, index) => (
              <Card
                key={index}
                className={index === 0 ? "bg-blue-50 dark:bg-slate-800 border-blue-200 dark:border-blue-900" : ""}
              >
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">{day.date}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col items-center">
                    {getWeatherIcon(day.condition)}
                    <div className="mt-2 text-center">
                      <div className="text-sm text-slate-500 dark:text-slate-400 capitalize">{day.condition}</div>
                      <div className="flex items-center justify-center gap-2 mt-1">
                        <span className="text-lg font-bold">{formatTemperature(day.maxTemp)}</span>
                        <span className="text-slate-500 dark:text-slate-400">{formatTemperature(day.minTemp)}</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2 w-full mt-4 text-xs">
                      <div className="flex items-center">
                        <Droplets className="h-3 w-3 mr-1 text-blue-500" />
                        <span>{day.rainChance}%</span>
                      </div>
                      <div className="flex items-center">
                        <Wind className="h-3 w-3 mr-1 text-blue-500" />
                        <span>{day.windSpeed} km/h</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="hourly" className="mt-0">
          <div className="overflow-x-auto pb-4">
            <div className="inline-flex gap-3 min-w-full">
              {hourlyForecast.map((hour, index) => (
                <Card key={index} className="w-[120px] flex-shrink-0">
                  <CardHeader className="py-2 px-3">
                    <CardTitle className="text-sm text-center">{hour.time}</CardTitle>
                  </CardHeader>
                  <CardContent className="py-2 px-3">
                    <div className="flex flex-col items-center">
                      {getWeatherIcon(hour.condition)}
                      <div className="mt-1 text-center">
                        <div className="text-lg font-bold">{formatTemperature(hour.temperature)}</div>
                        <div className="text-xs text-slate-500 dark:text-slate-400 capitalize">{hour.condition}</div>
                      </div>

                      <div className="flex justify-between w-full mt-2 text-xs">
                        <div className="flex items-center">
                          <Droplets className="h-3 w-3 mr-1 text-blue-500" />
                          <span>{hour.rainChance}%</span>
                        </div>
                        <div className="flex items-center">
                          <Wind className="h-3 w-3 mr-1 text-blue-500" />
                          <span>{hour.windSpeed}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

