export interface PictureRequest {
    method: string
    id?: string
    name?: string
    description?: string
    imageUrl?: string
    lastEvaluatedKey?: string
}

export interface Picture {
    id: string
    name: string
    description: string
    imageUrl: string
};
