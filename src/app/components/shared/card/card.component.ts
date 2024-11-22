import { Component, EventEmitter, HostBinding, HostListener, Input, OnInit, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Cart, CartProduct, Images, Product, ProductData } from '../../../models/product';

import { db } from '../../../_core/indexedDB/DBConfig';
import { CartDetails, CartDb, CartHeader } from '../../../models/shopping-cart';
import { CartService } from '../../../_core/services/cart.service';
import { AuthService } from '../../../public/auth/auth.service';
import { CommonService } from '../../../_core/services/common.service';
import { RouterLink } from '@angular/router';

export interface CountProducts{
  productId: number
  count: number
}

export interface CartProducts{
  product: Product
  count: number
}
@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  notFound = "https://upload.wikimedia.org/wikipedia/commons/a/a3/Image-not-found.png"
 
@Input() loading: boolean = false;

  ngOnInit(): void {
   
  }

 
  errorImage(i: number, j: number){
    this.products[i].images[j].imageUrl = this.notFound;
  }

  countProducts: CountProducts[] = []
  cartProducts: CartProduct[] = []
  @Input() products: ProductData[] = []
  cart: CartDb = new CartDb()
  cartHeader: CartHeader = new CartHeader()
  cartDetails: CartDetails = new CartDetails()
  private cartService = inject(CartService)
  private auth = inject(AuthService)
  changeImage = 0

async addToCart(product: Product) {

  
  const indexp = this.countProducts.findIndex(item => item.productId === product.productId);
  if(indexp == -1){
    this.cartProducts.push({...product, quantity:1})
  }else{
    this.cartProducts.push({...product, quantity: this.countProducts[indexp].count})

  }

  const card =  await this.obtenerCarrito(1)
  
  console.log(card)
  if(card){
    card.cartHeader.cartTotal += product.price * this.countProducts[indexp].count
    const index = card.cartProducts.findIndex(item => item.productId === product.productId);
    if(index == -1){
      card.cartProducts.push({...product, quantity: this.countProducts[indexp].count})
      await this.guardarCarrito({cartId:1, cartProducts: card.cartProducts, cartHeader: card.cartHeader})

    }else{
      card.cartProducts[index].quantity += this.countProducts[indexp].count
      await this.guardarCarrito({cartId:1, cartProducts: card.cartProducts, cartHeader: card.cartHeader})

    }
  }else{
    const header = {
      couponCode: "",
      discount: 0,
      cartTotal: product.price * this.countProducts[indexp].count
    }
    await this.guardarCarrito({cartId:1, cartProducts: [this.cartProducts[indexp]], cartHeader: header})

  }
  const userId = this.auth.getUserId()
 this.cartHeader.userId = userId
 this.cartDetails.productId = product.productId
 this.cartDetails.count = this.countProducts[indexp].count
  console.log(this.cartDetails)
  this.cart.cartDetails = [this.cartDetails]
  this.cart.cartHeader = this.cartHeader
 this.cartUpsert()

}
async guardarCarrito(carrito: Cart): Promise<number> {
  return await db.cart.put(carrito);
}
async obtenerCarrito(cartId: number): Promise<Cart | undefined> {
  return await db.cart.get(cartId);
}


minus(productId: number) {
  console.log(this.countProducts)
  if(this.countProducts.some(item => item.productId === productId)){
    const index = this.countProducts.findIndex(item => item.productId === productId);
    if(this.countProducts[index].count>1){
      this.countProducts[index].count --
    }else{
      this.countProducts.splice(index, 1)
    }
  }
}
plus(productId: number) {
  if(this.countProducts.some(item => item.productId === productId)){
    const index = this.countProducts.findIndex(item => item.productId === productId);
    
      this.countProducts[index].count ++
    
  }else{
    this.countProducts.push({productId: productId, count: 2})
  }
}
count(productId: number) {
  const item = this.countProducts.find(item => item.productId === productId);
  return item ? item.count : 1;
}

cartUpsert(){
  this.cartService.cartUpsert(this.cart).subscribe(data =>{
    console.log(data)
  })
}

}
