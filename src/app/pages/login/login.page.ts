import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastController, LoadingController, AlertController, NavController } from '@ionic/angular';
import {AccessProviders} from '../../providers/access-providers';
import{ Storage} from  '@ionic/storage';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  email_addres :string="";
  password:string="";
  
   disabledButton;
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
    this.disabledButton=false;
  }
 
  async TryLogin(){
   
     if(this.email_addres=="") {
     this.presentToast('Su Email es requerido');
    } else if(this.password=="") {
     this.presentToast('Su contraseña es requerido');
    }else{
      this.disabledButton= true;
      const loader= await this.loadingCtrl.create({
        message:'Por favor espere.....',
      });
      loader.present();
     
      return new Promise(resolve=> {
     
        let body ={
          aski: 'proses_login',
          email_addres:this.email_addres,
          password :this.password
        }
        this.acesPrvds.postData(body,'proses_api.php').subscribe((res:any)=>{
          if(res.success ==true){
            loader.dismiss();
            this.disabledButton=false;
            this.presentToast('Ingreso satisfactorio');
            this.storage.set('storage_xxx',res.result);//guardo la session by jona
            this.navCtrl.navigateRoot(['/home']);
          }else{
            loader.dismiss();
            this.disabledButton = false;
            this.presentToast('Email o contraseña incorrecto');
          }
         },(err)=>{
           loader.dismiss();
           this.disabledButton=false;
           this.presentToast('Timeout');
         
 
        });
      });
    }
   }
   async presentToast(a){
    const toast = await this.toastCtrl.create({
      message: a,
      duration:1500
   
    });
    toast.present();
  }
  
 

  openRegister(){
    this.router.navigate(['register']);
  }

}
