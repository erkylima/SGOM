import {Empresa} from './../blank/empresa.model';
import {Carro} from './carro.model';
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
export class CarroService {
    private urlCarros = 'http://localhost:8080/carros';
    constructor(
        private router: Router,
        private toastr: ToastrService,
        private http: HttpClient
    ) {}

    carroInfo: Carro;

    async adicionarEditarCarro({id, empresa, modelo, placa, ano, marca}) {
        try {
            this.carroInfo = new Carro(id, empresa, modelo, placa, ano, marca);
            console.log(this.carroInfo);

            await this.adicionarEditarCarroFunction(this.carroInfo).subscribe(
                (data) => {
                    this.toastr.success('Carro criada com sucesso!');

                    this.router.navigate(['/carro']);
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

    async update({id, empresa, modelo, placa, ano, marca}) {
        try {
            const id_emp = localStorage.getItem('empresa_id').toString();

            this.carroInfo = new Carro(id, empresa, modelo, placa, ano, marca);
            console.log(this.carroInfo);

            await this.updateCarroFunction(id, this.carroInfo).subscribe(
                (data) => {
                    this.toastr.success('Carro atualizada com sucesso!');

                    this.router.navigate(['/carro']);
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

    getCarros(): Observable<Carro> {
        return this.http.get<Carro>(
            this.urlCarros + '/' + localStorage.getItem('empresa_id') + '/list',
            httpOptions
        );
    }
    getCarroFunction(id: string): Observable<Carro> {
        return this.http.get<Carro>(this.urlCarros + '/' + id, httpOptions);
    }
    updateCarroFunction(id: string, info: Carro): Observable<Carro> {
        return this.http.put<Carro>(
            this.urlCarros + '/' + id,
            info,
            httpOptions
        );
    }
    adicionarEditarCarroFunction(info: Carro): Observable<string> {
        return this.http.post<string>(
            this.urlCarros + '/add',
            info,
            httpOptions
        );
    }
}
