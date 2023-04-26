import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ApiService } from 'src/app/core/services/api.service';
import { ToastService } from 'src/app/core/services/toast.service';

@Component({
  selector: 'app-labels',
  templateUrl: './labels.page.html',
  styleUrls: ['./labels.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule],
  providers: [ApiService, ToastService],
})
export class LabelsPage implements OnInit {
  labels: any;

  constructor(private api: ApiService) {}

  ngOnInit() {
    this.getLabelList();
  }

  getLabelList() {
    this.api.labels().subscribe({
      next: (v: any) => {
        this.labels = v;
      },
      error: (e: any) => {
        console.log(e);
      },
    });
  }

  editLabel() {
    //
  }

  deleteLabel() {
    this.api.deleteLabel(this.labels[0].id).subscribe({
      next: (v: any) => {
        console.log(v);
      },
      error: (e: any) => {
        console.log(e);
      },
    });
  }
}
