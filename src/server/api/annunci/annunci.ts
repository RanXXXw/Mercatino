import { createConnection } from "~/server/utils/db"


export default defineEventHandler(async function(event) {
  const connection = await createConnection()
  const [results] = await connection.execute(
    `SELECT * 
    FROM annuncio     
    JOIN utente ON utente.idutente = annuncio.utente 
    ORDER BY annuncio.dataannuncio DESC;`
  )
  return results
})
