import { Injectable } from '@angular/core';
import { HttpClient,HttpResponse,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseUrl = environment.baseUrl;
  httpHeaders = new HttpHeaders({'Content-type': 'application/json'})

  constructor(private http: HttpClient) { }

  login(username: string, password: string) 
  {
    return this.http.post<any>(this.baseUrl+'/login/', { username: username, password: password })
      .pipe(map(user => {
          console.log("user token check",user.token)
          if (user & user.token) {
              console.log("token saved",user.token)
              localStorage.setItem('token', user.token);
          }
          else {console.log("user token not found")}

          return user;
      }));
  }

  register(userData): Observable<any>
  {
    return this.http.post(this.baseUrl+'/registration/',userData,{
      responseType: 'text',
    });

  }
}

