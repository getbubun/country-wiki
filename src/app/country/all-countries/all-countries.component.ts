import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Location } from "@angular/common";
import { AppService } from "../../app.service";
import { DataFormat } from "../../country/data-format";
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: "app-all-countries",
  templateUrl: "./all-countries.component.html",
  styleUrls: ["./all-countries.component.css"]
})
export class AllCountriesComponent implements OnInit {
  public regionalCountries: DataFormat[];
  public region: string;
  public foundCountries: number;
  selectedRegionName: string;
  nameValue: string;
  p: number;

  constructor(
    private _route: ActivatedRoute,
    private router: Router,
    // private spinner: SpinnerVisibilityService,
    private spinner: NgxSpinnerService,
    public appService: AppService,
    private location: Location
  ) {}

  ngOnInit() {
    window.scroll(0, 0);
    this._route.params.subscribe(param => {
      this.spinner.show();
      this.regionalCountries = [];

      let firstLevel = this._route.snapshot.paramMap.get("firstLevel");
      let secondLevel = this._route.snapshot.paramMap.get("secondLevel");
      let thirdLevel = this._route.snapshot.paramMap.get("thirdLevel");

      this.getAllCountries(firstLevel, secondLevel, thirdLevel); //function calling
    });
  }

  onPageChange(event) {
    this.p = event;
    let scrollToTop = window.setInterval(() => {
      let pos = window.pageYOffset;
      if (pos > 0) {
        window.scrollTo(0, pos - 200); // how far to scroll on each step
      } else {
        window.clearInterval(scrollToTop);
      }
    }, 2);
  }
  public getAllCountries = (
    firstLevel: string,
    secondLevel: string,
    thirdLevel: string
  ): any => {
    this.appService
      .getAllCountries(firstLevel, secondLevel, thirdLevel)
      .subscribe(
        // getting data
        data => {
          this.regionalCountries = data;
          this.foundCountries = this.regionalCountries.length;
          //console.log('Countries Found');
          //console.log(this.foundCountries);
          console.log(`${this.foundCountries} Countries are there !`);

          this.spinner.hide();

          //passsing to get detail function
        },
        error => {
          console.log(error.errorMessage);
          this.spinner.hide();
          console.log(`Not Found !`);
          this.router.navigate([`/`]);
        }
      );

    if (
      secondLevel == "americas" ||
      secondLevel == "asia" ||
      secondLevel == "africa" ||
      secondLevel == "europe" ||
      secondLevel == "oceania" ||
      secondLevel == "polar"
    ) {
      this.region = secondLevel;
      console.log(`Welcome to the ${this.region} region`);
      this.selectedRegionName = this.region;
    } else if (firstLevel == "currency") {
      this.region = "Currency";
      console.log(`${thirdLevel} currency applied !`);
    } else if (firstLevel == "lang") {
      this.region = "Language";
      console.log(`${thirdLevel} language applied !`);
    }
  };

  public goBack = (): any => {
    this.location.back();
  };
}
