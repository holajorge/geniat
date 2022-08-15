import { Component, OnInit, Input } from '@angular/core';
import { Car, Marca } from '../../interfaces/interfaces';

@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.scss'],
})
export class CarsComponent implements OnInit {
  
  @Input() cars:Car[] = [];
  @Input() marcas:Marca[] = [];
  cCars:any = [];
  constructor() { 
  }

  ngOnInit() {
    console.log(this.cars);
    console.log(this.marcas);
    this.cCars = this.cars;

  }
  filter(event){
   console.log(event);
   
    const marca = event.detail.value;
   
    const filtros = {
      
      nombreMarca: [marca, d => {
        console.log(d['nombreMarca']);
        console.log(marca);
        
        if(d['nombreMarca'] == marca){
          return true;
        }
      }],

    }
   console.log(this.cCars);

    let carsss = this.cCars;
    for (const filtro in filtros) {
      if(filtros[filtro][0]){
        carsss = carsss.filter( filtros[filtro][1])
      }
    }
    this.cars = carsss;
  }
}
