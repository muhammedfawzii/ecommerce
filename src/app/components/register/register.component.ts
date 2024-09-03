import { Component, inject, OnDestroy } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnDestroy {
private readonly _AuthService = inject(AuthService)
private readonly _FormBuilder = inject(FormBuilder)
private readonly _Router = inject(Router)
isLoading:boolean = false
msgError:string = ""
msgSuccess:boolean = false
inputType:boolean = false
inputType1:boolean = false
registerUnsub!:Subscription
checkErr:boolean = false

registerForm:FormGroup = this._FormBuilder.group({
  name:[null , [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
  email:[null, [Validators.required, Validators.email]],
  phone: [null, [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)]],
  password: [null, [Validators.required, Validators.pattern(/^\w{6,}$/)]],
  rePassword:[null],
}, {validators: this.confirmPassword} )




registerSubmit():void{
  if(this.registerForm.valid){
    this.isLoading = true
   this.registerUnsub = this._AuthService.setRegiseterForm(this.registerForm.value).subscribe({
      next:(res)=>{
        console.log(res);
        if(res.message === 'success'){
          this.checkErr = true
          this.msgSuccess = true
          setTimeout(() => {
            this._Router.navigate(['/login'])
          }, 2000);
        }
        this.isLoading = false
      },
      error:(err:HttpErrorResponse)=>{
        console.log(err)
        this.msgError = err.error.message   
        this.isLoading = false
      }
    })
  } else{
    this.registerForm.setErrors({mismatch:true})
    this.registerForm.markAllAsTouched()
  }
}
confirmPassword(g:AbstractControl){
if(g.get('password')?.value === g.get('rePassword')?.value){
  return null
}
else{
  return {mismatch:true}
}
}
ngOnDestroy(): void {
  this.registerUnsub?.unsubscribe()
}
passwordVisibility(){
  this.inputType = !this.inputType
}
passwordVisibility1(){
  this.inputType1 = !this.inputType1
}

}
