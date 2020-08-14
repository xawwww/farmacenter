import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastController, LoadingController, AlertController, NavController } from '@ionic/angular';
import {AccessProviders} from '../../providers/access-providers';
import{ Storage} from  '@ionic/storage';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
datastorage:any;
name:string;
users:any = [];
limit: number =13 //limite


constructor ( private  router: Router,
    private  toastCtrl: ToastController,
    private  loadingCtrl: LoadingController,
    private  alertCtrl:AlertController,
    private acesPrvds : AccessProviders,
    private storage: Storage,
    public navCtrl:NavController
    ) { }


  
  ngOnInit() {
  }
  ionViewDidEnter(){
    this.storage.get('storage_xxx').then((res)=>{
console.log(res);
this.datastorage = res;
this.name= this.datastorage.nombre;

    });  
  }
async prosesLogout(a){
  this.storage.clear();
  this.navCtrl.navigateRoot(['/intro']);
  const toast = await this.toastCtrl.create({
    message :'Termino la sesion',
    duration:1500
  });
  toast.present(); 
}
openCrud(a){
  this.router.navigate(['/crud'+a]);
}

}
