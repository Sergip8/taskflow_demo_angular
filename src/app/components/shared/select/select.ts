import { Component, EventEmitter, Input, Output, SimpleChanges } from "@angular/core";
import { SelectData } from "./selectModel";


@Component({
    
    selector: 'app-select',
    standalone: true,
    template: `
    <div class=" w-max ">
                  
        <select #select (change)="selected.emit(select.value)" id="countries" class=" border border-gray-300 text-gray-600 text-base rounded-lg block w-full py-2 px-4 focus:outline-none">
        <option selected hidden>{{data.default}}</option>
        @for (opt of data.list; track $index) {
            <option>{{opt}}</option>
        }
        </select>
    </div>
    `,
    styles: [`
        
    `],

  })
  export class SelectComponent {

    @Input() data!: SelectData
    @Output() selected = new EventEmitter<string>()

  }