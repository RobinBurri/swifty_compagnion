import React, { createContext, ReactNode, useEffect, useState } from 'react'
import BasicUser from '../models/BasicUser'
import { getStudentList } from '../utils/getStudents'

type StudentContextType = {
    students: BasicUser[]
    setStudents: (student: BasicUser) => void
    getStudents: () => BasicUser[]
}

type StudentsContextProviderProps = {
    children: ReactNode
}

const StudentsContext = createContext<StudentContextType>({
    students: [],
    setStudents: () => {},
    getStudents: () => [],
})

export const StudentsContextProvider = ({
    children,
}: StudentsContextProviderProps) => {
    const [students, setStudents] = useState<BasicUser[]>([])
    useEffect(() => {
        async function loadStudents() {
            const studentList = await getStudentList()
            if (studentList) {
                setStudents(studentList)
            }
        }
        loadStudents()
    }, [])

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
