import React, {
    createContext,
    ReactNode,
    useContext,
    useEffect,
    useState,
} from 'react'
import { Alert } from 'react-native'
import BasicStudent from '../models/BasicStudent'
import { useStudentList } from '../utils/getStudent'
import { AuthContext } from './auth-context'

type StudentContextType = {
    students: BasicStudent[]
    setStudents: (student: BasicStudent) => void
    getStudents: () => BasicStudent[]
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
    const [students, setStudents] = useState<BasicStudent[]>([])
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
        setStudents: (student: BasicStudent) =>
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
