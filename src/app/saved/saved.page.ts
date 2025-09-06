import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ModalViewPDFComponent } from '../components/modal-view-pdf/modal-view-pdf.component';
import { NavigationEnd, Router } from '@angular/router';
import { IBook } from '../interfaces/book';

@Component({
  selector: 'app-saved',
  templateUrl: 'saved.page.html',
  styleUrls: ['saved.page.scss', "../app.component.scss"],
  standalone: false,
})
export class SavedPage {
  private booksSaved: IBook[] = []
  
  filteredBooksSaved: IBook[] = []
  showSearchBar!: boolean

  constructor(private modalController: ModalController, private router: Router) {}

  ngOnInit(){
    this.router.events.subscribe(event => {
      if (
        event instanceof NavigationEnd && 
        event.urlAfterRedirects.includes('/saved')
      )
        this.loadBooksSaved()
    });
  }

  async openModalViewPdf(book: IBook) {
    const modal = await this.modalController.create({
      component: ModalViewPDFComponent,
      componentProps: {
        book: book,
        bookSavedChange: (book: IBook, deleteNote: boolean) => {
          if(deleteNote){
            this.booksSaved = this.booksSaved.filter(b => b.id !== book.id)
            this.filteredBooksSaved = this.filteredBooksSaved.filter(b => b.id !== book.id)
          }else{
            this.booksSaved.push(book)
            this.filteredBooksSaved.push(book)
          }
          this.showSearchBar = this.filteredBooksSaved.length > 0
        }
      },
    })

    await modal.present()
  }

  filterBooks(event: Event) {
		const searchTerm = (event.target as HTMLInputElement).value.toLowerCase();
		this.filteredBooksSaved = this.booksSaved.filter(book => book.title.toLowerCase().includes(searchTerm));
	}

  private loadBooksSaved(){
    // Atualiza os livros salvos toda vez que entra na página
    this.booksSaved = (JSON.parse(localStorage.getItem("booksSaved") ?? "[]") as IBook[])
    this.filteredBooksSaved = this.booksSaved
    this.showSearchBar = this.filteredBooksSaved.length > 0
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
