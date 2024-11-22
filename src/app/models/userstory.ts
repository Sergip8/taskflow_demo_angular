import { UserDetails } from "./user"

export interface Userstory{
    id: string
    title: string
    description: string
    projectId: string
    assignedUserId: string
    assignedUserName: string
}

export interface UserstoryForm{
    
    title: string
    ticketTitle: string
    description: string
    ticketDescription: string
    projectId: string
    assignedUserId: string
}
export interface UserStoryDetails{
    id: string
    title: string
    description: string
    assignedUser: UserDetails
}
export interface UserstoryUpdate{
    id: string
    title: string
    description: string
}
