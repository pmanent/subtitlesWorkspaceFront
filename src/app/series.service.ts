import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SeriesService {
  private donwloadFileUrl = 'https://subtitlesrestapi.herokuapp.com/donwloadFile/';  // URL to web api
  private searchSubtitleURL='https://subtitlesrestapi.herokuapp.com/searchSubtitles'


  constructor(private http: HttpClient) { }

  searchSubtitle (query,season,episode,lang): Observable<any> {
    console.log(query);
    const params = new HttpParams()
      .set('query', query)
      .set('season', season)
      .set('episode', episode)
      .set('language', lang);
      
    return this.http.get<any>(this.searchSubtitleURL, { params: params })
      .pipe(
        catchError(this.handleError('searchSubtitle', []))
      );
  }

  downloadFile (subtitleFileId,fileName): Observable<any> {
    const params = new HttpParams()
      .set('fileName', fileName);
    return this.http.get<any>(this.donwloadFileUrl+subtitleFileId,{ params: params })
      .pipe(
        catchError(this.handleError('donwloadFile', []))
      );
  }
  downloadFile2(subtitleFileId,fileName){
    let url= this.donwloadFileUrl+subtitleFileId+'?fileName='+fileName;
    window.location.href=url;

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
