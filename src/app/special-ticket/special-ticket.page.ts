import { Component, OnInit } from "@angular/core";
import { Camera, CameraOptions } from "@ionic-native/camera/ngx";
import {
  FileTransfer,
  FileUploadOptions,
  FileTransferObject
} from "@ionic-native/file-transfer/ngx";
import { File } from "@ionic-native/file";
import { Geolocation } from "@ionic-native/geolocation/ngx";
import { NavController, MenuController } from "@ionic/angular";
import { ToastController } from "@ionic/angular";
import { AlertController } from "@ionic/angular";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Router, ActivatedRoute, NavigationEnd } from "@angular/router";
import { LoadingController } from "@ionic/angular";
import { NgForm } from "@angular/forms";
import { environment } from "../../environments/environment";
declare var $: any;
@Component({
  selector: "app-special-ticket",
  templateUrl: "./special-ticket.page.html",
  styleUrls: ["./special-ticket.page.scss"]
})
export class SpecialTicketPage implements OnInit {
  deploy_id: any = {};
  image: any = "";
  image2: any = "";
  tickets: any = [];
  ticket_number: any = [];
  model: any = {};
  enforce_id: any = {};
  check_licence: any = [];
  imageURI: any = {};
  imageURIV: any = {};
  imageFileName: any = {};
  lat: any = {};
  lng: any = {};
  verify: any = {};
  constructor(
    private geolocation: Geolocation,
    private transfer: FileTransfer,
    private camera: Camera,
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router,
    public toastController: ToastController,
    public menuCtrl: MenuController,
    public loadingController: LoadingController,
    public alertController: AlertController
  ) {}

  ngOnInit() {
    var en = JSON.parse(localStorage.getItem("enforce"));
    if (en == null) {
      this.router.navigate(["/login"]);
    } else {
      this.deploy_id = en.deployment_id;
      this.enforce_id = en.id;
    }
  }
  ionViewDidEnter() {
    this.menuCtrl.enable(false);
    this.http
      .get(environment.base_api + "specialTickets/" + this.deploy_id)
      .subscribe(res => {
        this.tickets = res;
        console.log(this.tickets);
      });
    this.geolocation
      .getCurrentPosition({
        maximumAge: 1000,
        timeout: 5000,
        enableHighAccuracy: true
      })
      .then(
        resp => {
          // resp.coords.latitude
          // resp.coords.longitude
          //alert("r succ"+resp.coords.latitude)
          this.lat = resp.coords.latitude;
          this.lng = resp.coords.longitude;
        },
        er => {
          //alert("error getting location")
          alert("Can not retrieve Location");
        }
      )
      .catch(error => {
        //alert('Error getting location'+JSON.stringify(error));
        alert("Error getting location - " + JSON.stringify(error));
      });
  }
  ionViewWillLeave() {
    this.menuCtrl.enable(true);
  }
  async loadingPresent(message: string = null, duration: number = null) {
    const loading = await this.loadingController.create({
      message,
      duration,
      spinner: "lines",
      cssClass: "my-loading-class"
    });
    return await loading.present();
  }
  async loadingDismiss() {
    return this.loadingController.dismiss();
  }
  onKeydown(e) {
    //if (navigator.userAgent.match(/Android/i)) {
    var self = this;
    setTimeout(function() {
      var inputValue = e.target.value;

      var charKeyCode = e.keyCode || e.which;

      if (charKeyCode == 0 || charKeyCode == 229) {
        charKeyCode = self.getKeyCode(inputValue);

        if (charKeyCode === 32) {
          var replace = inputValue.split(" ").join("");
          $("#special_licence").val(replace);
        }
      } else {
        if (charKeyCode === 32) {
          var replace = inputValue.split(" ").join("");
          $("#special_licence").val(replace);
        }
      }
    }, 0);
    //}
  }
  getKeyCode(str) {
    return str.charCodeAt(str.length - 1);
  }
  onChange($event) {
    var ticket_id = $event.target.value;
    var last_number = Date.now();
    this.http
      .get(environment.base_api + "specialTicketNumber/" + ticket_id)
      .subscribe(res => {
        this.ticket_number = res;
        var ticket_numbers =
          this.ticket_number.special_ticket_starting_no +
          "-" +
          this.ticket_number.special_ticket_city_code +
          "-" +
          this.ticket_number.special_ticket_code +
          "-" +
          last_number;
        var ticket_c = this.ticket_number.special_ticket_cost;
        $("#ticket_numbers").val(ticket_numbers);
        $("#ticket_price").val(ticket_c);
      });
  }

