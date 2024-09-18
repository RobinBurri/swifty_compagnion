import axios from 'axios'
import { useCallback, useContext } from 'react'
import { API_URL } from '../constants/apiUrl'
import BasicStudent from '../models/BasicStudent'
import Student from '../models/Student'
import { AuthContext } from '../store/auth-context'

const ALL_LAUSANNE_STUDENTS = '/v2/campus/47/users'
const ALL_STUDENTS = '/v2/users/'

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export const useStudentList = () => {
    const authCtx = useContext(AuthContext)

    const getAllStudents = useCallback(async () => {
        if (!authCtx) {
            console.error('Auth context is not available')
            return
        }

        try {
            const token = await authCtx.getToken()
            let allStudents: BasicStudent[] = []
            let currentPage = 1
            let hasMoreStudents = true

            while (hasMoreStudents) {
                const response = await axios.get(
                    `${API_URL}${ALL_LAUSANNE_STUDENTS}`,
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
                console.log('Students on this page: ', studentsOnPage.length)
            }

            console.log('Total students fetched: ', allStudents.length)
            return allStudents
        } catch (error) {
            console.error('Failed to get students:', error)
            return undefined
        }
    }, [authCtx])

    return { getAllStudents }
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
                // const queryParameter = "?range[login]=" + studentLogin + "," + studentLogin + 'z'
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
    console.log(studentData)

    console.log('-------------------')
    console.log(studentData.login)
    console.log(studentData.image.link)
    console.log(studentData.cursus_users[0].level)
    console.log(studentData.cursus_users[0].grade)
    console.log(studentData.projects_users.length)
    console.log(studentData.projects_users)
    console.log(studentData.correction_point)
    console.log(studentData.wallet)
    console.log('-------------------')

    const newStudent = new Student(
        studentData.login,
        studentData.image.link,
        studentData.cursus_users[0].level,
        studentData.cursus_users[0].grade,
        studentData.projects_users.length,
        studentData.projects_users,
        studentData.correction_point,
        studentData.wallet
    )
    return newStudent
}
