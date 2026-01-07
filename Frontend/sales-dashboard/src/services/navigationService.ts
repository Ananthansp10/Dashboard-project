import api from "@/lib/axiosConfig"
import { NAV_ROUTES } from "@/routes/navRoutes"

export const getNav = async () => {
    try {
        const response = await api.get(NAV_ROUTES.GET_NAV)
        console.log("navigation response",response.data)
        return response.data
    } catch (error) {
        console.error('Error fetching navigation:', error)
        throw error
    }
}   