import { TipoServico } from './../tiposervico/tiposervico.model';
import { Procedimento } from './procedimento.model';
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
export class ProcedimentoService {
    private urlProcedimentos = 'http://localhost:8080/procedimentos';
    constructor(
        private router: Router,
        private toastr: ToastrService,
        private http: HttpClient
    ) {}

    procedimentoInfo: Procedimento;

    async adicionarEditarProcedimento({id, tiposervico, ordem, nome}) {
        try {
            this.procedimentoInfo = new Procedimento(id, tiposervico, ordem, nome);
            console.log(this.procedimentoInfo);

            await this.adicionarEditarProcedimentoFunction(this.procedimentoInfo).subscribe(
                (data) => {
                    this.toastr.success('Procedimento criada com sucesso!');

                    this.router.navigate(['/procedimento']);
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

    async update({id, tiposervico, ordem, nome}) {
        try {

            this.procedimentoInfo = new Procedimento(id, tiposervico, ordem, nome);
            console.log(this.procedimentoInfo);

            await this.updateProcedimentoFunction(id, this.procedimentoInfo).subscribe(
                (data) => {
                    this.toastr.success('Procedimento atualizada com sucesso!');

                    this.router.navigate(['/procedimento']);
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

    getProcedimentos(): Observable<Procedimento> {
        return this.http.get<Procedimento>(
            this.urlProcedimentos + '/' + 1 + '/list',
            httpOptions
        );
    }
    getProcedimentoFunction(id: string): Observable<Procedimento> {
        return this.http.get<Procedimento>(this.urlProcedimentos + '/' + id, httpOptions);
    }
    updateProcedimentoFunction(id: string, info: Procedimento): Observable<Procedimento> {
        return this.http.put<Procedimento>(
            this.urlProcedimentos + '/' + id,
            info,
            httpOptions
        );
    }
    adicionarEditarProcedimentoFunction(info: Procedimento): Observable<string> {
        return this.http.post<string>(
            this.urlProcedimentos + '/add',
            info,
            httpOptions
        );
    }
    delete(id:string):Observable<string>{
      return this.http.delete<string>(this.urlProcedimentos+"/"+id, httpOptions);
    }
}
