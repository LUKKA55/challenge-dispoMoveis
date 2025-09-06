import { Component, Input, OnInit } from '@angular/core';
import { AlertController, IonicModule, ModalController } from '@ionic/angular';
import { PdfViewComponent } from '../pdf-view/pdf-view.component';
import { IBook } from 'src/app/interfaces/book';
import { INote as INote } from 'src/app/interfaces/note';

@Component({
  selector: 'app-modal-view-pdf',
  templateUrl: './modal-view-pdf.component.html',
  styleUrls: ['./modal-view-pdf.component.scss', "../../app.component.scss"],
  imports: [IonicModule, PdfViewComponent]
})
export class ModalViewPDFComponent  implements OnInit {
  @Input() book!: IBook;
  bookSavedChange: (book: IBook, deleteNote: boolean) => void = () => {}
  bookSaved!: boolean

  constructor(
    private modalController : ModalController, 
    private alertController : AlertController
  ) {}

  ngOnInit() {
    const books = (JSON.parse(localStorage.getItem("booksSaved") ?? "[]") as IBook[])
    this.bookSaved = books.some(b => b.id === this.book.id)
  }

	closeModal(){
    this.modalController.dismiss()
	}

  async showAlertAddNote(bookTitle: string){
    const alert = await this.alertController.create({
      header: "Add Note",
      buttons: [
        { text: "Cancel" },
        {
          text: "Add",
          handler: (data) => {
            if(data.title.length >= 3 && data.text.length >= 3){
              const newNote : INote = {
                id: Math.random(),
                idBook: this.book.id,
                title: data.title,
                text: data.text,
                titleBook: bookTitle
              }
      
              const notes = (JSON.parse(localStorage.getItem("notes") ?? "[]") as INote[])
              notes.push(newNote)
      
              localStorage.setItem("notes", JSON.stringify(notes))
              return true
            }

            return false
          }
        }
      ],
      inputs: [
        { name: "title", placeholder: "Title note", type: "textarea" },
        { name: "text", placeholder: 'Text note', type: "textarea" }
      ]
    })

    await alert.present()
  }

  saveBook(book: IBook){
    let saveBooks = (JSON.parse(localStorage.getItem("booksSaved") ?? "[]") as IBook[])

    const bookAlreadySaved = saveBooks.some(b => b.id === book.id)
    
    if(bookAlreadySaved){
      saveBooks = saveBooks.filter(b => b.id !== book.id)
    }else{
      saveBooks.push(book)
    }

    this.bookSavedChange(book, bookAlreadySaved)
    this.bookSaved = !bookAlreadySaved
    
    localStorage.setItem("booksSaved", JSON.stringify(saveBooks))
  }
}
