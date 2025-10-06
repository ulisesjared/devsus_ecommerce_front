
export interface IPresentation { //Esta interface se usa para enviar el body al back al create o update
    id: string,
    product: string, 
    size: string,
    unit_measure: string,//este es con el que se recibe la info en el retrieve
    quantity: string,
    base_price: string
}