import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react'
import BasicUser from '../models/BasicUser'
import { getStudentList } from '../utils/getStudent'
import { AuthContext } from './auth-context'

type StudentContextType = {
    students: BasicUser[]
    setStudents: (student: BasicUser) => void
    getStudents: () => BasicUser[]
}

type StudentsContextProviderProps = {
    children: ReactNode
}

export const StudentsContext = createContext<StudentContextType>({
    students: [],
    setStudents: () => {},
    getStudents: () => [],
})

export const StudentsContextProvider = ({
    children,
}: StudentsContextProviderProps) => {
    const authCtx = useContext(AuthContext)
    const [students, setStudents] = useState<BasicUser[]>([]);
    const [isLoading, setIsLoading] = useState(true);
  
    useEffect(() => {
      async function loadStudents() {
        if (authCtx?.token) {
          try {
            setIsLoading(true);
            const studentList = await getStudentList();
            if (studentList) {
              setStudents(studentList);
            }
          } catch (error) {
            console.error('Failed to load student list:', error);
          } finally {
            setIsLoading(false);
          }
        }
      }
  
      if (!authCtx?.isLoading && authCtx?.token) {
        loadStudents();
      }
    }, [authCtx?.isLoading, authCtx?.token]);

    const value = {
        students: students,
        setStudents: (student: BasicUser) =>
            setStudents([...students, student]),
        getStudents: () => students,
    }

    return (
        <StudentsContext.Provider value={value}>
            {children}
        </StudentsContext.Provider>
    )
}
