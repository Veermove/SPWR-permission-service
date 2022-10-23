export interface User {
    user_id: number
    role: string
    mail: string | undefined
    name: string | undefined
    pwr_assoc: number
}

export interface Post {
    id: string
    tags: string
    content: string
    creation_date: number
    expiration_date: number
    author: string | undefined
    likes: number
    hidden: boolean
    hidden_since: number | undefined
    rewards: object | undefined
}


export interface Tag {
    tag_id: number
    names: string[]
}

export interface Role { 
    role_id: string
    privileges: string
}


export interface PwrAssociation {
    assoc_id: number
    name: string
}


export interface Respond {
    res_id: number
    res_content: string
    res_author: string 
    res_date: number
    orig_post: string
    res_likes: number
    res_reward: object | undefined
}






