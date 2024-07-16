import { createConnection } from "~/server/utils/db"


export default defineEventHandler(async function(event) {
  const connection = await createConnection()
  const [results] = await connection.execute(
    `SELECT idannuncio, titoloannuncio, dataannuncio, testoannuncio, imgannuncio, prezzoannuncio, nomeutente
    FROM annuncio
    JOIN categoria ON annuncio.categoria = categoria.idcategoria
    JOIN utente ON utente.idutente = annuncio.utente
    WHERE categoria.idcategoria = 4`
  )
  return results
})
