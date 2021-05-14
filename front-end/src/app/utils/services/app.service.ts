import { SignUpInfo } from './../auth/signup-info';
import { AuthLoginInfo } from './../auth/login-info';
import { JwtResponse } from './../auth/jwt-response';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
    providedIn: 'root'
})
export class AppService {
    public user = {
        firstName: 'Alexander',
        lastName: 'Pierce',
        image: 'assets/img/user2-160x160.jpg'
    };

    constructor(private router: Router, private toastr: ToastrService, private http:HttpClient) {}
    private loginUrl = 'http://localhost:8080/api/auth/signin';
    private signupUrl = 'http://localhost:8080/api/auth/signup';

    async login({username, password}) {
        try {
          this.attemptAuth({username,password}).subscribe((data) => {
            if (data['accessToken']) {
              const token = data['accessToken'];
              const nome = data['nome'];
              this.toastr.success("boa");
              localStorage.setItem('token', token);
              localStorage.setItem('nome', nome);
              this.router.navigate(['/']);
          } else {
            this.toastr.error("Informações de acesso incorretas. Tente novamente");
          }
          },
          (error) => {
            this.toastr.error("Informações de acesso incorretas. Tente novamente");
            // get the status as error.status
         });

        } catch (error) {
            this.toastr.error(error.message);
        }
    }

    async register({email, password}) {
        try {


            // localStorage.setItem('token', token);
            this.router.navigate(['/']);
        } catch (error) {
            this.toastr.error(error.message);
        }
    }

    attemptAuth(credentials: AuthLoginInfo): Observable<JwtResponse> {
      return this.http.post<JwtResponse>(this.loginUrl, credentials, httpOptions);
    }

    signUp(info: SignUpInfo): Observable<string> {
      return this.http.post<string>(this.signupUrl, info, httpOptions);
    }

    logout() {
        localStorage.removeItem('token');
        this.router.navigate(['/login']);
    }
}
