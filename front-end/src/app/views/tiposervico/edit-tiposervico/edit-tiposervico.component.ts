import { TipoServico } from '../tiposervico.model';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { TipoServicoService } from '../tiposervico.service';
import { Component, OnInit, Renderer2 } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-tiposervico',
  templateUrl: './edit-tiposervico.component.html',
  styleUrls: ['./edit-tiposervico.component.scss']
})
export class EditTipoServicoComponent implements OnInit {

  public editTipoServicoForm: FormGroup;
  public isAuthLoading = false;
  id:string;
  tiposervico:TipoServico;

  constructor(
    private renderer: Renderer2,
    private toastr: ToastrService,
    private tiposervicoService: TipoServicoService,
    private route: ActivatedRoute
) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');

    this.tiposervicoService.getTipoServicoFunction(this.id).subscribe(res=>{

      this.tiposervico = new TipoServico(res.id,res.nome,res['descricao']);
    }
    );
    this.editTipoServicoForm = new FormGroup({
      id: new FormControl(null),
    nome: new FormControl(null, Validators.required),
    descricao: new FormControl(null, Validators.required)
  });
  }

  update() {
    if (this.editTipoServicoForm.valid) {
        this.isAuthLoading = true;
        this.editTipoServicoForm.value.id=this.id;
        this.tiposervicoService.update(this.editTipoServicoForm.value);
        this.isAuthLoading = false;
    } else {
        this.toastr.error('Algo deu errado!', 'Por favor, tente novamente!');
    }
}


}
