export interface IRegistration {
    name: string,
    email: string,
    password: string,
    confirmPassword: string
}

export interface ILogin {
    email: string;
    password: string;
}

export interface ILoginResponse {
    userId: string;
    accessToken: string
}

export interface IVideo {
    userImageUrl: string | null
    userId: string;
    userName: string;
    videoId: string;
    videoPreviewUrl: string;
    videoTitle: string;
}

export interface IUserData {
    userEmail: string;
    userId: string;
    userImageUrl: string | null;
    userName: string;
    subscribed: boolean;
    videos: IVideo[]
}

export interface IVideoDetails {
    id: string,
    title: string,
    description: string,
    authorId: string,
    authorName: string,
    authorImageUrl: null | string,
    likes: number,
    dislikes: number,
    videoUrl: string
    isLiked: boolean,
    isDisliked: boolean,
    subscribed: boolean
}

export interface ISub {
    id: string;
    name: string;
    imageUrl: string | null;
}

export interface ISubsciber {
    id: string;
    name: string;
    videos: IVideo[]
}