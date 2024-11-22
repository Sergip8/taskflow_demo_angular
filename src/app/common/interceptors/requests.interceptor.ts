import {inject, Injectable} from "@angular/core";
import {HttpEvent, HttpHandler, HttpInterceptor, HttpInterceptorFn, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";


import { Token } from "@angular/compiler";
import { environment } from "../../environments/environment.development";
import { AuthService } from "../../components/public/auth/auth.service";
import { Router } from "@angular/router";

@Injectable()

export class RequestsInterceptor implements HttpInterceptor {
    constructor() {
    }
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const requestUrl: string = environment.apiUrl + request.url;
        const authToken = localStorage.getItem("token")
        console.log(authToken)

        if(authToken) {
            request = request.clone({
                headers: request.headers.set('Authorization', 'Bearer ' + authToken)
            });
        }

        request = request.clone({ url: requestUrl });

        return next.handle(request);
    }
}

export const interceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService)
  const router: Router = inject(Router);
  const authToken = authService.getToken()
  
  const epochDate = Date.now() / 1000
  const expDate = authService.getTokenDate()
  console.log(expDate)
  console.log(epochDate)
  console.log(expDate> epochDate)
    if(authToken != null && expDate> epochDate){
      const authReq = req.clone({
        setHeaders: {
          Authorization: `Bearer ${authToken}`
        }
      });

      // Pass the cloned request with the updated header to the next handler
      return next(authReq);

  }

    
    else{
      
      return next(req.clone({}))
    }
    // Clone the request and add the authorization header
  };
