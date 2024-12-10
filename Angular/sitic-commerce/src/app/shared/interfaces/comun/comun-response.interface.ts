import { Error } from "./error.interface";
export interface ComunResponse {
    error: Error;
    isSuccess: boolean;
}

export interface UploadResponse {
    success: boolean;
    message: string;
    imageUrl: string;
}