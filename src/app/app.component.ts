import { Component, OnInit } from '@angular/core';

import { Platform , NavController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
  public selectedIndex = 0;
  public appPages = [

    {
      title: 'Home',
      url: '/home',
      icon: 'home'
    },
    {
      title: 'Parking History',
      url: '/parking-history',
      icon: 'list'
    },
    {
      title: 'Parked Vehicle',
      url: '/parked-vehicles',
      icon: 'car'
    },
    {
      title: 'Change Password',
      url: '/change-password',
      icon: 'lock-closed'
    },
    {
      title: 'Scan',
      url: '/scan',
      icon: 'scan'
    }
  ];
  //public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public navCtrl: NavController
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.overlaysWebView(false);
      this.statusBar.styleLightContent();
      this.statusBar.backgroundColorByHexString("#9E948B");
      this.splashScreen.hide();
    });
  }

  ngOnInit() {
    const path = window.location.pathname.split('folder/')[1];
    if (path !== undefined) {
      this.selectedIndex = this.appPages.findIndex(page => page.title.toLowerCase() === path.toLowerCase());
    }
    if (localStorage.getItem('enforce') === null)
   {
    this.navCtrl.navigateRoot('/login');
    }
    else
    {
   // this.navCtrl.navigateRoot('/'); 
     this.navCtrl.navigateRoot('/home');
    }
  }
}
