
export type User = {
    username: string
    password: string
}

export type UrlPosts = {
    posts: UrlPost[]
}

export type UrlPost = {
    url: string;
    language: string;
}

export type ImageUrlPosts = {
    posts: ImageUrlPost[]
}

export type ImageUrlPost = {
    url: string;
    text: string;
}

export type TextPosts = {
    posts: TextPost[]
}

export type TextPost = {
    text: string
}

export type BioList = {
    bioList: Bio[]
}

export type Bio = {
    text: string,
    isMarkdown: boolean
}

export type Config = {
    frontendUrl: string
}
