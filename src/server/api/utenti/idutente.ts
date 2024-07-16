import { createConnection } from "~/server/utils/db"
import { decodificaUtente, requireLogin } from "../../utils/auth"


export default defineEventHandler(async function(event) {

    // Blocca la richiesta se l'utente non ha effettuato il login
    // ottengo dati utente
    const utente = decodificaUtente(event)
    requireLogin(utente)

    const connection = await createConnection()
    const [results] = await connection.execute(
    `SELECT annuncio.*, nomeutente
     FROM annuncio JOIN utente ON annuncio.utente = utente.idutente
     WHERE utente.idutente =?`,
     [utente?.idutente]
    )
    return results
})
  