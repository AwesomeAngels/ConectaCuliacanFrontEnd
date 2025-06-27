export class RequestError {
    data: Record<string, string>;
    status: number;

    constructor(data: Record<string, string>, status: number) {
        this.data = data;
        this.status = status;
    }

    public toString = () : string => {
        return "Type: BadRequestError[]"
    }
}