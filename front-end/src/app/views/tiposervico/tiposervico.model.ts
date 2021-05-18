export class TipoServico {
  id: number;
  nome: string;
  descricao: string;

  constructor(id: number, empresa: string, descricao: string) {
    this.id = id;
    this.nome = empresa;
    this.descricao = descricao;
  }
}
