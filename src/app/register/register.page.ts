import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { AuthenticationService } from '../services/authentication.service';
import { AlertController } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import * as firebase from 'firebase';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  validations_form: FormGroup;
  errorMessage: string = '';
  successMessage: string = '';

  validation_messages = {
    'email': [
      { type: 'required', message: 'Email is required.' },
      { type: 'pattern', message: 'Enter a valid email.' }
    ],
    'password': [
      { type: 'required', message: 'Password is required.' },
      { type: 'minlength', message: 'Password must be at least 5 characters long.' }
    ],
    'contact_no': [
      { type: 'required', message: 'Contact Number is required.' }
    ],
    'full_name': [
      { type: 'required', message: 'Full Name is required.' }
    ],
    'birth_date': [
      { type: 'required', message: 'Date of Birth is required.' }
    ]
  };
  full_name: any;

  constructor(

    private navCtrl: NavController,
    private authService: AuthenticationService,
    public alertController: AlertController,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.validations_form = this.formBuilder.group({
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      password: new FormControl('', Validators.compose([
        Validators.minLength(5),
        Validators.required
      ])),
      contact_no: new FormControl('', Validators.compose([
        Validators.required
      ])),
      full_name: new FormControl('', Validators.compose([
        Validators.required
      ])),
      birth_date: new FormControl('', Validators.compose([
        Validators.required
      ]))
    });

    
  }

  tryRegister(value){
    this.authService.registerUser(value)
     .then(res => {
       console.log(res);

       this.errorMessage = "";
       this.succesfulRegister();
       this.navCtrl.navigateBack('login');
     }, err => {
       console.log(err);
       this.errorMessage = err.message;
       this.successMessage = "";
     })
  }

  goLoginPage(){
    this.navCtrl.navigateBack('login');
  }

  async succesfulRegister() {
    const alert = await this.alertController.create({
      header: 'Successful',
      message: 'You are successfully registered !',
      buttons: ['OK']
    });

    await alert.present();
  }
}
