import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/core/services/api.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule],
  providers: [ApiService],
})
export class RegisterPage implements OnInit {
  form: any;
  showSpinnerDot: boolean = false;

  constructor(private router: Router, private api: ApiService) {}

  ngOnInit() {
    this.initializeForm();
  }

  initializeForm() {
    this.form = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required]),
    });
  }

  goLogin() {
    this.router.navigate(['login']);
  }

  onSubmit() {
    if (!this.form.valid) {
      this.form.markAllAsTouched();
      return;
    }

    var postData = {
      name: this.form.value.name,
      email: this.form.value.email,
      password: this.form.value.password,
    };

    this.showSpinnerDot = true;
    this.api.register(postData).subscribe({
      next: (v: any) => {
        this.showSpinnerDot = false;
        this.router.navigate(['login']);
      },
      error: (e: any) => {
        this.showSpinnerDot = false;
        console.log(e);
      },
    });
  }
}
