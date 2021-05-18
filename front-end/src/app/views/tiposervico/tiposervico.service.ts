import { TipoServico } from './tiposervico.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization':'Bearer '+ localStorage['token']})
};

@Injectable({
    providedIn: 'root'
})
export class TipoServicoService {
  private urlTipoServicos = 'http://localhost:8080/tiposervicos';
  constructor(private router: Router, private toastr: ToastrService, private http:HttpClient) {}

  tiposervicoInfo: TipoServico;

  async adicionarEditarTipoServico({id, nome, descricao}) {
    try {
      this.tiposervicoInfo = new TipoServico(
        id,
        nome,
        descricao);
        console.log(this.tiposervicoInfo);


        await this.adicionarEditarTipoServicoFunction(this.tiposervicoInfo).subscribe((data) => {
          this.toastr.success("TipoServico criada com sucesso!");

        this.router.navigate(['/tiposervico']);

      },
      (error) => {
        this.toastr.error("Informações de acesso incorretas. Tente novamente");
        // get the status as error.status
     });

    } catch (error) {
        this.toastr.error(error.message);
    }
  }

  async update({id,nome,descricao}){
    try {
      this.tiposervicoInfo = new TipoServico(
        id,
        nome,
        descricao);
        console.log(this.tiposervicoInfo);


      await this.updateTipoServicoFunction(id,this.tiposervicoInfo).subscribe((data) => {
        this.toastr.success("TipoServico atualizada com sucesso!");

      this.router.navigate(['/tiposervico']);

      },
      (error) => {
        this.toastr.error("Informações de acesso incorretas. Tente novamente");
        // get the status as error.status
      });

      } catch (error) {
          this.toastr.error(error.message);
      }
  }

  getTipoServicos():Observable<TipoServico>{
    return this.http.get<TipoServico>(this.urlTipoServicos+'/list', httpOptions);
  }
  getTipoServicoFunction(id:string):Observable<TipoServico>{
    return this.http.get<TipoServico>(this.urlTipoServicos+"/"+id, httpOptions);
  }
  updateTipoServicoFunction(id:string, info:TipoServico): Observable<TipoServico>{
    return this.http.put<TipoServico>(this.urlTipoServicos+'/'+id, info, httpOptions);
  }
  adicionarEditarTipoServicoFunction(info: TipoServico): Observable<string> {
    return this.http.post<string>(this.urlTipoServicos+'/add', info, httpOptions);
  }
  delete(id:string):Observable<string>{
    return this.http.delete<string>(this.urlTipoServicos+"/"+id, httpOptions);
  }

}
