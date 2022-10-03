import { Component } from '@angular/core';

import { AuthService } from './services/auth.service';
import { FilesService } from './services/files.service';
import { UsersService } from './services/users.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  imgParent = '';
  showImg = true;
  token = '';
  imgRta = '';

  constructor(private authService: AuthService, private userServices: UsersService, private fileService: FilesService) {

  }

  onLoaded(img: string) {
    console.log('log padre', img);
  }

  toggleImg() {
    this.showImg = !this.showImg;
  }


  createUser() {
    this.userServices.create({
      name: 'Jojhan',
      email: 'jojhan@gmail.com',
      password: '121212'
    }).subscribe(rta => {
      console.log(rta);
    })
  }

  login() {
    this.authService.login( 'jojhan@gmail.com', '121212').subscribe(rta => {
      this.token = rta.access_token;
    })
  }


  downloadPdf() {
    this.fileService.getFile('my.pdf', 'https://young-sands-07814.herokuapp.com/api/files/dummy.pdf', 'application/pdf').subscribe()
  }

  onUpload(event: Event) {
    const element = event.target as HTMLInputElement;
    const file = element.files?.item(0);
    if (file) {
      this.fileService.uploadFile(file).subscribe(rta => {
        this.imgRta = rta.location;
      })
    }
  }
}
