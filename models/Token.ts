
export default class Token {
    private gotTokenTime: number
    constructor(
        private access_token: string,
        private expires_in: number,
        private created_at: number,

    ) {
        this.gotTokenTime = Math.floor(Date.now() / 1000)
    }

    getToken(): string {
        return this.access_token
    }

    getExpiresIn(): number {
        return this.expires_in
    }

    getCreatedAt(): number {
        return this.created_at
    }

    getGotTokenTime(): number {
        return this.gotTokenTime
    }

    getTimeLeft(): number {
        const currentTime = Math.floor(Date.now() / 1000)
        const timeSinceGotToken = currentTime - this.getGotTokenTime()
        return this.getExpiresIn() - timeSinceGotToken
    }

    isTokenExpiringSoon(): boolean {
        const currentTime = Math.floor(Date.now() / 1000)
        const timeSinceGotToken = currentTime - this.getGotTokenTime()
        const timeLeft = this.getExpiresIn() - timeSinceGotToken
        return timeLeft <= 5;
    }
}
