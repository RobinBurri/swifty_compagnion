import axios from 'axios'
import { useCallback, useContext } from 'react'
import { Alert } from 'react-native'
import { API_URL } from '../constants/apiUrl'
import { AuthContext } from '../store/auth-context'
import { createStudent } from './createStudent'

const ALL_STUDENTS = '/v2/users/'

export const useStudentById = () => {
    const authCtx = useContext(AuthContext)
    const getStudentById = useCallback(
        async (studentId: number) => {
            try {
                const token = await authCtx.getToken()
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
                Alert.alert(
                    'Error while fetching student',
                    'Please go back and try again.',
                    [{ text: 'OK' }]
                )
                return null
            }
        },
        [authCtx]
    )
    return { getStudentById }
}
