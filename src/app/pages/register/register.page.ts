import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastController, LoadingController, AlertController } from '@ionic/angular';
import { resolve } from 'dns';
import {AccessProviders} from '../../providers/access-providers';
@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  nombre :string ="";
  gender :string ="";
  fechanacimiento:string="";
  email_addres :string="";
  password:string="";
  confirmpassword:string="";
  disabledButton;
  

  constructor ( private  router: Router,
    private  toastCtrl: ToastController,
    private  loadingCtrl: LoadingController,
    private  alertCtrl:AlertController,
    private acesPrvds : AccessProviders
    ) { }

  ngOnInit() {
  }

 ionViewDidEnter(){
   this.disabledButton=false;
 }

 async TryRegister(){
   if(this.nombre==""){
     this.presentToast('Su nombre es requerido');

   } else if(this.gender=="") {
    this.presentToast('Su genero es requerido');
   } else if(this.fechanacimiento=="") {
    this.presentToast('Su fechanacimiento es requerido');
   } else if(this.email_addres=="") {
    this.presentToast('Su email es requerido');
   
   } else if(this.password=="") {
    this.presentToast('Su contraseña es requerido');
   }
   else if(this.confirmpassword=="") {
    this.presentToast('Su contraseña es requerido');
   }else{
     this.disabledButton= true;
     const loader= await this.loadingCtrl.create({
       message:'Por favor espere.....',
     });
     loader.present();
     return new Promise(resolve=> {
       let body ={
         aski: 'proses_register',
         nombre:this.nombre,
         gender: this.gender,
         fechanacimiento: this.fechanacimiento,
         email_addres:this.email_addres,
         password :this.password
       }
       this.acesPrvds.postData(body,'proses_api.php').subscribe((res:any)=>{
         if(res.success ==true){
           loader.dismiss();
           this.disabledButton=false;
           this.presentToast(res.msg);
           this.router.navigate(['/login']);
         }else{
           loader.dismiss();
           this.disabledButton = false;
           this.presentToast(res.msg);
         }
        },(err)=>{
          loader.dismiss();
          this.disabledButton=false;
          this.presentAlert('Timeout');
        

       });
     });
   }
  }

   async presentToast(a){
     const toast = await this.toastCtrl.create({
       message: a,
       duration:1500,
       position:'top'
     });
     toast.present();
   }
   async presentAlert(a) {
    const alert = await this.alertCtrl.create({
      header: a,
      backdropDismiss:false,
      buttons: [
        {
          text: 'Close',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
            //action
          }
        }, {
          text: 'Intentelo otra vez',
          handler: () => {
            this.TryRegister();
          }
        }
      ]
    });
    await alert.present();

  }


}
