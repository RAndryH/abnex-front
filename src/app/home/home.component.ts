import { Component, OnInit } from '@angular/core';
import { CarsService } from '../services/cars/cars.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { LoginService } from '../services/users/login.service';
import { StorageService } from '../services/users/storage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {

  public allCars: Car[] = [];
  closeResult: string = '';

  username: string = "";
  email: string = "";

  checkSessionExists: any;
  spinner: boolean = false;

  public errorMSg: string = "";

  constructor(public carsService: CarsService, private modalService: NgbModal, private loginService: LoginService, private storageService: StorageService) { 

    /** Get all cars */
    this.carsService.getAllCars().subscribe((res: any) => {
      if (res) {
        this.allCars = res.data;
      }
    })

    /** Check the session exists */
    this.checkSessionExists = this.checkIfSessionExists();
  }

  ngOnInit(): void {
  }

  /** Function to open the modal login */
  openModal(content:any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  /** Function to close the modal login */
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

  /** Function to log user */
  login() {
    this.spinner = true;
    this.errorMSg = "";
    if (this.username && this.email) {
      this.loginService.login({"username": this.username, "email": this.email}).subscribe((data: any) => {
        if (data.length) {
          this.reload();
          this.storageService.createSession(data);
          this.spinner = false;
          this.errorMSg = "";
        } else {
          this.errorMSg += "User name/Email sont incorrecte.";
          this.spinner = false;
        }
        return
      })

    } else {
      this.errorMSg += "User name/Email sont incorrecte.";
      this.spinner = false;
    }
    
  }

  /** Function to logout user */
  logout() {
    const logout = this.loginService.logout();
    if (logout) {
      this.reload();
    }
  }

  /** Function to check if session exists */
  checkIfSessionExists() {
    return this.storageService.sessionExists();
  }

  /** Function to add new comment on the car */
  commenter(id: any, msg: string) {
    this.spinner = true;
    if (id && msg) {
      this.carsService.addCommentOneCar(id, msg).subscribe((res: any) => {
        this.allCars[id - 1].comment.push({"text": msg})
        this.allCars[id - 1].currentcomment = "";
        this.spinner = false;
      })
    }
    
  }

  /** Function to reload page */
  private reload() {
    window.location.reload()
  }

}

/** Object interface for car details */
export interface Car {
  id: number,
  marque: string,
  annee?: string,
  matricule?: string,
  comment: Comment[],
  currentcomment: string,
  img?: string
}

export interface Comment {
  text: string
}
