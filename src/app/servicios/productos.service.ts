import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs';

export interface Product{
  id:number;
  nombre: string;
  precio:number;
  cantidad:number;
}
@Injectable({
  providedIn:'root'
})
export class ProductosService {

   data:Product[]=[
  { id:1,nombre:'Sony a 4565', precio:500,cantidad:3},
  { id:2, nombre:'Sony a 4565', precio:600,cantidad:2},
  { id:3,nombre:'Laptop a 4565', precio:1500,cantidad:3},
  { id:4,nombre:'Plasma a 4565', precio:3500,cantidad:3},
]

private carrito = [];
private  contadorItems  = new BehaviorSubject(0) ;
constructor(){

}
obtenerProductos(){
  return this.data; 
}
}

