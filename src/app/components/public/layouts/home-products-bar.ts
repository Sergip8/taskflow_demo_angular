import { AfterViewInit, Component, Inject, OnDestroy, OnInit, PLATFORM_ID, afterRender, inject } from "@angular/core";
import { Subscription, interval } from "rxjs";
import { Product } from "../../models/product-home";
import { isPlatformBrowser } from "@angular/common";



@Component({
    selector: 'productbar-home',
    standalone: true,
    imports: [
    
    ],
    template: ` 
    <div class="overflow-hidden w-full flex relative">
    @for(i of [0,1,2]; track $index){
        <div class="flex" [style.transform]="'translate3d(' + countOffset + '%, 0px, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg)'" 
         style="will-change: transform; transform-style: preserve-3d; touch-action: pan-y">
            @for (pr of products; track $index) {
                <div class="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                 <a href="#">
                     <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{{pr.name}}</h5>
                 </a>
                 <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">{{pr.price}}</p>
                 <!-- <a href="#" class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                     Read more
                     <svg class="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                         <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                     </svg>
                 </a> -->
               </div>
                
               
            
        }
        </div>

    }

    
    `,
    styles: [`
    `]
  })
  export class ProductBarComponent implements OnInit, OnDestroy {
    
    countOffset:number = 0
    platformId = inject(PLATFORM_ID);
    private interval: any;
    
    products: Product[] = [
        {
            name: "producto 1",
            img: "",
            price: "200000"
        },
        {
            name: "producto 1",
            img: "",
            price: "200000"
        },
        {
            name: "producto 1",
            img: "",
            price: "200000"
        },
        {
            name: "producto 1",
            img: "",
            price: "200000"
        },
        {
            name: "producto 1",
            img: "",
            price: "200000"
        },
        {
            name: "producto 1",
            img: "",
            price: "200000"
        },
        {
            name: "producto 1",
            img: "",
            price: "200000"
        },
    ]

    constructor(){
      
        console.log(this.countOffset)
    }

    offsetCount(){

        this.countOffset -=0.2 
        if(this.countOffset<-160)
            this.countOffset = 0
    }

    ngOnInit(): void {
        if (isPlatformBrowser(this.platformId)) {
            // set the browser time now and every second after
            this.interval = setInterval(() => {
                this.offsetCount(); // Llama a la función que deseas ejecutar cada cierto tiempo
              }, 20); 
        }
    }
    ngOnDestroy() {
        if (this.interval) {
            clearInterval(this.interval); // Limpia el intervalo cuando el componente es destruido
          }
      }
   
      
   
  
  }