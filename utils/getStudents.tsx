import axios from "axios"
import { useContext } from "react"
import { API_URL } from "../constants/apiUrl"
import BasicUser from "../models/BasicUser"
import { AuthContext } from "../store/auth-context"


const USER_BY_CAMPUS = '/v2/campus_users'

export const getStudentList = async () => {
    const authCtx = useContext(AuthContext)
    if (!authCtx) {
        return
    }
    try {
        const response = await axios.get(`${API_URL}${USER_BY_CAMPUS}`, {
            headers: {
                Authorization: `Bearer ${authCtx.getToken()}`,
            },
        })
        const students = response.data.map((student: any) => {
            return new BasicUser(
                student.id,
                student.image_url,
                student.login
            )
        })
        return students
    } catch (error) {
        console.error('Failed to get students:', error)
        return undefined
    }
}