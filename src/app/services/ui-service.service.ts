import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class UiServiceService {

  constructor(private alertCtrl:AlertController) { }

  alertInfo = async (msg:string) => {
    const alert = await this.alertCtrl.create({
      message: msg,
      buttons: ['OK']
    });

    await alert.present();
    
  }

}
