import {Empresa} from './empresa.model';
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
export class EmpresaService {
    private urlEmpresas = 'http://localhost:8080/empresas';
    constructor(
        private router: Router,
        private toastr: ToastrService,
        private http: HttpClient
    ) {}

    empresaInfo: Empresa;

    async adicionarEditarEmpresa({id, nome, cnpj, usuario, email, senha}) {
        try {
            this.empresaInfo = new Empresa(
                id,
                nome,
                cnpj,
                usuario,
                email,
                senha
            );
            console.log(this.empresaInfo);

            await this.adicionarEditarEmpresaFunction(
                this.empresaInfo
            ).subscribe(
                (data) => {
                    this.toastr.success('Empresa criada com sucesso!');

                    this.router.navigate(['/empresa']);
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
            this.empresaInfo = new Empresa(
                id,
                nome,
                cnpj,
                usuario,
                email,
                senha
            );
            console.log(this.empresaInfo);

            await this.updateEmpresaFunction(id, this.empresaInfo).subscribe(
                (data) => {
                    this.toastr.success('Empresa atualizada com sucesso!');

                    if (
                        localStorage.getItem('nome').toString() ===
                        this.empresaInfo.nome
                    ) {
                        localStorage.removeItem('nome');
                        console.log(localStorage.getItem('nome'));
                        localStorage.setItem('nome', nome);

                        localStorage.getItem('nome');
                    }

                    console.log(
                        localStorage.getItem('nome').toString() ===
                            this.empresaInfo.nome
                    );
                    this.router.navigate(['/empresa']);
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

    getEmpresas(): Observable<Empresa> {
        console.log(localStorage['token']);
        return this.http.get<Empresa>(this.urlEmpresas + '/list', httpOptions);
    }
    getEmpresaFunction(id: string): Observable<Usuario> {
        return this.http.get<Usuario>(
            this.urlEmpresas + '/' + id + '/user',
            httpOptions
        );
    }
    updateEmpresaFunction(id: string, info: Empresa): Observable<Empresa> {
        return this.http.put<Empresa>(
            this.urlEmpresas + '/' + id,
            info,
            httpOptions
        );
    }
    adicionarEditarEmpresaFunction(info: Empresa): Observable<string> {
        return this.http.post<string>(
            this.urlEmpresas + '/add',
            info,
            httpOptions
        );
    }
    delete(id: string): Observable<string> {
        return this.http.delete<string>(
            this.urlEmpresas + '/' + id,
            httpOptions
        );
    }
}
