import axios from 'axios'
import { useCallback, useContext } from 'react'
import { API_URL } from '../constants/apiUrl'
import BasicStudent from '../models/BasicStudent'
import { AuthContext } from '../store/auth-context'

const ALL_USERS = '/v2/users'

export const useStudentList = () => {
    const authCtx = useContext(AuthContext)
    const getStudentList = useCallback(async () => {
        if (!authCtx) {
            console.error('Auth context is not available')
            return
        }

        try {
            const token = await authCtx.getToken()
            const response = await axios.get(`${API_URL}${ALL_USERS}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })

            const students = response.data.map((student: any) => {
                return new BasicStudent(
                    student.id,
                    student.image.link,
                    student.login
                )
            })

            return students
        } catch (error) {
            console.error('Failed to get students:', error)
            return undefined
        }
    }, [authCtx])

    return { getStudentList }
}

export const useStudentById = () => {
    const authCtx = useContext(AuthContext);
  
    const getStudentById = useCallback(async (studentLogin: string) => {
      if (!authCtx) {
        console.error('Auth context is not available');
        return;
      }
  
      try {
        const token = await authCtx.getToken();
        const response = await axios.get(
          `${API_URL}${ALL_USERS}/${studentLogin}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
  
        const student = response.data;
        console.log(student);
        return student;
      } catch (error) {
        console.error('Failed to get student:', error);
        return undefined;
      }
    }, [authCtx]);
  
    return { getStudentById };
  };
