import { createConnection } from "~/server/utils/db";


export default defineEventHandler(async (event) => {
  try {
    const { idannuncio, titoloannuncio, testoannuncio, prezzoannuncio} = await readBody(event);

    console.log("Updating announcement with ID:", idannuncio);
    console.log("New title:", titoloannuncio);
    console.log("New text:", testoannuncio);
    console.log("New price:", prezzoannuncio);

    const connection = await createConnection();

    await connection.execute(
      `UPDATE annuncio SET titoloannuncio = ?, testoannuncio = ?, prezzoannuncio = ?  WHERE idannuncio = ?`,
      [titoloannuncio, testoannuncio, prezzoannuncio, idannuncio]
    );

    return { message: "annuncio aggiornato con successo db" };
  } catch (error) {
    console.error("Errore durante l'aggiornamento dell'annuncio db:", error);
    return { error: "Errore durante l'aggiornamento dell'annuncio db" };
  }
});
