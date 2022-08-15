import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core'
import { environment } from '../../environments/environment';
import { RespuestaCars } from '../interfaces/interfaces';
import { Storage } from '@ionic/storage-angular';

const URL = environment.url;

@Injectable({
  providedIn: 'root'
})
export class CarsService {
  public paginaCars = 0;
  token:string = null;

  constructor(private http:HttpClient,private storage:Storage) {
    this.inittoken();
   }
   async inittoken(){
    await this.storage.create();
  }
  async cargarToken(){
    this.token = await this.storage.get('token') || '';    
  }

  async getList(pull:boolean=false){

    if(pull){
      this.paginaCars = 0;
    }

    this.paginaCars++;
    await this.cargarToken();

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'withCredentials': 'true',
      'Authorization': `Bearer ${this.token}`
    });
    return new Promise( resolve => {
      this.http.get(`${URL}proyectoCandidatos/lista?page=${this.paginaCars}`, {headers} ).subscribe(
        (resp:any) => {                    
          resolve(resp);        
        }
      )      
    })    
  }


}
