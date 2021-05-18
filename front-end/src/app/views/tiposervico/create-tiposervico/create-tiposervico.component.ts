import { ToastrService } from 'ngx-toastr';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { TipoServicoService } from '../tiposervico.service';
import { TipoServico } from '../tiposervico.model';
import { Component, OnInit, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-create-tiposervico',
  templateUrl: './create-tiposervico.component.html',
  styleUrls: ['./create-tiposervico.component.scss']
})
export class CreateTipoServicoComponent implements OnInit {

  public criarTipoServicoForm: FormGroup;
  public isAuthLoading = false;

  constructor(
    private renderer: Renderer2,
    private toastr: ToastrService,
    private tiposervicoService: TipoServicoService
) { }

  ngOnInit(): void {
    this.criarTipoServicoForm = new FormGroup({
      nome: new FormControl(null, Validators.required),
      descricao: new FormControl(null, Validators.required)
  });
  }

  save() {
    if (this.criarTipoServicoForm.valid) {
        this.isAuthLoading = true;
        this.tiposervicoService.adicionarEditarTipoServico(this.criarTipoServicoForm.value);
        this.isAuthLoading = false;
    } else {
        this.toastr.error('Algo deu errado!', 'Por favor, tente novamente!');
    }
}


}
