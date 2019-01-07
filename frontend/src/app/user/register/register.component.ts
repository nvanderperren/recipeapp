import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidatorFn, FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../authentication.service';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

function passwordValidator(length: number): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } => {
    return control.value.length < length ? {
      'passwordTooShort':
        { requiredLength: length, actualLength: control.value.length }
    } : null;
  };

}

function comparePasswords(control: AbstractControl): { [key: string]: any } {
  const password = control.get('password');
  const confirmPassword = control.get('confirmPassword');
  return password.value === confirmPassword.value ? null : {
    'passwordsDiffer': true
  };
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  public user: FormGroup;
  public errorMsg: string;

  get passwordControl(): FormControl {
    return <FormControl>this.passwordGroup.get('password');
  }

  get passwordGroup(): FormGroup {
    return <FormGroup>this.user.get('passwordGroup');
  }

  get username(): FormControl {
    return <FormControl>this.user.get('username');
  }

  get confirmPassword(): FormControl {
    return <FormControl>this.passwordGroup.get('confirmPassword');
  }

  constructor(private fb: FormBuilder,
    private authenticationService: AuthenticationService,
    private router: Router) { }

  ngOnInit() {
    this.user = this.fb.group({
      username: [
        '',
        [Validators.required, Validators.minLength(4)],
        this.serverSideValidateUsername()
      ],
      passwordGroup: this.fb.group(
        {
          password: ['', [Validators.required, passwordValidator(12)]],
          confirmPassword: ['', Validators.required]
        },
        { validator: comparePasswords }
      )
    });
  }

  serverSideValidateUsername(): ValidatorFn {
    return (control: AbstractControl): Observable<{ [key: string]: any }> => {
      return this.authenticationService.checkUserNameAvailability(control.value)
        .pipe(map(available => {
          if (available) {
            return null;
          }
          return { userAlreadyExists: true };
        })
      );
    };
  }

  onSubmit() {
    if (this.user.valid) {
      this.authenticationService.register(this.user.value.username, this.passwordControl.value)
      .subscribe(
        val => {
          if (val) {
            this.router.navigate(['/recipe/list']);
          }
        },
        (error: HttpErrorResponse) => {
          this.errorMsg = `Error ${error.status} while trying to register user
            ${this.user.value.username}`;
        }
      );
    } else {
      this.errorMsg = 'niet alle velden zijn ingevuld.';
    }

  }



}
