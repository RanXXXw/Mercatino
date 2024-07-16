import jwt from "jsonwebtoken"
import { H3Event } from "h3"
import { Utente } from "~/types"

const SECRET = "foo"
const COOKIE_NAME = "access-token"

export function codificaUtente(event: H3Event, user: any){
    const accessToken = jwt.sign(user, SECRET,{  // creazione access cookies
        expiresIn:"1 day" // data scadenza cookies
    })
    // evento, cookies, dati cookies
    setCookie(event,COOKIE_NAME, accessToken,{
        httpOnly: true,
        sameSite: true
    } )
}

export function decodificaUtente(event: H3Event){
    // evento, cookies, dati cookies
    const accessToken = getCookie(event,COOKIE_NAME)
    if (!accessToken) return null
    try {
         const user = jwt.verify(accessToken, SECRET) as Utente
         return user
    } catch {
        return null
    }
}

export function rimuoviUtente(event: H3Event) {
    // Cancella il cookie dell'access token
    deleteCookie(event, COOKIE_NAME)
  }

export function requireLogin(utente:Utente | null){
    if(!utente){
        throw createError({
            statusCode: 403,
            statusMessage: "Questa azione richiede il login"
        })
    }
}

export function requireLogout(utente:Utente | null){
    if(utente){
        throw createError({
            statusCode: 403,
            statusMessage: "Questa azione richiede il logout"
        })
    }
}

