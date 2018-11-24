import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SeriesService {
  
  private baseUrl = 'https://subtitlesrestapi.herokuapp.com';  // URL to web api
  private donwloadFileUrl = 'donwloadFile';  // URL to web api
  private searchSubtitleURL='searchSubtitles';
  private downloadSubtitleURL = 'donwloadSubtitle';
  
  constructor(private http: HttpClient) {
    //this.baseUrl = 'http://localhost:9000';
  }

  searchSubtitle (query,season,episode,lang): Observable<any> {
    const params = new HttpParams()
      .set('query', query)
      .set('season', season)
      .set('episode', episode)
      .set('language', lang);
      
    return this.http.get<any>(this.baseUrl+'/'+this.searchSubtitleURL, { params: params})
      .pipe(
        catchError(this.handleError('searchSubtitle', []))
      );
  }

  downloadFile2(subtitleFileId,fileName){
    let url= this.baseUrl+'/'+this.donwloadFileUrl+'/'+subtitleFileId+'?fileName='+fileName;
    window.location.href=url;

  }

  downloadSubtitle (subtitleFileId): Observable<any> {  
    const params = new HttpParams()
      .set('id', subtitleFileId);
    return this.http.get<any>(this.baseUrl+'/'+this.downloadSubtitleURL,{ params: params })
      .pipe(
        catchError(this.handleError('downloadSubtitle', []))
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
