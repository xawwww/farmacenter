import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';



@Component({
  selector: 'app-intro',
  templateUrl: './intro.page.html',
  styleUrls: ['./intro.page.scss'],
})
export class IntroPage implements OnInit {

  constructor( private router:Router) { }


  ngOnInit() {
  }

  abrirCarrito(){
    console.log('Abrir el carrito')
  }
  
  openLogin(){
    this.router.navigate(['/login']);

  }

}
