
//valori da controllers del backend
export interface Annuncio{
    idannuncio: number
    imgannuncio: string
    prezzoannuncio: number
    titoloannuncio: string
    testoannuncio: string
    dataannuncio:string
    nomeutente: string
    categoria: number
}

export interface Utente{
    idutente: number
    nomeutente: string
    username: string
    attivo: number
}

export interface Categoria{
    idcategoria: number
    nomecategoria: string
}