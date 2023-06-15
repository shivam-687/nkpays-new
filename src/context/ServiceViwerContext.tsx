import { PropsWithChildren, useContext, createContext, useState, useEffect } from "react"

export type ServiceViwerItemContentObject = {
    title: string,
    desc: string,
    link?: string,
    image?: string
}
export type ServiceViwerItem = {
    id: string,
    title: string,
    content: React.ReactNode|ServiceViwerItemContentObject
}

export type ServiceViwerContextParam = {
    currentActiveItem?: ServiceViwerItem,
    setCurrentActiveItem: (item?: ServiceViwerItem) => void
}

export const ServiceViwerContext = createContext({} as ServiceViwerContextParam);

export const ServiceViwerContextProvider = ({
    children
}: PropsWithChildren) => {
    const [currentActiveItem, setCurrentActiveItem] = useState<ServiceViwerItem>()


    return (
        <ServiceViwerContext.Provider value={{currentActiveItem, setCurrentActiveItem }}>
            {children}
        </ServiceViwerContext.Provider>
    )
}
