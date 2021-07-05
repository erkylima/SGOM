export class Empresa {
    id: number;
    nome: string;
    cnpj: string;
    usuario: string;
    email: string;
    senha: string;

    constructor(
        id: number,
        empresa: string,
        cnpj: string,
        usuario: string,
        email: string,
        senha: string
    ) {
        this.id = id;
        this.nome = empresa;
        this.cnpj = cnpj;
        this.usuario = usuario;
        this.email = email;
        this.senha = senha;
    }
}
