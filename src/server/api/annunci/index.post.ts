import { createConnection } from "~/server/utils/db";
import { decodificaUtente, requireLogin } from "../../utils/auth"
import fs from "fs/promises";


function generateRandomString(length: number) {
  const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

export default defineEventHandler(async function(event) {

  // Blocca la richiesta se l'utente non ha effettuato il login
  const utente = decodificaUtente(event)
  requireLogin(utente)

  try {
    // Estrae il body della richiesta
    const { titoloannuncio, testoannuncio, prezzoannuncio, image, categoriaannuncio } = await readBody(event);

    // Compone la data di creazione
    const date = new Date();
    const dataannuncio = date.getFullYear() + "-" + (date.getMonth() + 1).toString().padStart(2, "0") + "-" + date.getDate().toString().padStart(2, "0");

 
    const timestamp = Date.now();
    const randomString = generateRandomString(5); // Lunghezza della stringa casuale
    const imageFileName = `${timestamp}_${randomString}.jpeg`;   // Genera un nome univoco per l'immagine
    const imagePath = `./src/public/img/${imageFileName}`;
    await fs.writeFile(imagePath, image, "base64");

    // Inserisce l'annuncio
    const connection = await createConnection();
    await connection.execute(
      `INSERT INTO annuncio (titoloannuncio, testoannuncio, dataannuncio, prezzoannuncio, imgannuncio, utente, categoria)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [titoloannuncio, testoannuncio, dataannuncio, prezzoannuncio, imageFileName, utente?.idutente, categoriaannuncio]
    );

    return { message: "annuncio creato con successo" };
  } catch (error) {
    console.error("Errore durante la creazione dell'annuncio:", error);
    return { error: "Errore durante la creazione dell'annuncio" };
  }
});
