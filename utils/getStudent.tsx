import axios from 'axios'
import { useCallback, useContext } from 'react'
import { API_URL } from '../constants/apiUrl'
import BasicStudent from '../models/BasicStudent'
import Student, { Skill } from '../models/Student'
import { AuthContext } from '../store/auth-context'

// 47 is the campus id for Lausanne
const ALL_LAUSANNE_STUDENTS = '/v2/campus/47/users'
const ALL_STUDENTS = '/v2/users/'

export const useFilteredStudentList = () => {
    const authCtx = useContext(AuthContext)

    const getAllFilteredStudents = useCallback(
        async (filteredLogin: string) => {
            if (!authCtx) {
                console.error('Auth context is not available')
                return
            }

            try {
                const token = await authCtx.getToken()
                let allStudents: BasicStudent[] = []
                let currentPage = 1
                let hasMoreStudents = true
                const queryParameter =
                    '?range[login]=' + filteredLogin + ',' + filteredLogin + 'z'
                while (hasMoreStudents) {
                    const response = await axios.get(
                        `${API_URL}${ALL_LAUSANNE_STUDENTS}${queryParameter}`,
                        {
                            headers: {
                                Authorization: `Bearer ${token}`,
                            },
                            params: {
                                page: currentPage,
                                per_page: 100,
                            },
                        }
                    )

                    const studentsOnPage = response.data.map((student: any) => {
                        let bestImage = student.image?.versions?.small
                        if (!bestImage) {
                            bestImage = student.image.link
                        }
                        return new BasicStudent(
                            student.id,
                            bestImage,
                            student.login
                        )
                    })

                    // if (studentsOnPage.length === 0) {
                    //     hasMoreStudents = false
                    // } else {
                    //     allStudents = [...allStudents, ...studentsOnPage]
                    //     currentPage++
                    // }
                    allStudents = [...allStudents, ...studentsOnPage]
                    hasMoreStudents = false

                    console.log('Current page: ', currentPage)
                    console.log(
                        'Students on this page: ',
                        studentsOnPage.length
                    )
                }

                console.log('Total students fetched: ', allStudents.length)
                return allStudents
            } catch (error) {
                console.error('Failed to get students:', error)
                return undefined
            }
        },
        [authCtx]
    )

    return { getAllFilteredStudents }
}

export const useStudentById = () => {
    const authCtx = useContext(AuthContext)
    const getStudentById = useCallback(
        async (studentId: number) => {
            if (!authCtx) {
                console.error('Auth context is not available')
                return
            }

            try {
                const token = await authCtx.getToken()
                const response = await axios.get(
                    `${API_URL}${ALL_STUDENTS}${studentId.toString()}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                )

                const student = createStudent(response.data)
                return student
            } catch (error) {
                console.error('Failed to get student:', error)
                return undefined
            }
        },
        [authCtx]
    )

    return { getStudentById }
}

const createStudent = (studentData: any): Student => {
    const skills: Skill[] = []
    let level = 0

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
    }
    console.log("-----------------")
    console.log(studentData.image.link)
    console.log("-----------------")


    const newStudent = new Student(
        studentData.login,
        studentData.image.link,
        level,
        projects,
        studentData.correction_point,
        studentData.wallet,
        skills
    )
    return newStudent
}
