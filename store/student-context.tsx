import React, { createContext, ReactNode, useState } from 'react'
import BasicStudent from '../models/BasicStudent'

type StudentContextType = {
    students: BasicStudent[]
    setStudents: (student: BasicStudent) => void
    getStudents: () => BasicStudent[]
    newSetStudents: (newStudents: BasicStudent[]) => void
    hasSearched: boolean
}

type StudentsContextProviderProps = {
    children: ReactNode
}

export const StudentsContext = createContext<StudentContextType>({
    students: [],
    setStudents: () => {},
    getStudents: () => [],
    newSetStudents: () => [],
    hasSearched: false,
})

export const StudentsContextProvider = ({
    children,
}: StudentsContextProviderProps) => {
    const [students, setStudents] = useState<BasicStudent[]>([])
    const [ hasSearched, setHasSearched ] = useState(false)

    const value = {
        students: students,
        setStudents: (student: BasicStudent) => {
            setStudents([...students, student])
            setHasSearched(true)
        },
        getStudents: () => students,
        newSetStudents: (newStudents: BasicStudent[]) => {
            setStudents([])
            setStudents(newStudents)
            setHasSearched(true)
        },
        hasSearched: hasSearched
    }

    return (
        <StudentsContext.Provider value={value}>
            {children}
        </StudentsContext.Provider>
    )
}
