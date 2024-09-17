type project = {
    name: string
    description: string
    url: string
}

export default class FullStudent {
    constructor(
        private city: string,
        private country: string,
        private login: string,
        private firstName: string,
        private lastName: string,
        private email: string,
        private image: string,
        private level: number,
        private grade: number,
        private numberOfProjects: number,
        private projects: project[],
        private correctionPoints: number
    ) {}
    getCity(): string {
        return this.city
    }

    getCountry(): string {
        return this.country
    }

    getFirstName(): string {
        return this.firstName
    }

    getLastName(): string {
        return this.lastName
    }

    getLogin(): string {
        return this.login
    }

    getEmail(): string {
        return this.email
    }

    getImage(): string {
        return this.image
    }

    getLevel(): number {
        return this.level
    }

    getGrade(): number {
        return this.grade
    }

    getNumberOfProjects(): number {
        return this.numberOfProjects
    }

    getProjects(): project[] {
        return this.projects
    }

    getCorrectionPoints(): number {
        return this.correctionPoints
    }
}
