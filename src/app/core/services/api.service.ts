import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  apiUrl: string = `${environment.siteUrl}/api`;

  constructor(private http: HttpClient) {}

  getHeaderOptions() {
    let token = localStorage.getItem('gnotesToken');
    const options = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    };
    const requestOptions = {
      headers: new HttpHeaders(options),
    };
    return requestOptions;
  }

  login(data: any) {
    return this.http.post(`${this.apiUrl}/login`, data);
  }
  register(data: any) {
    return this.http.post(`${this.apiUrl}/register`, data);
  }

  moveToTrash(id: any) {
    return this.http.get(
      `${this.apiUrl}/notes/trash/${id}`,
      this.getHeaderOptions()
    );
  }
  restoreFromTrash(id: any) {
    return this.http.get(
      `${this.apiUrl}/notes/restore/${id}`,
      this.getHeaderOptions()
    );
  }

  trashes() {
    return this.http.get(`${this.apiUrl}/trash`, this.getHeaderOptions());
  }

  notes() {
    return this.http.get(`${this.apiUrl}/notes`, this.getHeaderOptions());
  }
  getNoteById(id: any) {
    return this.http.get(`${this.apiUrl}/notes/${id}`, this.getHeaderOptions());
  }
  createNote(data: any) {
    return this.http.post(
      `${this.apiUrl}/notes`,
      data,
      this.getHeaderOptions()
    );
  }
  updateNote(data: any, id: any) {
    return this.http.put(
      `${this.apiUrl}/notes/${id}`,
      data,
      this.getHeaderOptions()
    );
  }
  deleteNote(id: any) {
    return this.http.delete(
      `${this.apiUrl}/notes/${id}`,
      this.getHeaderOptions()
    );
  }
  searchNotes(data: any) {
    return this.http.post(
      `${this.apiUrl}/notes/search`,
      data,
      this.getHeaderOptions()
    );
  }

  labels() {
    return this.http.get(`${this.apiUrl}/labels`, this.getHeaderOptions());
  }
  getLabelById(id: any) {
    return this.http.get(
      `${this.apiUrl}/labels/${id}`,
      this.getHeaderOptions()
    );
  }
  createLabel(data: any) {
    return this.http.post(
      `${this.apiUrl}/labels`,
      data,
      this.getHeaderOptions()
    );
  }
  updateLabel(data: any, id: any) {
    return this.http.put(
      `${this.apiUrl}/labels/${id}`,
      data,
      this.getHeaderOptions()
    );
  }
  deleteLabel(id: any) {
    return this.http.delete(
      `${this.apiUrl}/labels/${id}`,
      this.getHeaderOptions()
    );
  }
}
