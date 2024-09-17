import React, {
    createContext,
    ReactNode,
    useContext,
    useEffect,
    useState,
} from 'react'
import { Alert } from 'react-native'
import BasicUser from '../models/BasicUser'
import { useStudentList } from '../utils/getStudent'
import { AuthContext } from './auth-context'

type StudentContextType = {
    students: BasicUser[]
    setStudents: (student: BasicUser) => void
    getStudents: () => BasicUser[]
    isLoading: boolean
}

type StudentsContextProviderProps = {
    children: ReactNode
}

export const StudentsContext = createContext<StudentContextType>({
    students: [],
    setStudents: () => {},
    getStudents: () => [],
    isLoading: true,
})

export const StudentsContextProvider = ({
    children,
}: StudentsContextProviderProps) => {
    const authCtx = useContext(AuthContext)
    const { getStudentList } = useStudentList()
    const [students, setStudents] = useState<BasicUser[]>([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        async function loadStudents() {
            if (authCtx?.token) {
                try {
                    setIsLoading(true)
                    const studentList = await getStudentList()
                    if (studentList) {
                        setStudents(studentList)
                    }
                } catch (error) {
                    Alert.alert('Error while fetching students')
                } finally {
                    setIsLoading(false)
                }
            }
        }

        if (!authCtx?.isLoading && authCtx?.token) {
            loadStudents()
        }
    }, [authCtx?.isLoading, authCtx?.token, getStudentList])

    const value = {
        students: students,
        setStudents: (student: BasicUser) =>
          setStudents([...students, student]),
        getStudents: () => students,
        isLoading: isLoading,
    }

    return (
        <StudentsContext.Provider value={value}>
            {children}
        </StudentsContext.Provider>
    )
}
