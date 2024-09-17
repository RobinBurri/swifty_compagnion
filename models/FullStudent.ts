type project = {
    name: string
    description: string
    url: string
}

export default class FullStudent {
    constructor(
        private city: string,
        private country: string,
        private firstName: string,
        private lastName: string,
        private email: string,
        private image: string,
        private level: number,
        private grade: string,
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

    getEmail(): string {
        return this.email
    }

    getImage(): string {
        return this.image
    }

    getLevel(): number {
        return this.level
    }

    getGrade(): string {
        return this.grade
    }

    getProjects(): project[] {
        return this.projects
    }

    getCorrectionPoints(): number {
        return this.correctionPoints
    }
}
