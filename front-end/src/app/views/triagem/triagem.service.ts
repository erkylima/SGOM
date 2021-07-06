import { Triagem } from './triagem.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { Carro } from '../carro/carro.model';
import { TipoServico } from '../tiposervico/tiposervico.model';

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
    ) { }

    triagemInfo: Triagem;
    carro: Carro;
    tiposervico: TipoServico;
    async adicionarEditarTriagem({ id, id_carro, id_tiposervico, preco }) {
        try {
            this.carro = new Carro(id_carro, null, null, null, null, null);
            this.tiposervico = new TipoServico(id_tiposervico, null, null);
            this.triagemInfo = new Triagem(id, this.carro, this.tiposervico, preco);

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

    async update({id, id_carro, id_tiposervico, preco }) {
        try {
            this.carro = new Carro(id_carro, null, null, null, null, null);
            this.tiposervico = new TipoServico(id_tiposervico, null, null);
            this.triagemInfo = new Triagem(id, this.carro, this.tiposervico, preco);
            
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

    getTriagems(carro: string): Observable<Triagem> {
        return this.http.get<Triagem>(this.urlTriagems + '/' + carro + '/list', httpOptions);
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
