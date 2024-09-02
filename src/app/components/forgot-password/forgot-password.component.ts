import { Component, inject } from '@angular/core';
import {  FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.scss'
})
export class ForgotPasswordComponent {
  private readonly _AuthService = inject(AuthService)
  private readonly _Router = inject(Router)
  step:number = 1
  msgSuccess:string = ""
  isLoading:boolean = false
  validCode:boolean = false
  welcomeHome:boolean = false
  inputType:boolean = false
  msgError:string = ""

  verifyEmail:FormGroup = new FormGroup({
    email:new FormControl(null , [Validators.required , Validators.email])
  })
  verifyCode:FormGroup = new FormGroup({
    resetCode:new FormControl(null , [Validators.required , Validators.pattern(/^\w{6}$/)])
  })
  resetPassword:FormGroup = new FormGroup({
    email:new FormControl(null , [Validators.required , Validators.email]),
    newPassword:new FormControl(null , [Validators.required , Validators.pattern(/^\w{6,}$/)])
  })


  emailSubmit():void{
   if(this.verifyEmail.valid){
    this.isLoading = true
    this._AuthService.setEmailVerify(this.verifyEmail.value).subscribe({
      next:(res)=>{
        console.log(res);
        this.msgSuccess = res.message
        if(res.statusMsg === 'success'){
          this.msgSuccess = res.message
          setTimeout(() => {
            this.step = 2
          }, 4000);
        }
        this.isLoading = false
      },
      error:(err)=>{
        console.log(err);
        this.msgError = err.error.message
        this.isLoading = false
      }
    })
   }else{
    this.verifyEmail.markAllAsTouched()
   }
  }

  codeSubmit():void{
    if(this.verifyCode.valid){
      this._AuthService.setCodeVerify(this.verifyCode.value).subscribe({
        next:(res)=>{
          console.log(res);
          if(res.status === 'Success'){
            this.validCode = true
            setTimeout(() => {
              this.step = 3
            }, 4000);
          }
        },
        error:(err)=>{
          console.log(err);
          
        }
      })
    }else{
      this.verifyCode.markAllAsTouched()
    }
  }

  resetPasswordSubmit():void{
    this._AuthService.setresetPass(this.resetPassword.value).subscribe({
      next:(res)=>{
        console.log(res);
        this.welcomeHome = true
        localStorage.setItem('userToken', res.token)
        this._AuthService.saveUserToken()
        setTimeout(() => {
          this._Router.navigate(['/home'])
        }, 4000);
      },
      error:(err)=>{
        console.log(err);
        
      }
    })
  }
  passwordVisibility():void{
    this.inputType = true
  }
}
