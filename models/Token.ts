
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

    isTokenExpiringSoon(): boolean {
        const currentTime = Math.floor(Date.now() / 1000)
        const timeSinceGotToken = currentTime - this.getGotTokenTime()
        const timeLeft = this.getExpiresIn() - timeSinceGotToken
        console.log('Time left:', timeLeft)
        return timeLeft <= 60 && timeLeft > 0
    }
}
