"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Search, MapPin, Droplets, Wind, Sunrise, Sunset, ThermometerSun, Calendar, RefreshCw } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import WeatherForecast from "@/components/weather-forecast"
import WeatherMap from "@/components/weather-map"
import { mockWeatherData, mockForecastData } from "@/lib/mock-data"
import type { WeatherData, ForecastData } from "@/lib/types"

export default function WeatherDashboard() {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null)
  const [forecastData, setForecastData] = useState<ForecastData[] | null>(null)
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [useCelsius, setUseCelsius] = useState(true)
  const [currentLocation, setCurrentLocation] = useState("New York, US")
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null)

  // Simulate API fetch on component mount
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      setWeatherData(mockWeatherData)
      setForecastData(mockForecastData)
      setLastUpdated(new Date())
      setLoading(false)
    }

    fetchData()
  }, [])

  // Handle search
  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!searchQuery.trim()) return

    setLoading(true)
    setCurrentLocation(searchQuery)

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // In a real app, we would fetch data for the searched location
    // For now, just use the mock data
    setWeatherData(mockWeatherData)
    setForecastData(mockForecastData)
    setLastUpdated(new Date())
    setLoading(false)
    setSearchQuery("")
  }

  // Handle refresh
  const handleRefresh = async () => {
    setLoading(true)

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    setWeatherData(mockWeatherData)
    setForecastData(mockForecastData)
    setLastUpdated(new Date())
    setLoading(false)
  }

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

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col gap-6">
        {/* Header with search */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-800 dark:text-white">Weather Dashboard</h1>
            <p className="text-slate-600 dark:text-slate-300 mt-1">
              {lastUpdated ? <>Last updated: {lastUpdated.toLocaleTimeString()}</> : <>Loading weather data...</>}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
            <form onSubmit={handleSearch} className="flex w-full md:w-auto">
              <Input
                type="text"
                placeholder="Search location..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="rounded-r-none"
              />
              <Button type="submit" className="rounded-l-none">
                <Search className="h-4 w-4" />
              </Button>
            </form>

            <div className="flex items-center space-x-2">
              <Switch id="unit-toggle" checked={useCelsius} onCheckedChange={setUseCelsius} />
              <Label htmlFor="unit-toggle">{useCelsius ? "°C" : "°F"}</Label>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {[...Array(4)].map((_, i) => (
              <Card key={i} className="animate-pulse">
                <CardHeader className="pb-2">
                  <div className="h-7 bg-slate-200 dark:bg-slate-700 rounded w-3/4"></div>
                  <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-1/2 mt-2"></div>
                </CardHeader>
                <CardContent>
                  <div className="h-24 bg-slate-200 dark:bg-slate-700 rounded"></div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <>
            {weatherData && (
              <>
                {/* Current weather */}
                <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {/* Main weather card */}
                  <Card className="col-span-1 md:col-span-2 lg:col-span-1 bg-gradient-to-br from-blue-500 to-blue-600 text-white">
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-2xl flex items-center">
                            <MapPin className="h-5 w-5 mr-1" />
                            {currentLocation}
                          </CardTitle>
                          <CardDescription className="text-blue-100">{weatherData.date}</CardDescription>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-white hover:text-white hover:bg-blue-600/50"
                          onClick={handleRefresh}
                        >
                          <RefreshCw className="h-5 w-5" />
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <div className="flex justify-between items-center">
                        <div className="flex flex-col">
                          <span className="text-5xl font-bold">{formatTemperature(weatherData.temperature)}</span>
                          <span className="text-blue-100 mt-1">
                            Feels like {formatTemperature(weatherData.feelsLike)}
                          </span>
                        </div>
                        <div className="flex flex-col items-center">
                          <img
                            src={weatherData.iconUrl || "/placeholder.svg"}
                            alt={weatherData.condition}
                            className="w-20 h-20"
                          />
                          <span className="text-center capitalize">{weatherData.condition}</span>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <div className="grid grid-cols-2 gap-2 w-full text-sm">
                        <div className="flex items-center">
                          <ThermometerSun className="h-4 w-4 mr-1" />
                          <span>High: {formatTemperature(weatherData.maxTemp)}</span>
                        </div>
                        <div className="flex items-center">
                          <ThermometerSun className="h-4 w-4 mr-1" />
                          <span>Low: {formatTemperature(weatherData.minTemp)}</span>
                        </div>
                      </div>
                    </CardFooter>
                  </Card>

                  {/* Humidity card */}
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg flex items-center">
                        <Droplets className="h-5 w-5 mr-2 text-blue-500" />
                        Humidity & Precipitation
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm text-slate-500 dark:text-slate-400">Humidity</span>
                            <span className="text-sm font-medium">{weatherData.humidity}%</span>
                          </div>
                          <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2.5">
                            <div
                              className="bg-blue-500 h-2.5 rounded-full"
                              style={{ width: `${weatherData.humidity}%` }}
                            ></div>
                          </div>
                        </div>

                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm text-slate-500 dark:text-slate-400">Precipitation</span>
                            <span className="text-sm font-medium">{weatherData.precipitation} mm</span>
                          </div>
                          <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2.5">
                            <div
                              className="bg-blue-500 h-2.5 rounded-full"
                              style={{ width: `${(weatherData.precipitation / 10) * 100}%` }}
                            ></div>
                          </div>
                        </div>

                        <div className="pt-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-slate-500 dark:text-slate-400">Chance of Rain</span>
                            <span className="font-medium">{weatherData.rainChance}%</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Wind card */}
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg flex items-center">
                        <Wind className="h-5 w-5 mr-2 text-blue-500" />
                        Wind & Pressure
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="text-center">
                            <div className="text-3xl font-bold">{weatherData.windSpeed}</div>
                            <div className="text-sm text-slate-500 dark:text-slate-400">km/h</div>
                          </div>

                          <div className="relative h-24 w-24">
                            <div className="absolute inset-0 flex items-center justify-center">
                              <div className="h-20 w-20 rounded-full border-2 border-slate-200 dark:border-slate-700"></div>
                            </div>
                            <div
                              className="absolute inset-0 flex items-center justify-center"
                              style={{
                                transform: `rotate(${weatherData.windDirection}deg)`,
                              }}
                            >
                              <div className="h-16 w-1 bg-blue-500 rounded-full origin-bottom transform -translate-y-2"></div>
                            </div>
                            <div className="absolute inset-0 flex items-center justify-center">
                              <div className="h-4 w-4 rounded-full bg-blue-500"></div>
                            </div>
                          </div>

                          <div className="text-center">
                            <div className="text-3xl font-bold">{weatherData.pressure}</div>
                            <div className="text-sm text-slate-500 dark:text-slate-400">hPa</div>
                          </div>
                        </div>

                        <div className="pt-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-slate-500 dark:text-slate-400">Wind Gusts</span>
                            <span className="font-medium">{weatherData.windGust} km/h</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Sun times card */}
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg flex items-center">
                        <Sunrise className="h-5 w-5 mr-2 text-blue-500" />
                        Sunrise & Sunset
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <div className="text-center">
                            <Sunrise className="h-8 w-8 mx-auto text-amber-500" />
                            <div className="mt-1 text-xl font-semibold">{weatherData.sunrise}</div>
                            <div className="text-sm text-slate-500 dark:text-slate-400">Sunrise</div>
                          </div>

                          <div className="h-px w-12 bg-slate-200 dark:bg-slate-700"></div>

                          <div className="text-center">
                            <Sunset className="h-8 w-8 mx-auto text-orange-500" />
                            <div className="mt-1 text-xl font-semibold">{weatherData.sunset}</div>
                            <div className="text-sm text-slate-500 dark:text-slate-400">Sunset</div>
                          </div>
                        </div>

                        <div className="pt-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-slate-500 dark:text-slate-400">Day Length</span>
                            <span className="font-medium">{weatherData.dayLength}</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Forecast and Map tabs */}
                <Tabs defaultValue="forecast" className="mt-6">
                  <TabsList className="grid w-full grid-cols-2 mb-4">
                    <TabsTrigger value="forecast" className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2" />
                      Forecast
                    </TabsTrigger>
                    <TabsTrigger value="map" className="flex items-center">
                      <MapPin className="h-4 w-4 mr-2" />
                      Weather Map
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="forecast" className="mt-0">
                    {forecastData && <WeatherForecast forecastData={forecastData} useCelsius={useCelsius} />}
                  </TabsContent>

                  <TabsContent value="map" className="mt-0">
                    <WeatherMap location={currentLocation} />
                  </TabsContent>
                </Tabs>
              </>
            )}
          </>
        )}
      </div>
    </div>
  )
}

