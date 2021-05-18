import { Empresa } from './../empresa.model';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { EmpresaService } from '../empresa.service';
import { Component, OnInit, Renderer2 } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-empresa',
  templateUrl: './edit-empresa.component.html',
  styleUrls: ['./edit-empresa.component.scss']
})
export class EditEmpresaComponent implements OnInit {

  public editEmpresaForm: FormGroup;
  public isAuthLoading = false;
  id:string;
  empresa:Empresa;

  constructor(
    private renderer: Renderer2,
    private toastr: ToastrService,
    private empresaService: EmpresaService,
    private route: ActivatedRoute
) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');

    this.empresaService.getEmpresaFunction(this.id).subscribe(res=>{

      this.empresa = new Empresa(res.id,res.nome,res['cnpj']);
    }
    );
    this.editEmpresaForm = new FormGroup({
      id: new FormControl(null),
    nome: new FormControl(null, Validators.required),
    cnpj: new FormControl(null, Validators.required)
  });
  }

  update() {
    if (this.editEmpresaForm.valid) {
        this.isAuthLoading = true;
        this.editEmpresaForm.value.id=this.id;
        this.empresaService.update(this.editEmpresaForm.value);
        this.isAuthLoading = false;
    } else {
        this.toastr.error('Algo deu errado!', 'Por favor, tente novamente!');
    }
}


}
