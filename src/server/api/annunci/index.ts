import { createConnection } from "~/server/utils/db"

export default defineEventHandler(async function() {
  const connection = await createConnection()
  const [results] = await connection.execute(
    "SELECT annuncio.*, utente.nomeutente FROM annuncio JOIN utente ON annuncio.utente = utente.idutente"
  )
  return results
})

