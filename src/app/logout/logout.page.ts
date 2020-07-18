import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute,NavigationEnd } from '@angular/router';
@Component({
  selector: 'app-logout',
  templateUrl: './logout.page.html',
  styleUrls: ['./logout.page.scss'],
})
export class LogoutPage implements OnInit {

  constructor(private route: ActivatedRoute,private router: Router) { }

  ngOnInit() {
	localStorage.removeItem('enforce');
	this.router.navigate(['/login']);
  }
}
