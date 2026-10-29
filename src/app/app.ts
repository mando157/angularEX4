import { CommonModule } from '@angular/common';
import { Component, HostListener, signal } from '@angular/core';

type Cars = { 'name': string, 'src': string }

@Component({
  imports: [CommonModule],
  selector: 'app-root',
  styleUrl: './app.scss',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('ex4');


  public images: Cars[] = [
    { 'name': "", 'src': 'assets/images/car_1.png' },
    { 'name': "", 'src': 'assets/images/car_2.png' },
    { 'name': "", 'src': 'assets/images/car_3.png' },
    { 'name': "", 'src': 'assets/images/car_4.png' },
    { 'name': "", 'src': 'assets/images/car_5.png' },
    { 'name': "", 'src': 'assets/images/car_6.png' },
    { 'name': "", 'src': 'assets/images/car_7.png' },
    { 'name': "", 'src': 'assets/images/car_8.png' },
    { 'name': "", 'src': 'assets/images/car_9.png' },
    { 'name': "", 'src': 'assets/images/car_10.png' },
    { 'name': "", 'src': 'assets/images/car_11.png' },
  ]

  public selectedImage!: HTMLImageElement;

  public popupImage!: HTMLImageElement;

  public currentImageIndex: number = 0;

  public pressedNumber = "";

  public popupEle!: HTMLElement;

  public openPopup(popup: HTMLElement, popupEle: HTMLElement, selectedImage: HTMLImageElement, popupImage: HTMLImageElement) {
    this.selectedImage = selectedImage;
    this.popupImage = popupImage;
    this.popupEle = popupEle;

    this.currentImageIndex = Number(this.selectedImage.getAttribute("data-index"));

    popup.classList.add("active");

    setTimeout(function () {
      popup.classList.add("show");
      popupEle.classList.add("rotate");
    }, 1);

    popupImage.src = this.selectedImage.src;
  }

  public closePopup(popup: HTMLElement, e: Event) {
    e.stopPropagation();
    popup.classList.remove("show");
    this.popupEle.classList.remove("rotate");

    setTimeout(function () {
      popup.classList.remove("active");
    }, 500);
  }

  public next(image: HTMLImageElement) {
    this.currentImageIndex =
      (this.currentImageIndex + 1) % this.images.length;

    image.src = this.images[this.currentImageIndex].src;
  }

  public prev(image: HTMLImageElement) {
    this.currentImageIndex =
      (this.currentImageIndex - 1 + this.images.length) % this.images.length;

    image.src = this.images[this.currentImageIndex].src;
  }

  @HostListener("window:keyup", ['$event'])
  public keyboard(e: KeyboardEvent) {
    if (e.key == 'ArrowRight') {
      this.next(this.popupImage);
    } else if (e.key == 'ArrowLeft') {
      this.prev(this.popupImage);
    } else if (/^[0-9]$/.test(e.key)) {
      this.pressedNumber += e.key;

      const number = Number(this.pressedNumber);
      if (number >= 1 && number <= this.images.length) {

        if (this.currentImageIndex != (number - 1)) {
          this.currentImageIndex = (number - 1);
          this.popupImage.src = this.images[this.currentImageIndex].src;

          setTimeout(() => {
            this.pressedNumber = '';
          }, 200)
        } else {
          this.popupEle.classList.add("onIt");

          setTimeout(() => {
            this.popupEle.classList.remove("onIt");
          }, 300);

          this.pressedNumber = '';
        }
      }
    } else {
      this.popupEle.classList.add("shake");

      setTimeout(() => {
        this.popupEle.classList.remove("shake");
      }, 300);
    }
  }

  public changeActive(index: number) {

    if (this.currentImageIndex != index) {
      this.currentImageIndex = index;
      let newSrc = this.images[this.currentImageIndex].src;
      this.popupImage.src = newSrc;
    } else {
      this.popupEle.classList.add("onIt");

      setTimeout(() => {
        this.popupEle.classList.remove("onIt");
      }, 300);
    }
  }
}
