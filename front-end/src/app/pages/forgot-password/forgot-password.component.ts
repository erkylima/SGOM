import {Component, OnDestroy, OnInit, Renderer2} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import {AppService} from 'src/app/utils/services/app.service';

@Component({
    selector: 'app-forgot-password',
    templateUrl: './forgot-password.component.html',
    styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit, OnDestroy {
    public forgotPasswordForm: FormGroup;
    public isAuthLoading = false;

    constructor(
        private renderer: Renderer2,
        private toastr: ToastrService,
        private appService: AppService
    ) {}

    ngOnInit(): void {
        this.renderer.addClass(
            document.querySelector('app-root'),
            'login-page'
        );
        this.forgotPasswordForm = new FormGroup({
            email: new FormControl(null, Validators.required),
            cnpj: new FormControl(null, Validators.required),
            novaSenha: new FormControl(null, Validators.required)
        });
    }

    forgotPassword() {
        if (this.forgotPasswordForm.valid) {
          this.appService.recover(this.forgotPasswordForm.value);
        } else {
            this.toastr.error('Preencha todos os campos!');
        }
    }

    ngOnDestroy(): void {
        this.renderer.removeClass(
            document.querySelector('app-root'),
            'login-page'
        );
    }
}
