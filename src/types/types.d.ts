type UserId = `${string}-${string}-${string}-${string}-${string}`

export interface User {
    name:string
    email:string
    github:string
}

export interface UserWithId extends User {
    id: UserId
}
