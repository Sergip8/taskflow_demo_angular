import { Project } from "./project"
import { UserDetails } from "./user"
import { UserStoryDetails } from "./userstory"

export interface Ticket{
        id: string
        title: string
        description: string
        status: string
}
export interface TicketCreate{
        storyId: string
        title: string
        assignedUserId: string
        description: string
}
export interface TicketDetails{
        id: string
        title: string
        description: string
        status: string
        comments: Comments[]
        project: Project
        ticketUser: UserDetails 
        userStory: UserStoryDetails
}
export interface Comments{
        authorId: string
        message: string
        createdAt: string
}
export class TicketFilter{
        page: number = 0
        size: number = 10
        status: string = ""
        order: string = "createdAt"
        orderDirection: string ="desc"
        search: string = ""
}