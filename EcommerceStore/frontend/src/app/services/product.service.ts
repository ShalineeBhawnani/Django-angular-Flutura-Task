import { Injectable } from '@angular/core';
import { HttpClient,HttpParams,HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ProductService
{
  baseUrl = environment.baseUrl;
  httpHeaders = new HttpHeaders({'Content-type': 'application/json'})

  constructor(private http: HttpClient) { }
  private errorHandler(errorResponse: HttpErrorResponse)
  {
    if(errorResponse.error instanceof ErrorEvent)
    {
      console.error("client side error:", errorResponse.error.message);
    }
    else 
    {
      console.error("sever side error:", errorResponse);      
    }       
    return throwError('there is problem with service, please try again later');
  }

  registerProduct(productData): Observable<any>
  {
    return this.http.post(this.baseUrl+'/getSetProduct/',productData,
    {
      responseType: 'text',
    });

  }
  getAllCategory():Observable<any>
  {
    return this.http.get(this.baseUrl+'/category/')
  }
  getSelectedProduct(category,start,end):Observable<any>
  {
    return this.http.get(this.baseUrl+'/getSetProduct/'+category+'/',{params: {"start": start,"end":end}})
  }
}

