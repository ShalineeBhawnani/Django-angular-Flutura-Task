import { Injectable } from '@angular/core';
import { HttpClient,HttpResponse,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  baseUrl = environment.baseUrl;
  httpHeaders = new HttpHeaders({'Content-type': 'application/json'})

  constructor(private http: HttpClient) { }
  
getAllCategory():Observable<any>
{
  return this.http.get(this.baseUrl+'/category/')
}
getAllProduct():Observable<any>
{
  return this.http.get(this.baseUrl+'/product/')

  }
getAllSelectedProduct(category):Observable<any>
  {
    return this.http.get(this.baseUrl+'/product/'+category+'/',)
  
  }
getAllCartProduct():Observable<any>
{
  return this.http.get(this.baseUrl+'/cart/')

  }
categoryList(subcategory):Observable<any>
  {
  return this.http.get(this.baseUrl+'/subcategory/'+subcategory+'/',)
  }
addProductToCart(productItem): Observable<any>
{
  return this.http.post(this.baseUrl+'/add_to_cart/'+productItem+'/',{
    responseType: 'text',
  });

}
// addProductToCart(productItem):Observable<any>
// {

//       console.log(localStorage.getItem('token'))
//       return this.http.post(this.baseUrl+'/cart/', productItem, { headers: {
//         'token': localStorage.getItem('token')
//       } });
//     }
// }
}