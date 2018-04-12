export class ResponseCreator {
    static responseError(status: number, msg = 'Username ou password inválidos',
                         help = 'Informe um usuário e senha válidos') {
        return {
            Type: 'Error',
            HttpCode: status,
            Response: {
                Data: msg,
                Help: help
            }
        }
    }

    static responseSuccess(status: number, token: string): object {
        return {
            Type: 'Success',
            HttpCode: status,
            Response: {
                token: token
            }
        }
    }

    static responseSuccessWithData(status: number, data, counter?: number): object {
        return {
            Type: 'Success',
            HttpCode: status,
            Response: {
                Counter: counter,
                Data: data
            }
        }
    }
}