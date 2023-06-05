import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { PivotPointService } from 'src/app/service/pivot-point/pivot-point.service';


@Component({
  selector: 'app-nse-pivot-level',
  templateUrl: './nse-pivot-level.component.html',
  styleUrls: ['./nse-pivot-level.component.scss'],
  
})
export class NsePivotLevelComponent implements OnInit {

  checked:boolean = false;
  constructor(private pivotPointService: PivotPointService) {

  }

  displayedColumns: string[] = [
    'scrip',
    'r3',
    'r2',
    'r1',
    'pivot',
    's1',
    's2',
    's3',
  ];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  pivotNseData: any;
  nseData: any;

  ngOnInit(): void {
    this.getPivotNSEData()
  }
  change(event){
    this.checked = event.checked;
    this.nseData = this.checked?this.pivotNseData.daily:this.pivotNseData.weekly
    this.refreshDataSource()
  }
  getPivotNSEData() {
    const data = {
      "pivot_point_type": "nse"
    }
    this.pivotPointService.getPivotpointData(data)
      .subscribe((response: any) => {

        this.pivotNseData = response
        this.nseData = this.checked?this.pivotNseData.daily:this.pivotNseData.weekly
        this.refreshDataSource()
      }, (error) => {

      })
  }

  refreshDataSource() {
    this.dataSource = new MatTableDataSource(this.nseData);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
}
