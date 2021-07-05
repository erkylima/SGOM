import {Empresa} from '../blank/empresa.model';

export class Usuario {
    id: number;
    empresa: Empresa;
    nome: string;
    username: string;
    password: string;
    email: string;
    authorities: Authority[];
    enabled: boolean;
    credentialsNonExpired: boolean;
    accountNonExpired: boolean;
    accountNonLocked: boolean;

    constructor(
        id: number,
        empresa: Empresa,
        nome: string,
        usuario: string,
        email: string,
        senha: string
    ) {
        this.id = id;
        this.empresa = empresa;
        this.nome = nome;
        this.username = usuario;
        this.email = email;
        this.password = senha;
    }
}

export interface Authority {
    authority: string;
}
