import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { AppService } from '../../app.service';
import { SpinnerVisibilityService } from 'ng-http-loader';
import { Spinkit } from 'ng-http-loader'

@Component({
  selector: 'app-single-country',
  templateUrl: './single-country.component.html',
  styleUrls: ['./single-country.component.css']
})
export class SingleCountryComponent implements OnInit {

  public spinkit = Spinkit;
  countryName: any;
  public countryDetails;
  public countryFlag: string;
  
  constructor(
    private route: ActivatedRoute, 
    private router: Router,
    private spinner: SpinnerVisibilityService,
     public appService: AppService, 
     private location: Location) { }

  ngOnInit() {

    this.route.params.subscribe(param => {
      
      this.spinner.show();
      let countryCode = this.route.snapshot.paramMap.get('countryName');

      this.countryDetails = this.appService.getCountryDetailsByCode(countryCode).subscribe(   //this is getting book data
        data => {
          setTimeout(() => {
            this.countryDetails = data;
            this.countryFlag = this.countryDetails.flag;
            this.countryName = this.countryDetails.name;
            //console.log('Country Found');
            //console.log(this.countryDetails);
            console.log(`Welcome to the ${this.countryName} `);
            this.spinner.hide();
          }, 1000);  //passsing to get detail function
        },
        error => {
          console.log(error.errorMessage);
        });
    });

  }
  
    public goBack = (): any => {
      this.location.back();
    }
}
