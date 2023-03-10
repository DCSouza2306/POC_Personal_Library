export type book = {
    title: string,
    author: string,
    publishCompany: string,
    year: number,
    edition: string
}

export type author = {
    name: string
}

export type publishingCompany = {
    name: string,
}


export type ErrorModel = {
    name: string,
    message: string
}

export type CompanyEntity = {
    id: number,
    name: string
}

export type AuthorEntity = {
    id: number,
    name: string
}

export type BookEntity = {
    id: number,
    title: string,
    publishingCompId: number,
    year: number,
    edition: number
}