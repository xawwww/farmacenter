 import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastController, LoadingController, AlertController, NavController, ModalController } from '@ionic/angular';
import {AccessProviders} from '../../providers/access-providers';
import{ Storage} from  '@ionic/storage';
import { ProductosService } from 'src/app/servicios/productos.service';
import { BehaviorSubject } from 'rxjs';
import { CartService } from '../../services/cart.service';
import { CarModalPage } from '../car-modal/car-modal.page';

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
start: number =0;
carrito=[];
products : any =[];
contadorItems:BehaviorSubject<number>;
cart =[];
cartItemCount:BehaviorSubject<number>;


constructor ( private  router: Router,
  private  toastCtrl: ToastController,
  private  loadingCtrl: LoadingController,
  private  alertCtrl:AlertController,
 
  private storage: Storage,
  public navCtrl:NavController,
  private producto:ProductosService,
  private cartService: CartService,
  private modalCtrl: ModalController ,
  private acesPrvds : AccessProviders,
  ) { }
 

ionViewDidEnter(){

  this.storage.get('storage_xxx').then((res)=>{
    console.log(res);
    this.datastorage =res;
    this.name = this.datastorage.nombre;
  });   
   this.start=0; 
  this.products =[];

  this.loadProducts();
  

}

 async doRefresh(event){
  const loader = await this.loadingCtrl.create({
    message:'Please wait.....',
  });
  loader.present();
  this.ionViewDidEnter();
  event.target.complete();
  loader.dismiss();
}

loadData(){
  this.start += this.limit;
  setTimeout(() =>{
    this.loadProducts().then(()=>{
      event.target.complete(); 
    });
  }, 500);
}



   
  
  ngOnInit() {
    /*this.product = this.producto.obtenerProductos();*/
    this.products = this.cartService.getProducts();
    this.cart= this.cartService.getCart();
    this.cartItemCount = this.cartService.getCartItemCount();


      
   
     
      
     
     }
    async  loadProducts(){
      return new Promise(resolve => {
      
        let body ={
          aski: 'listaproductos',   
          start: this.start,
          limit: this.limit
       
        }


        this.acesPrvds.postData(body,'proses_api.php').subscribe((res:any)=> {
          for(let datas of  res.result){
         //this.products.push(datas);  
              console.log(datas);
        
         }
       
         resolve(true); 
        });
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

abrirCarrito(){
  console.log('Abrir el carrito')
}
addToCart(product){
  this.cartService.addProduct(product);

}
async openCart(){
let modal = await this.modalCtrl.create({
  component:CarModalPage,
  cssClass:'cart-modal'
});
modal.present();
}


}
