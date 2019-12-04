import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Location } from "@angular/common";
import { AppService } from "../../app.service";
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: "app-single-country",
  templateUrl: "./single-country.component.html",
  styleUrls: ["./single-country.component.css"]
})
export class SingleCountryComponent implements OnInit {
  countryName: any;
  public countryDetails;
  public countryFlag: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private spinner: NgxSpinnerService,
    public appService: AppService,
    private location: Location
  ) {}

  ngOnInit() {
    window.scroll(0, 0);
    this.route.params.subscribe(param => {
      this.spinner.show();
      let countryCode = this.route.snapshot.paramMap.get("countryName");

      this.countryDetails = this.appService
        .getCountryDetailsByCode(countryCode)
        .subscribe(
          //this is getting book data
          data => {
            this.countryDetails = data;
            this.countryFlag = this.countryDetails.flag;
            this.countryName = this.countryDetails.name;
            console.log(`Welcome to the ${this.countryName} `);
            this.spinner.hide(); //passsing to get detail function
          },
          error => {
            console.log(error.errorMessage);
            this.spinner.hide();
          }
        );
    });
  }

  public goBack = (): any => {
    this.location.back();
  };
}