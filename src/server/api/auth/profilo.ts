import { decodificaUtente } from "~/server/utils/auth"

export default defineEventHandler(async function(event) {
  // Ottenere access token del cookie
  // decoficare token, ottenere dati utente
  const utente = decodificaUtente(event)
  return utente
})
