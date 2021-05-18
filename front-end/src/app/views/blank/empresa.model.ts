export class Empresa {
  id: number;
  nome: string;
  cnpj: string;

  constructor(id: number, empresa: string, cnpj: string) {
    this.id = id;
    this.nome = empresa;
    this.cnpj = cnpj;
  }
}
