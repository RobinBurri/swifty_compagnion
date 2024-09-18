import axios from 'axios'
import { useCallback, useContext } from 'react'
import { API_URL } from '../constants/apiUrl'
import BasicStudent from '../models/BasicStudent'
import FullStudent from '../models/FullStudent'
import { AuthContext } from '../store/auth-context'

const ALL_USERS = '/v2/users'
const RATE_LIMIT_DELAY = 550;

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const useStudentList = () => {
  const authCtx = useContext(AuthContext);

  const getAllStudents = useCallback(async () => {
    if (!authCtx) {
      console.error('Auth context is not available');
      return;
    }

    try {
      const token = await authCtx.getToken();
      let allStudents: BasicStudent[] = [];
      let currentPage = 1;
      let hasMorePages = true;

      while (hasMorePages) {
        const response = await axios.get(`${API_URL}${ALL_USERS}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            page: currentPage,
            per_page: 100,
          },
        });

        const studentsOnPage = response.data.map((student: any) => {
          return new BasicStudent(
            student.id,
            student.image.link,
            student.login
          );
        });

        allStudents = [...allStudents, ...studentsOnPage];

        // Check if there are more pages
        const totalPages = parseInt(response.headers['x-total-pages'] || '1');
        hasMorePages = currentPage < totalPages;
        currentPage++;

        // Delay before the next request to respect rate limit
        if (hasMorePages) {
          await delay(RATE_LIMIT_DELAY);
        }
      }

      return allStudents;
    } catch (error) {
      console.error('Failed to get students:', error);
      return undefined;
    }
  }, [authCtx]);

  return { getAllStudents };
};

export const useStudentById = () => {
    const authCtx = useContext(AuthContext)

    const getStudentById = useCallback(
        async (studentLogin: string) => {
            if (!authCtx) {
                console.error('Auth context is not available')
                return
            }

            try {
                const token = await authCtx.getToken()
                const response = await axios.get(
                    `${API_URL}${ALL_USERS}/${studentLogin}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                )

                const student = createStudent(response.data)
                console.log(student)
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

const createStudent = (studentData: any): FullStudent => {
    console.log(studentData)

    console.log("-------------------")
    console.log(studentData.campus[0].city)
    console.log(studentData.campus[0].country)
    console.log(studentData.login)
    console.log(studentData.first_name)
    console.log(studentData.last_name)
    console.log(studentData.email)
    console.log(studentData.image.link)
    console.log(studentData.cursus_users[0].level)
    console.log(studentData.cursus_users[0].grade)
    console.log(studentData.projects_users.length)
    console.log(studentData.projects_users)
    console.log(studentData.correction_point)
    console.log("-------------------")


    const newStudent = new FullStudent(
        studentData.campus[0].city,
        studentData.campus[0].country,
        studentData.login,
        studentData.first_name,
        studentData.last_name,
        studentData.email,
        studentData.image.link,
        studentData.cursus_users[0].level,
        studentData.cursus_users[0].grade,
        studentData.projects_users.length,
        studentData.projects_users,
        studentData.correction_point
    )
    return newStudent
}
