import React, { createContext, ReactNode, useState } from 'react'
import BasicStudent from '../models/BasicStudent'

type StudentContextType = {
    students: BasicStudent[]
    setStudents: (student: BasicStudent) => void
    getStudents: () => BasicStudent[]
    newSetStudents: (newStudents: BasicStudent[]) => void
}

type StudentsContextProviderProps = {
    children: ReactNode
}

export const StudentsContext = createContext<StudentContextType>({
    students: [],
    setStudents: () => {},
    getStudents: () => [],
    newSetStudents: () => [],
})

export const StudentsContextProvider = ({
    children,
}: StudentsContextProviderProps) => {
    const [students, setStudents] = useState<BasicStudent[]>([])

    const value = {
        students: students,
        setStudents: (student: BasicStudent) =>
            setStudents([...students, student]),
        getStudents: () => students,
        newSetStudents: (newStudents: BasicStudent[]) => {
            setStudents([])
            setStudents(newStudents)
        },
    }

    return (
        <StudentsContext.Provider value={value}>
            {children}
        </StudentsContext.Provider>
    )
}
