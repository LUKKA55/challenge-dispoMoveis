import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  	private readonly BASE_URL = 'https://68adc380a0b85b2f2cf4914b.mockapi.io/';

	constructor(private http: HttpClient){}

	Get<T>(url: string = "") : Observable<T> {
		return this.http.get<T>(new URL(url, this.BASE_URL).href)
	}
}
