import { Component, OnInit } from '@angular/core';
import { DataService } from '../../../services/data/data.service';
import { TokenStorageService } from '../../../services/allServices';
import { Router } from '@angular/router';

@Component({
  selector: 'app-speci-report',
  templateUrl: './speci-report.component.html'
})
export class SpeciReportComponent implements OnInit {
  observationslips: any = [];
  syncData:any = [];
  public unsyncedData:number;
  title = 'Observationslips';
  info: any;


  constructor(
     private router: Router,
     private dataService: DataService,
     private token: TokenStorageService
   ) { }

  ngOnInit() {
        this.dataService.getObservationslipFormBySubmission()
    .subscribe( data => {
      this.observationslips = data.json();
      console.log(this.observationslips);
    });

    this.info = {
      token: this.token.getToken(),
      username: this.token.getUsername(),
      authorities: this.token.getAuthorities()
    };

  }

  editObservationslip(id){
    localStorage.removeItem('editObservationslipId');
    let observationslipId = id.toString();
    localStorage.setItem('editSlipId', observationslipId);
    this.router.navigate(['observationslip/edit-observationslip']);

  }

  approveObservationslip(id){
    this.dataService.approveObservationslip(id)
  .subscribe( data => {
    console.log(data);
  }, err=> console.log(err));
    this.router.navigate(['observationslip/view-observationslip']);


  }

}
