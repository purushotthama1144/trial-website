import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { PivotPointService } from 'src/app/service/pivot-point/pivot-point.service';


@Component({
  selector: 'app-mcx-pivot-level',
  templateUrl: './mcx-pivot-level.component.html',
  styleUrls: ['./mcx-pivot-level.component.scss'],
  
})
export class McxPivotLevelComponent implements OnInit {
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

  pivotMcxData : any;
  mcxData: any;
  ngOnInit(): void {
    this.getPivotMCXData()
  }
  change(event){
    this.checked = event.checked;
    this.mcxData = this.checked?this.pivotMcxData.daily:this.pivotMcxData.weekly
    this.refreshDataSource()
  }
  getPivotMCXData() {
    const data = {
      "pivot_point_type": "mcx"
    }
    this.pivotPointService.getPivotpointData(data)
      .subscribe((response: any) => {
       
        this.pivotMcxData = response;
        this.mcxData = this.checked?this.pivotMcxData.daily:this.pivotMcxData.weekly
        this.refreshDataSource()
      }, (error) => {
      
      })
  }
  refreshDataSource(){
    this.dataSource = new MatTableDataSource(this.mcxData);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

}
