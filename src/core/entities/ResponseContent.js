export default class ResponseContent {
    constructor(content, data, type) {
        this.content={
            saludo: content.saludo,
            audio: content.audio,
            ejemplo: content.ejemplo
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
            result: data?.result,
            hundreds: data?.hundreds,
            tens: data?.tens,
            ones: data?.ones,
            sequence: data?.sequence,
            step: data?.step
        };
        this.type = type;
    }
}
