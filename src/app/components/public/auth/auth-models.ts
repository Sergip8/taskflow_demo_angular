export interface RegistrationResponse{
    username: string  
    password: string  
    email: string  
    companyId: string
  
}
export interface AuthRequest{
    data: UserRequest | LoginRequest
    status: string
    msn: string
}
export interface UserRequest{
    id: string
    companyId: string
    username: string
    email: string
    role: string[]
}
export interface LoginRequest{
    user: UserRequest
    token: string
}
export interface LoginResponse{
    email: string
    password: string
}
