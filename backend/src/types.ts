export interface PictureRequest {
    action: string
    id?: string
    name?: string
    description?: string
    imageUrl?: string
}

export interface Picture {
    id: string
    name: string
    description: string
    imageUrl: string
};
