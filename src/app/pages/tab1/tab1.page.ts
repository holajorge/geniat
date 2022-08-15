import { Component, OnInit } from '@angular/core';
import { CarsService } from '../../services/cars.service';
import { Car, Marca } from '../../interfaces/interfaces';
import { UiServiceService } from 'src/app/services/ui-service.service';
import { NavController } from '@ionic/angular';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  listCars:Car[] =[];
  listMarcas:Marca[]=[];
  habilitado:boolean = true;
  constructor(
    private navCtrl:NavController,
    private carsService:CarsService, private uiService:UiServiceService, private usuarioService: UsuarioService, 
    ) {}

  ngOnInit(){
    this.siguientes();
  }
  recargar(event){
      this.siguientes(event, true);
      this.habilitado = true;
      this.listCars = [];

  }

  async siguientes(event?, pull=false){
    
    const resp = await this.carsService.getList(pull);

    console.log(resp['response']);
    if(resp['response']){
      this.listCars.push(...resp['data'].resultados);
      this.listMarcas = resp['data'].marcas;

      if(event){
        event.target.complete();
        if(resp['data'].resultados.length === 0){
            this.habilitado = false;
        }
      }
    }else{
      this.listCars = [];
      this.uiService.alertInfo(resp['message']);
      this.navCtrl.navigateRoot('/login', {animated:true});
    }
  }
  logout(){
    this.carsService.paginaCars = 0;
    this.usuarioService.logout();
  }
  
}
