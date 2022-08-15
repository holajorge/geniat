import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IonSlides, NavController } from '@ionic/angular';
import { UsuarioService } from '../../services/usuario.service';
import { Storage } from '@ionic/storage-angular';
import { UiServiceService } from '../../services/ui-service.service';
import { Usuario } from '../../interfaces/interfaces';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  @ViewChild('slidePrincipal', { static: true }) slides: IonSlides;

  avatars = [
    {
      img: 'av-1.png',
      seleccionado: true
    },
    {
      img: 'av-2.png',
      seleccionado: false
    },
    {
      img: 'av-3.png',
      seleccionado: false
    },
    {
      img: 'av-4.png',
      seleccionado: false
    },
    {
      img: 'av-5.png',
      seleccionado: false
    },
    {
      img: 'av-6.png',
      seleccionado: false
    },
    {
      img: 'av-7.png',
      seleccionado: false
    },
    {
      img: 'av-8.png',
      seleccionado: false
    },
  ];
  avatarSlide = {slidesPerView:3.5};

  loginUser= {
    email:'',
    pass:''
  };
  registerUser: Usuario= {};

  constructor(
    private usuarioService:UsuarioService, 
    private navCtrl:NavController,
    private storage: Storage,
    private uiService:UiServiceService
  ) { }

  async ngOnInit() {
    this.slides.lockSwipes(true);
    await this.storage.create();
  }

  async login(fLogin:NgForm){
    
    if(fLogin.invalid) {return;}
    
    await this.usuarioService.login(this.loginUser.email, this.loginUser.pass).then(
      (resp:any)=> {
        if(resp.response){
          this.navCtrl.navigateRoot('/main/tabs/tab1', {animated:true});
        }else{
          console.log(resp);
          this.uiService.alertInfo(resp.message);
    
        }
      }
    );

   
    
  }
  async registro(fRegister:NgForm){
    
    if(fRegister.invalid) {return;}
    console.log(this.registerUser);
    
    await this.usuarioService.register(this.registerUser).then( 
      (resp:any)=> {
        console.log(resp);
        
        if(resp.response){
          this.uiService.alertInfo(resp.message);
          this.registerUser = {};
        }else{
          this.uiService.alertInfo(resp.message);
        }

      }
    );

  }

  avatarSeleccionado(avatar){

    this.avatars.forEach( av => av.seleccionado = false);
    avatar.seleccionado = true;

  }

  mostrarLogin(){
    this.slides.lockSwipes(false);
    this.slides.slideTo(0)
    this.slides.lockSwipes(true);


  }

  mostrarRegistro(){
    this.slides.lockSwipes(false);
    this.slides.slideTo(1)
    this.slides.lockSwipes(true);

    
  }

}
