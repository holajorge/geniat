export interface RespuestaCars{
    response: true,
    message:string,
    data: {resultados:Car[], marcas: Marca[]}
}
export interface Usuario {
    _id?:string,
    firstname?:string,
    lastname?:string,
    birthdate?: string,
    email?:string
    password?:string
}

export interface Car{
    nombreModelo: string,
    nombreMarca:string,
    idModelo: number
}

export interface Marca{
    nombre:string,
    idMarca: number
}
