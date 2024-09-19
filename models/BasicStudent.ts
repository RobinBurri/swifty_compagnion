export default class BasicStudent {
    constructor(
        private id: number,
        private picture: string,
        private login: string,
        private blackholed: boolean
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

    public isBlackholed(): boolean {
        return this.blackholed;
    }
}

