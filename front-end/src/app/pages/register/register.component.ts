import {Component, OnInit, Renderer2, OnDestroy} from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {AppService} from 'src/app/utils/services/app.service';
import {ToastrService} from 'ngx-toastr';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit, OnDestroy {
    public registerForm: FormGroup;
    constructor(
        private renderer: Renderer2,
        private toastr: ToastrService,
        private appService: AppService
    ) {}

    ngOnInit() {
        this.renderer.addClass(
            document.querySelector('app-root'),
            'register-page'
        );
        this.registerForm = new FormGroup({
            nome: new FormControl(null, Validators.required),
            cnpj: new FormControl(null,),
            usuario: new FormControl(null, Validators.required),
            email: new FormControl(null, Validators.required),
            password: new FormControl(null, [
                Validators.required,
            ]),
            retypePassword: new FormControl(null, [
                Validators.required,
            ])
        });
    }

    register() {
        if (this.registerForm.valid) {
            this.appService.register(this.registerForm.value);
        } else {
            this.toastr.error('Você precisa preencher todos os campos. OPS: CNPJ Opcional');
        }
    }

    ngOnDestroy() {
        this.renderer.removeClass(
            document.querySelector('app-root'),
            'register-page'
        );
    }
}
