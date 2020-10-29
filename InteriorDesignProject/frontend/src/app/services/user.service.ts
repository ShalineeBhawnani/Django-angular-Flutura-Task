import { Injectable } from '@angular/core';
import { HttpClient,HttpEvent,HttpEventType,HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import {  catchError,map  } from 'rxjs/operators/'; 


@Injectable({
  providedIn: 'root'
})
export class UserService {
  
    baseUrl = environment.baseUrl;
    httpHeaders = new HttpHeaders({'Content-type': 'application/json'})
  
    constructor(private http: HttpClient) { }
    private errorHandler(errorResponse: HttpErrorResponse){
      if(errorResponse.error instanceof ErrorEvent)
      {
        console.error("client side error:", errorResponse.error.message);
      }
      else {
      console.error("sever side error:", errorResponse);      
      }       
      return throwError('there is problem with service, please try again later');
    }
  getUserInfo():Observable<any>
  {
    return this.http.get(this.baseUrl+'/user/')
                        .pipe(catchError(this.errorHandler));
  }
  register(userData): Observable<any>
  {
    return this.http.post(this.baseUrl+'/form/',userData,{
      responseType: 'text',
    });

  }
  getProperty():Observable<any>
  {
    return this.http.get(this.baseUrl+'/property/').pipe(catchError(this.errorHandler));
  }
  
  getAllSelectedProduct(property):Observable<any>
  {
    return this.http.get(this.baseUrl+'/product/'+property+'/',).pipe(catchError(this.errorHandler));
  
  }
  getAllProduct():Observable<any>
  {
    return this.http.get(this.baseUrl+'/form/',).pipe(catchError(this.errorHandler));
  
  }
  getData():Observable<any>
  {
    return this.http.get(this.baseUrl+'/data/',).pipe(catchError(this.errorHandler));
}

getPassengerData(data):Observable<any>
{
  return this.http.get(this.baseUrl+'/getArivalDepatureData/'+data+'/',).pipe(catchError(this.errorHandler));
}
// HttpUploadOptions = new HttpHeaders({
// 'content-type': 'multipart/form-data',
// });

getYearValue(data):Observable<any>
{
  return this.http.get(this.baseUrl+'/getYearValueData/'+data+'/',).pipe(catchError(this.errorHandler));
}
fileUploadService(data): Observable<any>
{
  return this.http.post(this.baseUrl+'/upload/',data,{
    responseType: 'text',
  //   reportProgress: true,
  //   observe: 'events'
  // }).pipe(map((event) => {

  //   switch (event.type) {

  //     case HttpEventType.UploadProgress:
  //       const progress = Math.round(100 * event.loaded / event.total);
  //       return { status: 'progress', message: progress };

  //     case HttpEventType.Response:
  //       return event.body;
  //     default:
  //       return `Unhandled event: ${event.type}`;
  //   }
  // })
  // );
   } );
}
}