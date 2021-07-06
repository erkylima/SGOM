import { Empresa } from './../blank/empresa.model';
export class Carro {
  id: number;
  empresa: Empresa;
  modelo: string;
  placa: string;
  ano: number;
  marca: string;


  constructor(id: number, empresa: Empresa, modelo:string, placa:string, ano:number, marca:string) {
    this.id = id;
    this.empresa = empresa;
    this.modelo = modelo;
    this.placa = placa;
    this.ano = ano;
    this.marca = marca;
  }
}
