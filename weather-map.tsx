"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Droplets, Thermometer, Wind, Cloud } from "lucide-react"

interface WeatherMapProps {
  location: string
}

export default function WeatherMap({ location }: WeatherMapProps) {
  const [activeLayer, setActiveLayer] = useState("temperature")

  // In a real app, we would use a mapping library like Leaflet or Mapbox
  // For this example, we'll just show placeholder images

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Weather Map for {location}</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs value={activeLayer} onValueChange={setActiveLayer} className="mb-4">
          <TabsList className="grid grid-cols-4 w-full">
            <TabsTrigger value="temperature" className="flex items-center justify-center">
              <Thermometer className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Temperature</span>
            </TabsTrigger>
            <TabsTrigger value="precipitation" className="flex items-center justify-center">
              <Droplets className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Precipitation</span>
            </TabsTrigger>
            <TabsTrigger value="wind" className="flex items-center justify-center">
              <Wind className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Wind</span>
            </TabsTrigger>
            <TabsTrigger value="clouds" className="flex items-center justify-center">
              <Cloud className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Clouds</span>
            </TabsTrigger>
          </TabsList>

          <div className="mt-4 relative aspect-video w-full bg-slate-100 dark:bg-slate-800 rounded-lg overflow-hidden">
            {/* Placeholder for map - in a real app, this would be a real map */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="text-lg font-medium mb-2">
                  {activeLayer === "temperature" && "Temperature Map"}
                  {activeLayer === "precipitation" && "Precipitation Map"}
                  {activeLayer === "wind" && "Wind Map"}
                  {activeLayer === "clouds" && "Cloud Coverage Map"}
                </div>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  {activeLayer === "temperature" && "Showing temperature distribution for the region"}
                  {activeLayer === "precipitation" && "Showing precipitation levels for the region"}
                  {activeLayer === "wind" && "Showing wind patterns for the region"}
                  {activeLayer === "clouds" && "Showing cloud coverage for the region"}
                </p>
              </div>
            </div>

            {/* Placeholder map images - in a real app, these would be actual map layers */}
            <img
              src={`/placeholder.svg?height=400&width=800&text=${activeLayer.charAt(0).toUpperCase() + activeLayer.slice(1)}+Map`}
              alt={`${activeLayer} map`}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-slate-100 dark:bg-slate-800 p-3 rounded-lg">
              <div className="text-sm text-slate-500 dark:text-slate-400">Map Type</div>
              <div className="font-medium capitalize">{activeLayer}</div>
            </div>
            <div className="bg-slate-100 dark:bg-slate-800 p-3 rounded-lg">
              <div className="text-sm text-slate-500 dark:text-slate-400">Location</div>
              <div className="font-medium">{location}</div>
            </div>
            <div className="bg-slate-100 dark:bg-slate-800 p-3 rounded-lg">
              <div className="text-sm text-slate-500 dark:text-slate-400">Resolution</div>
              <div className="font-medium">High</div>
            </div>
            <div className="bg-slate-100 dark:bg-slate-800 p-3 rounded-lg">
              <div className="text-sm text-slate-500 dark:text-slate-400">Last Updated</div>
              <div className="font-medium">{new Date().toLocaleTimeString()}</div>
            </div>
          </div>
        </Tabs>
      </CardContent>
    </Card>
  )
}

