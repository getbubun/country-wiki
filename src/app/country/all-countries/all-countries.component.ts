import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { AppService } from '../../app.service'
import { DataFormat } from '../../country/data-format';
import { SpinnerVisibilityService } from 'ng-http-loader';
import { Spinkit } from 'ng-http-loader'

@Component({
  selector: 'app-all-countries',
  templateUrl: './all-countries.component.html',
  styleUrls: ['./all-countries.component.css']
})
export class AllCountriesComponent implements OnInit {
  public spinkit = Spinkit;
  public regionalCountries: DataFormat[];
  public region: string;
  public foundCountries: number;
  selectedRegionName: string;
  nameValue:string;
  p:number;

  constructor(
    private _route: ActivatedRoute, 
    private router: Router,
    private spinner: SpinnerVisibilityService,
    public appService: AppService,
    private location: Location
  ) { }

  ngOnInit() {
    this._route.params.subscribe(param => {
      this.spinner.show();
      this.regionalCountries = [];

      let firstLevel = this._route.snapshot.paramMap.get('firstLevel');
      let secondLevel = this._route.snapshot.paramMap.get('secondLevel');
      let thirdLevel = this._route.snapshot.paramMap.get('thirdLevel');

      this.getAllCountries(firstLevel, secondLevel, thirdLevel); //function calling
    });
  }
  public getAllCountries = (firstLevel: string, secondLevel: string, thirdLevel: string): any => {
    this.appService.getAllCountries(firstLevel, secondLevel, thirdLevel).subscribe(   // getting data
      data => {
        setTimeout(() => {
          this.regionalCountries = data;
          this.foundCountries = this.regionalCountries.length;
          //console.log('Countries Found');
          //console.log(this.foundCountries);
         console.log(`${this.foundCountries} Countries are there !`);

          this.spinner.hide();

        }, 1000);  //passsing to get detail function
      },
      error => {
        console.log(error.errorMessage);
        
        console.log(`Not Found !`);
        this.router.navigate([`/`]);

      });

      if (secondLevel == 'americas' || secondLevel == 'asia' || secondLevel == 'africa' || secondLevel == 'europe' || secondLevel == 'oceania' || secondLevel == 'polar') {
        this.region = secondLevel;
        console.log(`Welcome to the ${this.region} region`);
        this.selectedRegionName = this.region;
      }
      else if (firstLevel == 'currency') {
        this.region = 'Currency';
        console.log(`${thirdLevel} currency applied !`);

      }
      else if (firstLevel == 'lang') {
        this.region = 'Language';
        console.log(`${thirdLevel} language applied !`);

      }
      
  }

  public goBack = (): any => {
    this.location.back();
  }

}