  async presentToast(msg) {
    const toast = await this.toastController.create({
      message: msg,
      color: "dark",
      duration: 2000,
      position: "bottom",
      cssClass: "my-custom-class"
    });
    toast.present();
  }

  special(f) {
    var ticket_lookup = f.value.ticket_lookup;
    var ticket_no = f.value.ticket_no;
    var licence_plate = f.value.licence_plate;
    var price = f.value.ticket_price;
    alert(price);
    if (this.image2 == "" && this.image == "") {
      this.presentToast("Please select licence and VIN images.");
      return false;
    } else {
      let ticket_data = JSON.stringify({
        a: ticket_lookup,
        b: ticket_no,
        c: licence_plate,
        d: price,
        enforce_id: this.enforce_id,
        deploy_id: this.deploy_id,
        lat: this.lat,
        lng: this.lng
      });
      this.http
        .post(environment.base_api + "addTicket", ticket_data)
        .subscribe(res => {
          alert(res);
          if (res == 0) {
            this.presentToast("Something went wrong.");
          } else {
            //alert("tes" + res);
            this.uploadFile(res);
            this.uploadVIN(res);
          }
        });
    }
  }
  openCam() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      //sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      mediaType: this.camera.MediaType.PICTURE
    };

    this.camera.getPicture(options).then(
      imageData => {
        this.imageURI = imageData;
        this.image2 = (<any>window).Ionic.WebView.convertFileSrc(imageData);
      },
      err => {
        console.log(err);
        this.presentToast(err);
      }
    );
  }
  uploadFile(id) {
    this.loadingPresent();
    const fileTransfer: FileTransferObject = this.transfer.create();
    let options: FileUploadOptions = {
      fileKey: "fileKey",
      fileName: Date.now() + ".jpg",
      chunkedMode: false,
      mimeType: "image/jpeg",
      headers: {}
    };

    fileTransfer
      .upload(
        this.imageURI,
        encodeURI(environment.base_api + "uploadSpecialLicenceImage/" + id),
        options
      )
      .then(
        data => {
          console.log(data + " Uploaded Successfully");
          this.imageFileName = "";
          this.loadingDismiss();
          //this.presentToast("Licence image uploaded successfully");
        },
        err => {
          console.log(err);
          this.loadingDismiss();
          this.presentToast(JSON.stringify(err));
        }
      );
  }
  openCamVIN() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      //sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      mediaType: this.camera.MediaType.PICTURE
    };

    this.camera.getPicture(options).then(
      imageData => {
        this.imageURIV = imageData;
        this.image = (<any>window).Ionic.WebView.convertFileSrc(imageData);
      },
      err => {
        console.log(err);
        this.presentToast(err);
      }
    );
  }
  uploadVIN(id) {
    this.loadingPresent();
    const fileTransfer: FileTransferObject = this.transfer.create();
    let options: FileUploadOptions = {
      fileKey: "fileKey",
      fileName: Date.now() + ".jpg",
      chunkedMode: false,
      mimeType: "image/jpeg",
      headers: {}
    };

    fileTransfer
      .upload(
        this.imageURIV,
        encodeURI(environment.base_api + "uploadSpecialVINImage/" + id),
        options
      )
      .then(
        data => {
          console.log(data + " Uploaded Successfully");

          this.imageFileName = "";
          this.loadingDismiss();
          //this.presentToast("VIN image uploaded successfully");
          this.presentToast("Car parked.");
          this.router.navigate(["/parked-vehicles"]);
        },
        err => {
          console.log(err);
          this.loadingDismiss();
          this.presentToast(JSON.stringify(err));
        }
      );
  }
}
