export default class ResponseContent {
    constructor(content, data, type) {
        this.content={
            saludo: content.saludo,
            tema: content.tema,
            conclusion: content.conclusion,
            ejemplo: content.ejemplo,
            sugerenciaPractica: content.sugerencia_practica
        }
        this.data = {
            nextNum: data?.next_num,
            num: data?.num,
            num1: data?.num1,
            num2: data?.num2,
            previousNum: data?.previous_num,
            carry_digits: data?.carry_digits,
            borrow_digits: data?.borrow_digits,
            numbers: data?.numbers,
            result: data?.result
        };
        this.type = type;
    }
}