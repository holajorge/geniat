import { Component, OnInit, Input } from '@angular/core';
import { Car } from 'src/app/interfaces/interfaces';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.scss'],
})
export class CarComponent implements OnInit {

  @Input() car:Car;

  constructor() { }

  ngOnInit() {}

}
