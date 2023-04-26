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
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule],
  providers: [ApiService],
})
export class LoginPage implements OnInit {
  form: any;
  showSpinnerDot: boolean = false;

  constructor(private router: Router, private api: ApiService) {}

  ngOnInit() {
    this.initializeForm();
  }

  initializeForm() {
    this.form = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required]),
    });
  }

  goRegister() {
    this.router.navigate(['register']);
  }

  onSubmit() {
    if (!this.form.valid) {
      this.form.markAllAsTouched();
      return;
    }

    var postData = {
      email: this.form.value.email,
      password: this.form.value.password,
    };

    this.showSpinnerDot = true;
    this.api.login(postData).subscribe({
      next: (v: any) => {
        this.showSpinnerDot = false;
        localStorage.setItem('gnotesToken', v.token);
        localStorage.setItem('userName', v.name);
        localStorage.setItem('userEmail', v.email);
        localStorage.setItem('status', 'true');
        this.router.navigate(['tabs/notes']);
      },
      error: (e: any) => {
        this.showSpinnerDot = false;
      },
    });
  }
}
