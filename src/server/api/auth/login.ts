import bcrypt from "bcrypt"
import { createConnection } from "~/server/utils/db"
import { codificaUtente, decodificaUtente, requireLogout } from "~/server/utils/auth"

export default defineEventHandler(async function(event) {

  const utente = decodificaUtente(event)
  requireLogout(utente)

  // prendere dati da form
  const {username, password} = await useBody(event)
  // creare collegamento con db
  const connection = await createConnection()
  const [results] = await connection.execute(
    `SELECT idutente, username, nomeutente, password, GROUP_CONCAT(DISTINCT idannuncio) as pubblicati
     FROM utente
     LEFT OUTER JOIN annuncio ON utente=idutente
     WHERE username=? AND attivo=1
     GROUP BY idutente, username, nomeutente, password`,
    [username])
  
  if (!Array.isArray(results) || results.length == 0){
    // username errato o non esistente
    throw createError({
      statusCode: 400,
      statusMessage: "Utente non esistente"
    })
  }

   // Controllo dei campi vuoti
   if (!username || !password) {
    throw createError({ statusCode: 400, statusMessage: "Tutti i campi sono obbligatori" })
  }
  
  // confronto del passaword db in caso di errore
  const user = results[0] as any
  //const passwordCorretta = password == user.password
  const passwordCorretta = await bcrypt.compare(password, user.password) //  non funziona con Elisa@gmail.com , perche db non ha password hashing

  if(!passwordCorretta){
    throw createError({
      statusCode: 400,
      statusMessage: "Password errata"
    })
  }
  delete user.passaword

  // creare JWT (access token) con dati utente
  // importare JWT come cookie
  codificaUtente(event, user)
  
  return { message: "Login effettuato con successo" }
})
