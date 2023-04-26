import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  constructor(private toast: ToastController) {}

  async success(msg: string) {
    const toast = await this.toast.create({
      message: msg,
      icon: 'information-circle',
      mode: 'ios',
      cssClass: 'custom-toast',
      duration: 3000,
      position: 'top',
    });
    await toast.present();
  }
}
