import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { lastValueFrom } from "rxjs/internal/lastValueFrom";

// CONFIGURACION
import { environment } from '../../../environments/environment';
import { UploadResponse } from "../interfaces/comun/comun-response.interface";


@Injectable({
    providedIn: 'root'
})
export class ComunService {

    private _actionUrls: string;
    constructor(public http: HttpClient) {
        this._actionUrls = `${environment.URI_SERVER}/Comun/Comun`;;
    }

    async Upload(file: File, id: number): Promise<UploadResponse> {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('id', id.toString());
    
        const response = await lastValueFrom(this.http.post<UploadResponse>(`${this._actionUrls}/upload`, formData));
        return response;
      }
}