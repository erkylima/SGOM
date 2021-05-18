export class RecoverInfo {
  email: string;
  cnpj: string;
  novaSenha: string;

  constructor(email: string, cnpj: string, novaSenha: string) {
      this.email = email;
      this.cnpj = cnpj;
      this.novaSenha = novaSenha;
  }
}
