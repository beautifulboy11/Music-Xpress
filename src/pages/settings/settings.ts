import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Settings } from '../../providers/providers';

@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {
  user: any;
  // Our local settings object
  options: any;

  settingsReady: boolean = false;

  private settingsform: FormGroup;

  profileSettings = {
     page: 'profile',
     pageTitleKey: 'Edit Profile'
  };

  page: string = 'main';
  pageTitleKey: string = 'SETTINGS_TITLE';
  pageTitle: string;

  subSettings: any = SettingsPage;

  constructor(
    public navCtrl: NavController,
    public settings: Settings,
    private formBuilder: FormBuilder,
    public navParams: NavParams,
    ) 
    {
      
    }

  _buildForm() {
    let group: any = {
      option1: [this.options.option1],
      option2: [this.options.option2],
      option3: [this.options.option3]
    };

   switch (this.page) {
    case 'main':
      break;
    case 'profile':
      group = {
        option4: [this.options.option4]
      };
      break;
    default:
      break;
    }
    this.settingsform = this.formBuilder.group(group);

    //Watch the form for changes, and
    this.settingsform.valueChanges.subscribe((v) => {
      this.settings.merge(this.settingsform.value);
    });
  }

  ionViewDidLoad() {
    // Build an empty form for the template to render
    this.settingsform = this.formBuilder.group({});
  }
 
  ionViewWillEnter() {
    //Build an empty form for the template to render
    this.settingsform = this.formBuilder.group({});

    this.page = this.navParams.get('page') || this.page;
    this.pageTitleKey = this.navParams.get('pageTitleKey') || this.pageTitleKey;

    //this.translate.get(this.pageTitleKey).subscribe((res) => {
    this.pageTitle = 'Settings';
    

    this.settings.load().then(() => {
      this.settingsReady = true;
      this.options = this.settings.allSettings;

      this._buildForm();
    });
  }

  ngOnChanges() {
    console.log('Ng All Changes');
  }

  goToProfile():void {
    this.navCtrl.push('ProfilePage');
  }

}
