import { Carro } from "../carro/carro.model";
import { TipoServico } from "../tiposervico/tiposervico.model";

export class Triagem {
  id: number;
  carro: Carro;
  tipoServico: TipoServico;
  preco: number;

  constructor(id: number, carro: Carro, tipoServico: TipoServico, preco:number) {
    this.id = id;
    this.carro = carro;
    this.tipoServico = tipoServico;
    this.preco = preco;
  }
}
