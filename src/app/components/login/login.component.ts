import { Router, RouterLink } from '@angular/router';
import { AuthService } from './../../core/services/auth.service';
import { Component, inject, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink , NgClass],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnDestroy {
private readonly _AuthService = inject(AuthService)
private readonly _Router = inject(Router)
private readonly _FormBuilder = inject(FormBuilder)
isLoading:boolean = false
msgError:string = ""
msgSuccess:boolean = false
inputType:boolean = false
logUnsub!:Subscription

loginForm:FormGroup = this._FormBuilder.group({
  email:[null, [Validators.required, Validators.email]],
  password: [null, [Validators.required, Validators.pattern(/^\w{6,}$/)]]
})

loginSubmit():void{
  if(this.loginForm.valid){
    this.isLoading = true
  this.logUnsub = this._AuthService.setLoginForm(this.loginForm.value).subscribe({
      next: (res)=>{
        console.log(res);
        if(res.message === 'success'){
          this.msgSuccess = true
          setTimeout(() => {
            localStorage.setItem('userToken', res.token)
            this._AuthService.saveUserToken()
            this._Router.navigate(['/home'])
          }, 2000);
        }
        this.isLoading = false
      },
      error:(err:HttpErrorResponse)=>{
        console.log(err);
        this.msgError = err.error.message
        this.isLoading = false
        
      }
    })
  } else{
    this.loginForm.markAllAsTouched()
  }
}
ngOnDestroy(): void {
  this.logUnsub?.unsubscribe()
}
passwordVisibility(){
  this.inputType = !this.inputType
}
}
