import express from "express"
import qr from "qrcode"
import cors from "cors"
import { MongoClient } from "mongodb"
import dotenv from "dotenv"

dotenv.config()

const app = express()
const port = process.env.PORT || 3001

app.use(cors())
app.use(express.json())

// MongoDB connection
const mongoClient = new MongoClient(process.env.MONGODB_URI)
let db

mongoClient
  .connect()
  .then(() => {
    console.log("Connected to MongoDB")
    db = mongoClient.db("baseball_stats")
  })
  .catch((err) => console.error("Failed to connect to MongoDB", err))

app.post("/generate-qr", async (req, res) => {
  const { playerId, ticketId } = req.body
  const url = `${process.env.FRONTEND_URL}/player/${playerId}?ticket=${ticketId}`

  try {
    const qrCode = await qr.toDataURL(url)
    res.json({ qrCode })
  } catch (err) {
    res.status(500).json({ error: "Failed to generate QR code" })
  }
})

app.get("/player/:id", async (req, res) => {
  const playerId = req.params.id

  try {
    const player = await db.collection("players").findOne({ id: playerId })
    if (player) {
      res.json(player)
    } else {
      res.status(404).json({ error: "Player not found" })
    }
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch player data" })
  }
})

app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})

