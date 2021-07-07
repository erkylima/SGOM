import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {Observable} from 'rxjs';
import {Usuario} from '../profile/usuario.model';

const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage['token']
    })
};

@Injectable({
    providedIn: 'root'
})
export class UsuarioService {
    private urlUsuarios = 'http://localhost:8080/usuarios';
    constructor(
        private router: Router,
        private toastr: ToastrService,
        private http: HttpClient
    ) {}

    usuarioInfo: Usuario;

    async adicionarEditarUsuario({id, nome, cnpj, usuario, email, senha}) {
        try {
            this.usuarioInfo = new Usuario(
                id,
                nome,
                cnpj,
                usuario,
                email,
                senha
            );
            console.log(this.usuarioInfo);

            await this.adicionarEditarUsuarioFunction(
                this.usuarioInfo
            ).subscribe(
                (data) => {
                    this.toastr.success('Usuario criada com sucesso!');

                    this.router.navigate(['/usuario']);
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

    async update({id, nome, cnpj, usuario, email, senha}) {
        try {
            this.usuarioInfo = new Usuario(
                id,
                nome,
                cnpj,
                usuario,
                email,
                senha
            );
            console.log(this.usuarioInfo);

            await this.updateUsuarioFunction(id, this.usuarioInfo).subscribe(
                (data) => {
                    this.toastr.success('Usuario atualizada com sucesso!');

                    if (
                        localStorage.getItem('nome').toString() ===
                        this.usuarioInfo.nome
                    ) {
                        localStorage.removeItem('nome');
                        console.log(localStorage.getItem('nome'));
                        localStorage.setItem('nome', nome);

                        localStorage.getItem('nome');
                    }

                    console.log(
                        localStorage.getItem('nome').toString() ===
                            this.usuarioInfo.nome
                    );
                    this.router.navigate(['/usuario']);
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

    getUsuarios(): Observable<Usuario> {
        console.log(localStorage['token']);
        return this.http.get<Usuario>(this.urlUsuarios + '/list', httpOptions);
    }
    getUsuarioFunction(id: string): Observable<Usuario> {
        return this.http.get<Usuario>(
            this.urlUsuarios + '/' + id + '/user',
            httpOptions
        );
    }
    updateUsuarioFunction(id: string, info: Usuario): Observable<Usuario> {
        return this.http.put<Usuario>(
            this.urlUsuarios + '/' + id,
            info,
            httpOptions
        );
    }
    adicionarEditarUsuarioFunction(info: Usuario): Observable<string> {
        return this.http.post<string>(
            this.urlUsuarios + '/add',
            info,
            httpOptions
        );
    }
    delete(id: string): Observable<string> {
        return this.http.delete<string>(
            this.urlUsuarios + '/' + id,
            httpOptions
        );
    }
}
