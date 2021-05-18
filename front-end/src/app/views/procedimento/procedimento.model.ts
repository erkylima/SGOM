import { TipoServico } from './../tiposervico/tiposervico.model';

export class Procedimento {
  id: number;
  tiposervico: TipoServico;
  ordem: number;
  nome: string;

  constructor(id:number, tiposervico:TipoServico, ordem:number,nome:string) {
    this.id = id;
    this.tiposervico = tiposervico;
    this.ordem = ordem;
    this.nome = nome;
  }
}
