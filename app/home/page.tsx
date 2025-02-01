"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function Home() {
  const [playerId, setPlayerId] = useState("")
  const [ticketId, setTicketId] = useState("")
  const [qrCode, setQrCode] = useState("")

  const generateQR = async () => {
    try {
      const response = await fetch("http://localhost:3002/generate-qr", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ playerId, ticketId }),
      })
      const data = await response.json()
      setQrCode(data.qrCode)
    } catch (error) {
      console.error("Failed to generate QR code", error)
    }
  }

  return (
    <div className="container mx-auto p-4 bg-gradient-to-r from-blue-500 to-purple-600 min-h-screen flex items-center justify-center">
      <Card className="w-full max-w-md mx-auto bg-opacity-80 backdrop-blur-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center text-white">Baseball Ticket QR Generator</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input
            type="text"
            placeholder="Player ID"
            value={playerId}
            onChange={(e) => setPlayerId(e.target.value)}
            className="bg-white bg-opacity-20 text-white placeholder-gray-300"
          />
          <Input
            type="text"
            placeholder="Ticket ID"
            value={ticketId}
            onChange={(e) => setTicketId(e.target.value)}
            className="bg-white bg-opacity-20 text-white placeholder-gray-300"
          />
          <Button onClick={generateQR} className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-bold">
            Generate QR Code
          </Button>
          {qrCode && (
            <div className="mt-4 bg-white p-4 rounded-lg">
              <img src={qrCode || "/placeholder.svg"} alt="QR Code" className="mx-auto" />
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

