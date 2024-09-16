export default class BasicUser {
    constructor(
        private id: number,
        private picture: string,
        private login: string,
    ) {}

    public getId(): number {
        return this.id;
    }

    public getPicture(): string {
        return this.picture;
    }

    public getLogin(): string {
        return this.login;
    }
}

