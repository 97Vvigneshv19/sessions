import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaderResponse, HttpHeaders} from '@angular/common/http';

import{Observable} from 'rxjs';
//import 'rxjs/add/operator/map';
import {map} from 'rxjs/operators';

// @Injectable({
//   providedIn:'root'
// })

@Injectable()
export class AuthenticationService {

  constructor(private http:HttpClient) { }

    authenticateUser(data){
         return this.http.post('http://localhost:3000/auth/v1',data);
    }


  setBearer(token){
    localStorage.setItem('myToken',token);
    }
    getBearerToken(){
      return localStorage.getItem('myToken');
    }

 isUserAuthenticated(token):Promise<boolean>{
      return this.http.post('http://localhost:3000/auth/v1/isAuthenticated',{},{
        headers : new HttpHeaders()
        .set('Authorization',`Bearer ${token}`)
        })
      .pipe(map((res)=> res['isAuthenticated']))
      .toPromise();
    }
}
