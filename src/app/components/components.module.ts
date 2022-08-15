import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarComponent } from './car/car.component';
import { CarsComponent } from './cars/cars.component';


@NgModule({
  declarations: [
    CarComponent,CarsComponent
  ],
  exports: [
    CarComponent,CarsComponent

  ],
  imports: [
    CommonModule
  ]
})
export class ComponentsModule { }
