import axios from 'axios'
import { useCallback, useContext } from 'react'
import { API_URL } from '../constants/apiUrl'
import { LOG_TOKEN } from '../constants/tokenLog'
import { AuthContext } from '../store/auth-context'
import { createStudent } from './createStudent'

const ALL_STUDENTS = '/v2/users/'

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
                if (LOG_TOKEN) {
                    console.log('Token:', token?.getToken())
                }
                const response = await axios.get(
                    `${API_URL}${ALL_STUDENTS}${studentId.toString()}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token?.getToken()}`,
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