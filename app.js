const express = require('express')
const path = require('path')

const app = express()
app.use(express.json())

const {open} = require('sqlite')
const sqlite3 = require('sqlite3')

const dbPath = path.join(__dirname, 'cricketTeam.db')

let db = null

const intilizeDatabaseAndServer = async () => {
  try {
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    })

    app.listen(3000, () => {
      console.log(`Server Running at http://localhost:3000`)
    })
  } catch (e) {
    console.log(`Db Error ${e.message}`)
    process.exit(1)
  }
}

intilizeDatabaseAndServer()
app.get('/players/', async (request, response) => {
  const getPlayer = `select * from cricket_team;`
  const playerArray = await db.all(getPlayer)
  response.send(playerArray)
})
app.post('/players/', async (request, response) => {
  const book = request.body
  const {playerName, jerseyNumber, role} = bookItem
  const postPlayer = `insert into cricket_team (playerName,jerseyNumber,role) values(
    ${playerName},
    ${jerseyNumber},
    ${role}
  );`
  const player = await db.run(postPlayer)
  const playerId = player.lastId
  response.send({player_id: playerId})
})
app.get('/players/:playerId/', async (request, response) => {
  const {player_Id} = request.params
  const getplayerId = `select * from cricket_team where player_id=${player_Id};`
  const playerIdArray = await db.get(getplayerId)
  response.send(playerIdArray)
})
app.put('/players/:playerId/', async (request, response) => {
  const player = request.body
  const {id} = request.params
  const getplayerId = `update cricket_team set 
    playerName=${playerName},
    jerseyNumber=${jerseyNumber},
    role=${role}
   where player_id=${id};`
  const playerIdArray = await db.all(getplayerId)
  response.send(playerIdArray)
})
app.delete('/players/:playerId/', async (request, response) => {
  const {player_Id} = request.params
  const getplayerId = `delete from cricket_team where player_id=${player_Id};`
  const playerIdArray = await db.all(getplayerId)
  response.send(playerIdArray)
})
