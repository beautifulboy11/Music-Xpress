import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController, LoadingController } from 'ionic-angular';
import { FormBuilder, Validators, FormControl } from '@angular/forms';
import { Auth } from '../../providers/providers';
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})

export class LoginPage {
  public loginForm;
  emailChanged: boolean = false;
  submitAttempt: boolean = false;
  loading: any;

  FB_APP_ID: number = 388541891583070;
  private loginErrorString: string;
  userProfile: any = null;

  constructor(
    public auth: Auth,
    public storage: Storage,
    public navParams: NavParams,
    private alertCtrl: AlertController,
    public navCtrl: NavController,
    public toastCtrl: ToastController,
    public formBuilder: FormBuilder,
    public loadingCtrl: LoadingController
  ) {
    let EMAIL_REGEXP =  /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    this.loginForm = formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.pattern(EMAIL_REGEXP)])],
      password: ['', Validators.compose([Validators.minLength(8), Validators.required])]
    });
  }
  elementChanged(input) {    
    let field = input.ngControl.name;
    this[field + "Changed"] = true;
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  googleLogin(): any {
    this.auth.googleLogin();
  }

  facebookLogin(): void {
    this.auth.facebookLogin()
      .then((res) => {
        this.loginErrorString = res["errorMessage"];
        console.log(" favebopk " + this.loginErrorString);
        if (res.indexOf('errorMessage') > -1) {
          this.presentAlert("Facebook Login", res)
        }
      })
      .catch((error) => {
        this.presentAlert("Facebook Login", error);
      });
  }

  SaveToLocalStorage(user) {
    this.presentAlert("Save User Entered: ", user.displayName);
    let nav = this.navCtrl;
    this.userProfile = user;

    this.storage.set('user', {
      name: user.displayName,
      email: user.email,
      picture: user.imageUrl
    })
      .then(function () {
        this.presentAlert("Save User Sucess: ", "Success");
        nav.push('TabsPage');
      },
      function (error) {
        this.presentAlert("Save User Error: ", error);
      });
  }

  Signup(): void {
    this.navCtrl.push("SignupPage");
  }

  ResetPassword() {
    this.navCtrl.push('ResetpwdPage')
  }

  Login(): any {
    this.submitAttempt = true;
    if (!this.loginForm.valid) {
      console.log(this.loginForm.value);
    }
    else {
      this.auth.doLogin(this.loginForm.value.email, this.loginForm.value.password)
        .then((auth) => {
          this.navCtrl.setRoot('TabsPage');
        }, (error) => {
          this.loading.dismiss().then(() => {
            let alert = this.alertCtrl.create({
              message: error.message,
              buttons: [
                {
                  text: "Ok",
                  role: 'cancel'
                }
              ]
            });
            alert.present();
          });
        });
      this.loading = this.loadingCtrl.create({
        dismissOnPageChange: true,
      });
      this.loading.present();
    }
  }
  presentConfirm() {
    let alert = this.alertCtrl.create({
      title: 'Confirm purchase',
      message: 'Do you want to buy this book?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Buy',
          handler: () => {
            console.log('Buy clicked');
          }
        }
      ]
    });
    alert.present();
  }
  presentAlert(Title, Message) {
    let alert = this.alertCtrl.create({
      title: Title,
      message: Message,
      buttons: [
        {
          text: 'OK',
          role: 'Cancel',
          handler: () => {
            console.log('Cancelled');
          }
        }
      ]
    });
    alert.present();
  }
  showPrompt() {
    let prompt = this.alertCtrl.create({
      title: 'Password Reset',
      message: "Enter email address",
      inputs: [
        {
          name: 'email',
          placeholder: 'Email'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Submit',
          handler: data => {
            console.log('Saved clicked');
          }
        }
      ]
    });
    prompt.present();
  }
}

