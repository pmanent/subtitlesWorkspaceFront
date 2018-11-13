import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {

  constructor() { }

  generateAuthorization(){
    //'Authorization': 'Basic '+window.btoa("user:password"),
    let authorization = 'Basic '+window.btoa("user:password");
    return authorization;

  }
}
