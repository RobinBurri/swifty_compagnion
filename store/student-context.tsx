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
    newSetStudents: (newStudents: BasicStudent[] ) => void
    isLoading: boolean
}

type StudentsContextProviderProps = {
    children: ReactNode
}

export const StudentsContext = createContext<StudentContextType>({
    students: [],
    setStudents: () => {},
    getStudents: () => [],
    newSetStudents: () => [],
    isLoading: true,
})

export const StudentsContextProvider = ({
    children,
}: StudentsContextProviderProps) => {
    const authCtx = useContext(AuthContext)
    const { getAllStudents } = useStudentList()
    const [students, setStudents] = useState<BasicStudent[]>([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        async function loadStudents() {
            if (authCtx?.token) {
                try {
                    setIsLoading(true)
                    const studentList = await getAllStudents()
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
    }, [authCtx?.isLoading, authCtx?.token, getAllStudents])

    const value = {
        students: students,
        setStudents: (student: BasicStudent) =>
            setStudents([...students, student]),
        getStudents: () => students,
        newSetStudents: (newStudents: BasicStudent[]) => {
            setStudents([])
            setStudents(newStudents)   
        },
        isLoading: isLoading,
    }

    return (
        <StudentsContext.Provider value={value}>
            {children}
        </StudentsContext.Provider>
    )
}
