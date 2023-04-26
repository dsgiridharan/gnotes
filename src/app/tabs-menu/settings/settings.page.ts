import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ApiService } from 'src/app/core/services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
})
export class SettingsPage implements OnInit {
  public tasks = [
    {
      title: 'About Notes',
      action: 'about',
      icon: 'information-circle-outline',
    },
    { title: 'Privacy', action: 'privacy', icon: 'reader-outline' },
    { title: 'Help', action: 'help', icon: 'help-circle-outline' },
    { title: 'App Version', action: 'version', icon: 'document-text-outline' },
    { title: 'Logout', action: 'logout', icon: 'log-out-outline' },
  ];

  constructor(private router: Router) {}

  ngOnInit() {}

  action(action: string) {
    switch (action) {
      case 'about':
        //
        break;
      case 'privacy':
        //
        break;
      case 'version':
        //
        break;
      case 'logout':
        localStorage.clear();
        this.router.navigate(['login']);
        break;
    }
  }
}
