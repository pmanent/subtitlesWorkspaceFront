import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SeriesService {
  private donwloadFileUrl = 'http://localhost:9000/donwloadFile/1955842718?fileName=Final.Space.S01E01.Chapter 1.1080p.WEB-DL.H.264-PUFO.HI.srt';  // URL to web api
  constructor(private http: HttpClient) { }
  
  
  donwloadFile (): Observable<any> {
    return this.http.get<any>(this.donwloadFileUrl)
      .pipe(
        catchError(this.handleError('donwloadFile', []))
      );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
