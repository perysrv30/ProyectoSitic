import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UploadService{
    private cloudName = 'dq7nk4wjt'; // Reemplaza con tu cloud_name
    private uploadPreset = 'SiticCommerce'; // Reemplaza con tu upload_preset
    private apiUrl = `https://api.cloudinary.com/v1_1/${this.cloudName}/image/upload`;
  
    constructor(private http: HttpClient) {}
  
    uploadImage(file: File): Observable<any> {
        const formData = new FormData();
        formData.append('file', file);  // Agrega el archivo a FormData
        formData.append('upload_preset', this.uploadPreset);  // Agrega el upload_preset
    
        // Envia el FormData a la API de Cloudinary
        return this.http.post(this.apiUrl, formData);
    }
  }