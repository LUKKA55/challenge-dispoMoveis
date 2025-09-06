import { Component } from '@angular/core';
import { IBook } from '../interfaces/book';
import { ApiService } from '../services/api-service';
import { ModalController } from '@ionic/angular';
import { ModalViewPDFComponent } from '../components/modal-view-pdf/modal-view-pdf.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss', '../app.component.scss'],
  standalone: false,
})
export class HomePage {
	private books: IBook[] = [];
	
	booksFiltered: IBook[] = [];
	loading = true;

	constructor(
		private modalController: ModalController, 
		private apiService: ApiService
	) {
		this.apiService.Get<IBook[]>("books").subscribe(data => {
			this.books = data;
			this.booksFiltered = data;
			this.loading = false;
		})
	}

	filterBooks(event: Event) {
		const searchTerm = (event.target as HTMLInputElement).value.toLowerCase();
		this.booksFiltered = this.books.filter(book => book.title.toLowerCase().includes(searchTerm));
	}

	async openModalViewPdf(book: IBook) {
		const modal = await this.modalController.create({
			component: ModalViewPDFComponent,
			componentProps: {
				book: book
			}
		})

		await modal.present()
	}

	getColorIconBook(idx:number){
		switch((idx + 1) % 4){
			case 0:
				return "warning"
			case 1:
				return "danger"
			case 2: 
				return "success"
			default:
				return "primary"
		}
	}
}
