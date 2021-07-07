import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {Observable} from 'rxjs';
import {Empresa} from '../blank/empresa.model';
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
    empresa: Empresa;
    authorities: [{authority}];
    role = localStorage.getItem('role');

    roleAdmin() {
        return this.role == 'ROLE_ADMIN';
    }
    roleUser() {
        return this.role == 'ROLE_USER';
    }
    roleOficina() {
        return this.role == 'ROLE_OFICINA';
    }

    async adicionarEditarUsuario({
        id,
        nome,
        usuario,
        email,
        senha,
        authorities,
        empresa_id
    }) {
        try {
            this.empresa = new Empresa(
                empresa_id,
                null,
                null,
                null,
                null,
                null
            );
            this.usuarioInfo = new Usuario(
                id,
                this.empresa,
                nome,
                usuario,
                email,
                senha,
                null
            );

            await this.adicionarEditarUsuarioFunction(
                this.usuarioInfo
            ).subscribe(
                (data) => {
                    this.toastr.success('Usuario criado com sucesso!');

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

    async update({id, nome, usuario, email, senha, authorities, empresa_id}) {
        try {
            this.empresa = new Empresa(
                empresa_id,
                null,
                null,
                null,
                null,
                null
            );

            this.usuarioInfo = new Usuario(
                id,
                this.empresa,
                nome,
                usuario,
                email,
                senha,
                null
            );

            console.log(this.usuarioInfo);

            await this.updateUsuarioFunction(id, this.usuarioInfo).subscribe(
                (data) => {
                    this.toastr.success('Usuario atualizado com sucesso!');

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
        if (this.roleAdmin()) {
            return this.http.get<Usuario>(
                this.urlUsuarios + '/rolelist/ROLE_ADMIN',
                httpOptions
            );
        } else {
            return this.http.get<Usuario>(
                this.urlUsuarios +
                    '/list/' +
                    localStorage.getItem('empresa_id'),
                httpOptions
            );
        }
    }
    getUsuarioFunction(id: string): Observable<Usuario> {
        return this.http.get<Usuario>(this.urlUsuarios + '/' + id, httpOptions);
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
