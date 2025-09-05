import { Component, Input, OnInit } from '@angular/core';
import { PDFDocumentProxy, PdfViewerModule, ZoomScale } from 'ng2-pdf-viewer';
import { IonicModule, IonInput } from "@ionic/angular";

@Component({
  selector: 'app-pdf-view',
  templateUrl: './pdf-view.component.html',
  styleUrls: ['./pdf-view.component.scss'],
  imports: [PdfViewerModule, IonicModule]
})
export class PdfViewComponent  implements OnInit {
  @Input() pdfUrl!: string;

  totalPages : number = 0;
  page : number = 1;
  zoom: number = 1;
  pageScale : ZoomScale = "page-width"

  constructor() {}

  ngOnInit() {}
  
	zoomIn() {
    const zoom = this.zoom + 0.1
    this.zoom = Number(zoom.toFixed(1));
  }
  
  zoomOut() {
    if(this.zoom > 0.1){
      const zoom = this.zoom - 0.1
      this.zoom = Number(zoom.toFixed(1));
    }
	}

  previousPage() {
    if(this.page > 1)
		  this.page -= 1
	}

	nextPage() {
    if(this.page < this.totalPages)
		  this.page += 1
	}

  handleChangePageScale(event : CustomEvent){
    this.zoom = 1
    this.pageScale = event.detail.value
  }

  afterLoadComplete(pdf: PDFDocumentProxy): void {
    this.totalPages = pdf.numPages;
  }

  changedPageEvent(event: Event){
    const value = Number((event.target as HTMLInputElement).value)

    if(value <= 0)
      this.page = 1
    else if(value > this.totalPages)
      this.page = this.totalPages
    else 
      this.page = value

    if(this.page != value)
      (event.target as HTMLInputElement).value = this.page.toString()
  }
}
