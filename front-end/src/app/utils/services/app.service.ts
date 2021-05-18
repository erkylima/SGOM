import {RecoverInfo} from './../auth/recover-info';
import {SignUpInfo} from './../auth/signup-info';
import {AuthLoginInfo} from './../auth/login-info';
import {JwtResponse} from './../auth/jwt-response';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {Observable} from 'rxjs';

const httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
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

    constructor(
        private router: Router,
        private toastr: ToastrService,
        private http: HttpClient
    ) {}
    private loginUrl = 'http://localhost:8080/api/auth/signin';
    private signupUrl = 'http://localhost:8080/api/auth/signup';
    private recoverUrl = 'http://localhost:8080/api/auth/passrecovery';

    signupInfo: SignUpInfo;
    recoverInfo: RecoverInfo;
    isSignedUp = false;
    isSignUpFailed = false;
    errorMessage = '';

    async login({username, password}) {
        try {
            this.attemptAuth({username, password}).subscribe(
                (data) => {
                    if (data['accessToken']) {
                        const token = data['accessToken'];
                        const nome = data['nome'];
                        const empresa_id = data['empresaId'];
                        this.toastr.success('Boa, garot@!');
                        localStorage.setItem('token', token);
                        localStorage.setItem('nome', nome);
                        localStorage.setItem('empresa_id', empresa_id);
                        console.log('token: ' + token);
                        this.router.navigate(['/']);
                    } else {
                        this.toastr.error(
                            'Informações de acesso incorretas. Tente novamente'
                        );
                    }
                },
                (error) => {
                    this.toastr.error(
                        'Informações de acesso incorretas. Tente novamente'
                    );
                    // get the status as error.status
                }
            );
        } catch (error) {
            this.toastr.error(error.message);
        }
    }

    async recover({email, cnpj, novaSenha}) {
        try {
            this.recoverInfo = new RecoverInfo(email, cnpj, novaSenha);

            this.attemptRecover(this.recoverInfo).subscribe(
                (data) => {
                    this.toastr.success('Senha modificada com sucesso!');
                },
                (error) => {
                    this.toastr.error(
                        'Informações de acesso incorretas. Tente novamente'
                    );
                    // get the status as error.status
                }
            );
        } catch (error) {
            this.toastr.error(error.message);
        }
    }

    async register({nome, cnpj, usuario, email, password}) {
        try {
            this.signupInfo = new SignUpInfo(
                nome,
                cnpj,
                usuario,
                email,
                password
            );

            this.signUp(this.signupInfo).subscribe(
                (data) => {
                    this.toastr.success('Conta criada com sucesso!');
                    console.log(data);
                    this.isSignedUp = true;
                    this.isSignUpFailed = false;
                },
                (error) => {
                    console.log(error);
                    this.errorMessage = error.error.message;
                    this.isSignUpFailed = true;
                }
            );
            console.log(nome + cnpj + usuario, email, password);
            // localStorage.setItem('token', token);
            this.router.navigate(['/']);
        } catch (error) {
            this.toastr.error(error.message);
        }
    }

    attemptAuth(credentials: AuthLoginInfo): Observable<JwtResponse> {
        return this.http.post<JwtResponse>(
            this.loginUrl,
            credentials,
            httpOptions
        );
    }

    signUp(info: SignUpInfo): Observable<string> {
        return this.http.post<string>(this.signupUrl, info, httpOptions);
    }

    attemptRecover(info: RecoverInfo): Observable<string> {
        return this.http.post<string>(this.recoverUrl, info, httpOptions);
    }

    logout() {
        localStorage.removeItem('token');
        this.router.navigate(['/login']);
    }
}
