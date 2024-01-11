import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, timeout } from 'rxjs/operators';
import { environment } from '../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private readonly SLASH = "/";
  private readonly DEFALT_TIMEOUT: number = 60000;

  constructor(private http: HttpClient) { }

  protected getDefaultHeaders(): HttpHeaders {
    let headers = new HttpHeaders()
      .set('Content-Type', 'application/json').set('Cache-Control', 'no-cache')
      .set('Pragma', 'no-cache')
      .set('Expires', 'Thu, 01 Jan 1970 00:00:00 GMT')
      .set('If-Modified-Since', '0')
    return headers;
  }

  protected getUploadMultipartHeaders(): HttpHeaders {
    let headers = new HttpHeaders()
      .set('Accept', '*/*').set('Content-Type', 'multipart/form-data')
    return headers;
  }

  protected getDownloadHeaders(): HttpHeaders {
    let headers = new HttpHeaders()
      .set('Accept', '*/*').set('Content-Type', 'application/json')
    return headers;
  }

  delete<T>(endpoint: string, id: number, time: number = this.DEFALT_TIMEOUT): Observable<T> {
    return this.http.delete<T>(`${environment.apiUrl}${endpoint}${this.SLASH}${id}`, { headers: this.getDefaultHeaders() }).pipe(timeout(time));
  }

  get<T>(endpoint: string, time: number = this.DEFALT_TIMEOUT): Observable<T> {
    return this.http.get<T>(`${environment.apiUrl}${endpoint}`, { headers: this.getDefaultHeaders() }).pipe(timeout(time));
  }

  post<T, V = T>(endpoint: string, element: T, time: number = this.DEFALT_TIMEOUT): Observable<V> {
    return this.http.post<V>(`${environment.apiUrl}${endpoint}`, element, { headers: this.getDefaultHeaders() }).pipe(timeout(time));
  }

  put<T, V = T>(endpoint: string, element: T, time: number = this.DEFALT_TIMEOUT): Observable<V> {
    return this.http.put<V>(`${environment.apiUrl}${endpoint}`, element, { headers: this.getDefaultHeaders() }).pipe(timeout(time));
  }

  downloadFile<T>(endpoint: string, obj: T, time: number = this.DEFALT_TIMEOUT): Observable<any> {
    return this.http.post(`${environment.apiUrl}${endpoint}`, obj, { responseType: 'blob' as 'json', observe: 'response', headers: this.getDownloadHeaders() }).pipe(timeout(time), map((res: any) => {
      const contentDisposition = res.headers.get('Content-Disposition');
      const filename = contentDisposition.split(';')[1].split('filename')[1].split('=')[1].trim().match(/"([^"]+)"/)[1];
      this.saveFile(res.body, filename);
    }));
  }

  downloadFileGet(endpoint: string, time: number = this.DEFALT_TIMEOUT): Observable<any> {
    return this.http.get(`${environment.apiUrl}${endpoint}`, { responseType: 'blob' as 'json', observe: 'response', headers: this.getDownloadHeaders() }).pipe(timeout(time), map((res: any) => {
      const contentDisposition = res.headers.get('Content-Disposition');
      const filename = contentDisposition.split(';')[1].split('filename')[1].split('=')[1].trim().match(/"([^"]+)"/)[1];
      this.saveFile(res.body, filename);
    }));
  }

  uploadFile<T, V>(endpoint: string, formData: FormData, time: number = this.DEFALT_TIMEOUT): Observable<V> {
    return this.http.post<V>(`${environment.apiUrl}${endpoint}`, formData).pipe(timeout(time));
  }

  private saveFile(res: any, fileName: string) {
    const blob = new Blob([res], { type: 'application/pdf' });
    const url = window.URL.createObjectURL(blob);
    window.open(url, '_blank')

    // Gestione con filename in caso servisse

    // let a : any = document.createElement("a");
    // document.body.appendChild(a);
    // a.style = "display: none";
    // const blob = new Blob([res], { type: 'application/pdf' });
    // const url = window.URL.createObjectURL(blob);
    // a.href = url;
    // a.download = fileName;
    // a.click();
    // window.URL.revokeObjectURL(url);
  }



}

