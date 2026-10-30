//SQL

export type user = {
    username: string,
    email: string,
    password: string,
    id: number
}

export type item = {
    id: number,
    title: string,
    description: string
}

export type tokenPayload = {
    username: string,
    role: string,
    id: number
}


export let items: item[] = [];
export let accounts: user[] = [];