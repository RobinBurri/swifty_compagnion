export type Project = {
    project: {
        name: string
    }
    ['validated?']: boolean
    status: 'finished' | 'in_progress' | 'waiting_for_correction'
    cursus_ids: number[]
}

export default class Student {
    constructor(
        private login: string,
        private image: string,
        private level: number,
        private grade: number,
        private numberOfProjects: number,
        private projects: Project[],
        private correctionPoints: number,
        private wallet: number
    ) {}

    getLogin(): string {
        return this.login
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

    getProjects(): Project[] {
        return this.projects
    }

    getCorrectionPoints(): number {
        return this.correctionPoints
    }

    getWallet(): number {
        return this.wallet
    }
}
