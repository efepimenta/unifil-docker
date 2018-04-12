import * as jwt from 'jsonwebtoken';

export class Jwt {

    private static JWT_SECRET = 'pastel-de-flango';

    public static createToken(data: {}): string {
        const token = jwt.sign(data, this.JWT_SECRET, {
            expiresIn: '10m'
        });
        return token;
    }

    public static verifyToken(token: string): boolean {
        try {
            const tk = jwt.verify(token, this.JWT_SECRET);
            return tk !== {};
        } catch (err) {
            return false
        }
    }

}