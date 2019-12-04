import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AllCountriesComponent } from "./all-countries/all-countries.component";
import { SingleCountryComponent } from "./single-country/single-country.component";

import { RouterModule, Routes } from "@angular/router";
import { SharedModule } from "../shared/shared.module";
import { FormsModule } from "@angular/forms";

import { NgxPaginationModule } from "ngx-pagination";
import { OrderModule } from "ngx-order-pipe";
import { NgxSpinnerModule } from "ngx-spinner";
import { HttpClientModule } from "@angular/common/http";

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    NgxPaginationModule,
    OrderModule,
    HttpClientModule,
    // NgHttpLoaderModule,
    NgxSpinnerModule,
    RouterModule.forChild([
      {
        path: "allCountry/:firstLevel/:secondLevel/:thirdLevel",
        component: AllCountriesComponent
      },
      {
        path: "country/:countryName",
        component: SingleCountryComponent
      }
    ])
  ],
  declarations: [AllCountriesComponent, SingleCountryComponent]
})
export class CountryModule {}