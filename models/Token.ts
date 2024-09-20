export default class Token {
    constructor(
        private access_token: string,
        private token_type: string,
        private expires_in: number,
        private created_at: number,
        private scope: string,
        private secret_valid_until: number
    ) {}

    getToken(): string {
        return this.access_token
    }

    getTokenType(): string {
        return this.token_type
    }

    getExpiresIn(): number {
        return this.expires_in
    }

    setExpiresIn(expires_in: number): void {
        this.expires_in = expires_in
    }

    getCreatedAt(): number {
        return this.created_at
    }

    getScope(): string {
        return this.scope
    }

    getSecretValidUntil(): number {
        return this.secret_valid_until
    }

    getExpirationTime(): number {
        return this.created_at + this.expires_in
    }

    isTokenExpiringSoon(): boolean {
        const currentTime = Math.floor(Date.now() / 1000);
        const expirationTime = this.getExpirationTime();
        const timeUntilExpiration = expirationTime - currentTime;
        return timeUntilExpiration <= 10 && timeUntilExpiration > 0;
      }
}
