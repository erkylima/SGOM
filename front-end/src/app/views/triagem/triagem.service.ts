import {Triagem} from './triagem.model';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {Observable} from 'rxjs';

const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage['token']
    })
};

@Injectable({
    providedIn: 'root'
})
export class TriagemService {
    private urlTriagems = 'http://localhost:8080/servicos';
    constructor(
        private router: Router,
        private toastr: ToastrService,
        private http: HttpClient
    ) {}

    triagemInfo: Triagem;

    async adicionarEditarTriagem({id, nome, descricao}) {
        try {
            this.triagemInfo = new Triagem(id, nome, descricao);
            console.log(this.triagemInfo);

            await this.adicionarEditarTriagemFunction(
                this.triagemInfo
            ).subscribe(
                (data) => {
                    this.toastr.success('Triagem criada com sucesso!');

                    this.router.navigate(['/triagem']);
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

    async update({id, nome, descricao}) {
        try {
            this.triagemInfo = new Triagem(id, nome, descricao);
            console.log(this.triagemInfo);

            await this.updateTriagemFunction(id, this.triagemInfo).subscribe(
                (data) => {
                    this.toastr.success('Triagem atualizada com sucesso!');

                    this.router.navigate(['/triagem']);
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

    getTriagems(): Observable<Triagem> {
        return this.http.get<Triagem>(this.urlTriagems + '/list', httpOptions);
    }
    getTriagemFunction(id: string): Observable<Triagem> {
        return this.http.get<Triagem>(this.urlTriagems + '/' + id, httpOptions);
    }
    updateTriagemFunction(id: string, info: Triagem): Observable<Triagem> {
        return this.http.put<Triagem>(
            this.urlTriagems + '/' + id,
            info,
            httpOptions
        );
    }
    adicionarEditarTriagemFunction(info: Triagem): Observable<string> {
        return this.http.post<string>(
            this.urlTriagems + '/add',
            info,
            httpOptions
        );
    }
    delete(id: string): Observable<string> {
        return this.http.delete<string>(
            this.urlTriagems + '/' + id,
            httpOptions
        );
    }
}
