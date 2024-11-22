import { NgClass, NgFor, NgIf } from "@angular/common";
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from "@angular/core";
import { Pagination } from "../../../models/pagination";



@Component({
    
    selector: 'app-pagination',
    standalone: true,
    imports:[NgFor, NgIf],
    template: `
   <nav  aria-label="Pagination">
   <div class="flex justify-center items-center gap-2 my-4">
  <!-- Botón Anterior -->
  <button 
    (click)="goToPage(pageData.page - 1)" 
    [disabled]="pageData.page <= 1" 
    class="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 disabled:bg-gray-100 disabled:text-gray-400">
    Anterior
  </button>

  <!-- Botones de Páginas -->
  <ng-container *ngFor="let p of pages">
    <button 
    *ngIf="p !== '...'; else dots" 
      (click)="goToPage(p)" 
      [class.bg-blue-500]="p === pageData.page" 
      [class.text-white]="p === pageData.page" 
      [class.bg-gray-200]="p !== pageData.page" 
      [class.text-gray-700]="p !== pageData.page" 
      class="px-4 py-2 rounded hover:bg-blue-400 hover:text-white">
      {{ p }}
    </button>
    <ng-template #dots>
      <span class="px-2 py-2 text-gray-500">...</span>
    </ng-template>
  </ng-container>

  <!-- Botón Siguiente -->
  <button 
    (click)="goToPage(pageData.page + 1)" 
    [disabled]="pageData.page >= totalPages" 
    class="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 disabled:bg-gray-100 disabled:text-gray-400">
    Siguiente
  </button>
</div>
</nav>
    `,
    styles: [`
        
    `],

  })
export class PaginationComponent implements OnInit, OnChanges {

    constructor(){
      
    }
    ngOnInit(): void {
    
    }
    totalPages: number = 0; // Total de páginas
    pages: (number | string)[] = []; // Lista de números de páginas para mostrar

  ngOnChanges(): void {
    this.totalPages = Math.ceil(this.pageData.count / this.pageData.size); // Calcula total de páginas
    this.pages = this.getPages() // Genera páginas
    console.log(this.totalPages)
  }

  goToPage(page: number| string): void {
    if (<number>page >= 1 && <number>page <= this.totalPages) {
      this.pageChange.emit(<number>page); // Emite el cambio
    }
  }
  getPages(): (number | string)[] {
    const maxVisible = 5; // Máximo de páginas visibles
    const pages: (number | string)[] = [];

    if (this.totalPages <= maxVisible) {
      // Si hay pocas páginas, muéstralas todas
      for (let i = 1; i <= this.totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Mostrar páginas abreviadas
      const start = Math.max(2, this.pageData.page - 1); // Desde la página actual - 1
      const end = Math.min(this.totalPages - 1, this.pageData.page + 3); // Hasta la página actual + 1

      pages.push(1); // Primera página siempre visible

      if (start > 2) {
        pages.push('...'); // Indicar omisión al inicio
      }

      for (let i = start; i <= end; i++) {
        pages.push(i); // Páginas visibles alrededor de la actual
      }

      if (end < this.totalPages - 1) {
        pages.push('...'); // Indicar omisión al final
      }

      pages.push(this.totalPages); // Última página siempre visible
    }

    return pages;
  }
    @Input() pageData!: Pagination
    @Output() pageChange = new EventEmitter<number>()
  }