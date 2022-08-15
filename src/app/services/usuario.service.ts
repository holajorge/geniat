import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Storage } from '@ionic/storage-angular';
import { environment } from '../../environments/environment';
import { Usuario } from '../interfaces/interfaces';
import { NavController } from '@ionic/angular';


const URL = environment.url;


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  
  token:string = null;

  constructor(
    private http:HttpClient, private storage:Storage,
    private navCtrl:NavController) { 
      this.inittoken();
  }
  async inittoken(){
    await this.storage.create();
  }
  login(user:string, pass:string){

    const data = new FormData();
    data.append('email',user);
    data.append('password',pass);

    return new Promise( (resolve) => {
      this.http.post(`${URL}proyectoCandidatos/login`, data).subscribe(
        async (resp:any) => {
          const {response, message, data } = resp;          
          if(response){
            await this.guardadToken(data.jwt);
            resolve({response,message});
          }else{
            this.token = null;
            resolve({response,message});
            this.storage.clear();
          }
        }
      );
    });

  }
  logout(){
    this.token = null;
    this.storage.clear();
    this.navCtrl.navigateRoot('/login', {animated: true}); 

  }

  register(user:Usuario){

    const data = new FormData();
    data.append('firstname',user.firstname);
    data.append('lastname',user.lastname);
    data.append('birthdate',user.birthdate);
    data.append('email',user.email);    
    data.append('password',user.password);

    return new Promise( (resolve) => {

      this.http.post(`${URL}proyectoCandidatos/registro`, data).subscribe(
        (resp:any) => {
          
          console.log(resp);          
          const {response, message } = resp;          
          this.token = null;
          this.storage.clear();
          resolve({response,message});        

        }
      )
    })

  }

  async guardadToken(token:string){
    this.token = token;
    await this.storage.set('token', token);

    await this.validaToken();
  }

  async cargatToken(){
    console.log('cargaToken');
    
    this.token = await this.storage.get('token') || null;
  }

  async validaToken():Promise<boolean>{

    await this.cargatToken();
    
    
    if(!this.token){
      this.navCtrl.navigateRoot('/login');
      return Promise.resolve(false)
    }
    return Promise.resolve(true)
    
  }
}
