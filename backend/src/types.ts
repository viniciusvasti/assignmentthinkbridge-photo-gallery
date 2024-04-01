export interface PictureRequest {
    action: string
    id?: string
    name?: string
    description?: string
    imageUrl?: string
    lastEvaluatedKey?: number
}

export interface Picture {
    id: string
    name: string
    description: string
    imageUrl: string
};
