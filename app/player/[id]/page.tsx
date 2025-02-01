"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

interface PlayerStats {
  id: string
  name: string
  team: string
  battingAverage: number
  homeRuns: number
  rbis: number
}

export default function PlayerPerformance() {
  const { id } = useParams()
  const [player, setPlayer] = useState<PlayerStats | null>(null)

  useEffect(() => {
    const fetchPlayerData = async () => {
      try {
        const response = await fetch(`http://localhost:3001/player/${id}`)
        const data = await response.json()
        setPlayer(data)
      } catch (error) {
        console.error("Failed to fetch player data", error)
      }
    }

    fetchPlayerData()
  }, [id])

  if (!player) {
    return <div>Loading...</div>
  }

  return (
    <div className="container mx-auto p-4 bg-gradient-to-r from-green-400 to-blue-500 min-h-screen flex items-center justify-center">
      <Card className="w-full max-w-2xl mx-auto bg-opacity-80 backdrop-blur-md text-white">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center">{player.name}</CardTitle>
          <p className="text-xl text-center">{player.team}</p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="stat-bar">
            <h3 className="text-lg font-semibold">Batting Average</h3>
            <Progress value={player.battingAverage * 100} className="h-4" />
            <p className="text-right">{player.battingAverage.toFixed(3)}</p>
          </div>
          <div className="stat-bar">
            <h3 className="text-lg font-semibold">Home Runs</h3>
            <Progress value={player.homeRuns} max={50} className="h-4" />
            <p className="text-right">{player.homeRuns}</p>
          </div>
          <div className="stat-bar">
            <h3 className="text-lg font-semibold">RBIs</h3>
            <Progress value={player.rbis} max={150} className="h-4" />
            <p className="text-right">{player.rbis}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

