import { createConnection } from "~/server/utils/db";


export default defineEventHandler(async function(event) {

    try{
        const {idannuncio} = await readBody(event);
        const connection = await createConnection()
       await connection.execute(
          `DELETE FROM annuncio WHERE annuncio.idannuncio = ?`,
          [idannuncio]
        )
    return { message: "annuncio cancellato con successo" };    

    } catch (error) {
        console.error("Errore durante la cancellazione dell'annuncio:", error);
        return { error: "Errore durante la cancellazione dell'annuncio" };
      }



  })
  
  