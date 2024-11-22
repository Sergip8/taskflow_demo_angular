import {Component, EventEmitter, Input, OnInit, Output, SimpleChanges, inject} from '@angular/core';
import {CommonModule, DatePipe, KeyValuePipe, NgFor} from "@angular/common";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import { distinctUntilChanged } from 'rxjs';
import { ValidationErrorComponent } from '../../../shared/validation-error/validation-error.component';

interface Bool{
  value: boolean
  type: boolean
}

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ValidationErrorComponent, NgFor, KeyValuePipe],
})
export class FormComponent implements OnInit {
addItem() {
  if(this.formGroup.valid){
    this.addItems.push(this.formGroup.value)
  }else{
    this.showErrors = true
    setTimeout(() => {
      this.showErrors = false
    }, 2500);
  }
}
confirm() {
  if(this.type == "Submit"){
    if(this.formGroup.valid){
      console.log(this.formGroup.value)
      this.updateData.emit(this.formGroup.value)
  
    }
    
    else{
      this.showErrors = true
      setTimeout(() => {
        this.showErrors = false
      }, 2500);
  }
  }else{
    if(this.addItems.length>0){
    this.updateDataList.emit(this.addItems)
    //console.log(this.addItems)
    }else{
      this.showAddTypeError = true
      setTimeout(() => {
        this.showAddTypeError = false
      }, 2500);
  }
  }
}

  @Input() form!: FormGroup;
  @Input() controlData: any = {}
  @Input() idFieldName: string = ""
  @Input() isCreate: boolean = false
  @Input() bannedFiels: string[] = []
  
  
  @Output() updateData = new EventEmitter<any>()
  @Output() updateDataList = new EventEmitter<any[]>()
  formGroup: FormGroup = new FormGroup({})
  listFinal = "description"
  keysInput:string[] = []
  keysTextarea:string[] = []
  keysCheckbox:string[] = []
  keysNumber:string[] = []
  showErrors: boolean = false
  addItems: any[] = []
  bool:Bool | null = null 
  @Input() type: "Submit"| "Add" = "Submit"
   showAddTypeError = false
   formItems:FormControl[] = []

  private readonly datePipe = inject(DatePipe)

  constructor() {
   
   // this.formGroup.controls["sfds"]
  }

  ngOnInit(): void {
    if(Array.isArray(this.controlData)){
      for (const cd of this.controlData){
        if(!this.bannedFiels.includes(cd.toLowerCase())){
          this.formGroup.addControl(cd, new FormControl("", Validators.required))
          if(cd.toLowerCase().endsWith(this.listFinal))
            this.keysTextarea.push(cd)
          else if(cd.toLowerCase().startsWith("is"))
            this.keysCheckbox.push(cd)
          else
            this.keysInput.push(cd)

        }
      }

    }else{
      
      this.objetoAFormGroup(this.controlData)
      console.log(this.formGroup)

    }
     // const formControl = Object.assign({},...this.formItems)
    

  }
  objetoAFormGroup(obj: object){
    
    const formGroup: any = {};
    // Iterar sobre las claves del objeto
    for (const [key, value] of Object.entries(obj)) {
     // this.keysInput.push(key)
     if(!key.toLowerCase().endsWith("id")){
      if(Array.isArray(value) && this.isCreate){
        console.log(value[0])
        this.objetoAFormGroup(value[0])
      }else{
        console.log(key)
        if(!this.bannedFiels.includes(key.toLowerCase())){
          if(this.isDate(value))   {
            //formGroup[key] = new FormControl(this.toddMMaaaa(value), Validators.required);
              this.formGroup.addControl(key, new FormControl(this.toddMMaaaa(value), Validators.required))
          }
          else if(/^\d+$/.test(value))
            this.formGroup.addControl(key, new FormControl(value, [Validators.required, Validators.pattern(/^\d+$/)]))
          else {
            
            //formGroup[key] = new FormControl(value, Validators.required);
              this.formGroup.addControl(key, new FormControl(value, Validators.required))
          }

        
        if(key.toLowerCase().endsWith(this.listFinal))
          this.keysTextarea.push(key)
        else if(key.toLowerCase().startsWith("is"))
          this.keysCheckbox.push(key)
        else if(/^\d+$/.test(value))
          this.keysNumber.push(key)
        else
         
            this.keysInput.push(key)
      }
    }
      } 
    };
  }
  camelCaseToWords(texto: string): string {
    const textoConEspacios = texto.replace(/([A-Z])/g, ' $1');
    return textoConEspacios.charAt(0).toUpperCase() + textoConEspacios.slice(1);
  }

  ngOnChanges(changes: SimpleChanges) {

    this.controlData[0] instanceof Date
  }
  isDate(value: any): boolean {
    if(value !==""){
      return false
    }
    if(typeof value == "string"){
    const dateObject = new Date(value);
    return !isNaN(dateObject.getTime());
    }
    if(typeof value == "object"){
      return !isNaN(value.getTime());
    }
    // Verifica si el objeto Date es válido
    return false
  }
  toddMMaaaa(date: Date) {
   
    const formatDate = this.datePipe.transform(date,"yyyy-MM-dd");
    console.log(formatDate)
    return formatDate
    
  }
  isObject(value: any){
    return typeof value == "object"
  }

  isBoolean(value: string): boolean{
    console.log(value)
    if(value == "true"){
      return true
    }
    else if(value == "false"){ 
      return true
    }
    else
      return false
  } 
  }

  






