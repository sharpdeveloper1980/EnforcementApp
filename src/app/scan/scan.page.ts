import { Component, OnInit } from '@angular/core';
import { NavController, Platform } from '@ionic/angular';
import { QRScanner , QRScannerStatus  } from '@ionic-native/qr-scanner/ngx';

@Component({
  selector: 'app-scan',
  templateUrl: './scan.page.html',
  styleUrls: ['./scan.page.scss'],
})
export class ScanPage implements OnInit {
/*   encodedData = '';
  QRSCANNED_DATA: string;
  isOn = false;
  scannedData: {}; */
  isOpen = false;
  scannedData: {};
  constructor(public navCtrl: NavController,public qrScanner: QRScanner,public platform:Platform) { 
	  
	  }

  ngOnInit() {
  }
    openScanner() {
		this.qrScanner.prepare()
      .then((status: QRScannerStatus) => {
        console.log(status);
        if (status.authorized) {
          this.isOpen = true;

          // start scanning
          const scanSub = this.qrScanner.scan().subscribe((text: string) => {
            console.log('Scanned something', text);
			alert(text);
            this.isOpen = false;
            this.qrScanner.hide().then();
            scanSub.unsubscribe();
          });

          this.qrScanner.show().then();


        } else if (status.denied) {
          // camera permission was permanently denied
          // you must use QRScanner.openSettings() method to guide the user to the settings page
          // then they can grant the permission from there
          this.qrScanner.openSettings();
        } else {
          // permission was denied, but not permanently. You can ask for permission again at a later time.
        }
      })
      .catch((e: any) => console.error(e));
  }

  async closeScanner() {
    try {
      const status = await this.qrScanner.destroy();
      console.log('destroy status', status);
      this.isOpen = false;
    } catch (e) {
      console.error(e);
    }
  }
  
/*   ionViewWillEnter(){
    this.goToQrScan();
  }

   goToQrScan() {
    this.qrScanCtrl.prepare()
      .then((status: QRScannerStatus) => {
        if (status.authorized) {
          // camera permission was granted
		  
          this.isOn = true;
		  alert(this.isOn);
		this.qrScanCtrl.show();
          // start scanning
          const scanSub = this.qrScanCtrl.scan().subscribe((text: string) => {
            console.log('Scanned something', text);
            alert('Scanned something'+text);
            this.isOn = false;

            this.QRSCANNED_DATA = text;
            if (this.QRSCANNED_DATA !== '') {
              this.closeScanner();
              scanSub.unsubscribe();
            }

          });
          alert(JSON.stringify(scanSub));

        } else if (status.denied) {
          alert('camera permission denied');
          this.qrScanCtrl.openSettings();
        } else {
        }
      })
      .catch((e: any) => console.log('Error is', e));
  }

  closeScanner() {
    this.isOn = false;
    this.qrScanCtrl.hide();
    this.qrScanCtrl.destroy();
  } */ 
/* showCamera() {
  (window.document.querySelector('ion-app') as 
HTMLElement).classList.add('cameraView');
}

hideCamera() {
  (window.document.querySelector('ion-app') as 
HTMLElement).classList.remove('cameraView');
}
ionViewWillEnter(){
   this.showCamera();
}
ionViewWillLeave(){
   this.hideCamera(); 
} */

/*  qrscanner(){
	
		this.qrScanner.prepare()
      .then((status: QRScannerStatus) => {
        if (status.authorized) {
          // camera permission was granted
          alert('authorized');

          // start scanning
		  var self = this;
          let scanSub = this.qrScanner.scan().subscribe((text: string) => {
            console.log('Scanned something', text);
            alert(text);
            self.qrScanner.hide(); // hide camera preview
            scanSub.unsubscribe(); // stop scanning
            self.navCtrl.pop();
          });
          self.qrScanner.resumePreview();

          // show camera preview
          self.qrScanner.show()
          .then((data : QRScannerStatus)=> { 
            alert(data.showing);
          },err => {
            alert(err);

          });

          // wait for user to scan something, then the observable callback will be called

        } else if (status.denied) {
          alert('denied');
          // camera permission was permanently denied
          // you must use QRScanner.openSettings() method to guide the user to the settings page
          // then they can grant the permission from there
        } else {
          // permission was denied, but not permanently. You can ask for permission again at a later time.
          alert('else');
        }
      })
      .catch((e: any) => {
        alert('Error is' + e);
		console.log(e);
      });
}  */
}
