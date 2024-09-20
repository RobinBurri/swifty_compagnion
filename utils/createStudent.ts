import Student, { Skill } from '../models/Student'

export const createStudent = (studentData: any): Student => {
    const skills: Skill[] = []
    let level = 0
    let blackholed = false
    console.log(studentData)
    if (studentData.blackholed_at) {
        blackholed = true
    }

    if (studentData.cursus_users[1]) {
        studentData.cursus_users[1].skills.forEach((skill: any) => {
            skills.push({
                id: skill.id,
                level: skill.level,
                name: skill.name,
            })
        })
    }

    const projects = studentData.projects_users.filter((project: any) => {
        return project.cursus_ids.includes(21)
    })

    if (studentData.cursus_users[1]) {
        level = studentData.cursus_users[1].level
            ? studentData.cursus_users[1].level
            : 0
        if (studentData.cursus_users[1].blackholed_at) {
            blackholed = true
        }
    }

    const newStudent = new Student(
        studentData.login,
        studentData.image.link,
        level,
        projects,
        studentData.correction_point,
        studentData.wallet,
        skills,
        blackholed
    )
    return newStudent
}
