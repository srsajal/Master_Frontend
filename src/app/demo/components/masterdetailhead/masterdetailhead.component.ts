import { Component, inject, OnInit } from '@angular/core';
import { ActionButtonConfig, DynamicTableQueryParameters } from 'mh-prime-dynamic-table';
import { MessageService } from 'primeng/api';
import { Code, MasterDdo, MasterDetailHead } from 'src/Model/master.model';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { MasterdetailheadformComponent } from '../masterForms/masterdetailheadform/masterdetailheadform.component';
import { MasterService } from '../../service/MasterService/masterddo.service';
import { DetailheadService } from '../../service/MasterService/detailhead.service';

@Component({
  selector: 'app-masterdetailhead',
  templateUrl: './masterdetailhead.component.html',
  styleUrls: ['./masterdetailhead.component.scss']
})
export class MasterdetailheadComponent implements OnInit {
  tableData: any;
  tableQueryParameters!: DynamicTableQueryParameters | any;
  actionButtonConfig: ActionButtonConfig[] = [];
  alldata: number = 0;
  visible: boolean = false;
  id: number = 0;
  codes: Code[] = [];
  dialogButts: number = 1;
  
  messageService = inject(MessageService);
  detailHeadService = inject(DetailheadService);

  ref: DynamicDialogRef | undefined;
  constructor(public dialogService: DialogService, public config : DynamicDialogConfig) { }
  show() {
    this.ref = this.dialogService.open(MasterdetailheadformComponent, {
      data:{
        dialogButt : 1,
        code : this.codes,
        isDisable : false,
        pgetData : this.getData.bind(this),

      },
      width: '50rem',
      modal:true,
      header: 'ADD DETAIL HEAD DATA' 
    });
  }

  ngOnInit(): void {
    this.tableInitialize();
    this.getData();

  }

  tableInitialize() {
    this.actionButtonConfig = [
      {
        buttonIdentifier: 'view',
        class: 'p-button-rounded p-button-raised',
        icon: 'pi pi-eye',
        lable: 'View',
      },
      {
        buttonIdentifier: 'edit',
        class: 'p-button-warning p-button-rounded p-button-raised',
        icon: 'pi pi-file-edit',
        lable: 'Edit',
      },
      {
        buttonIdentifier: 'del',
        class: 'p-button-danger p-button-rounded p-button-raised',
        icon: 'pi pi-trash',
        lable: 'Delete',
      }
    ];
    this.tableQueryParameters = {
      pageSize: 10,
      pageIndex: 0,
      filterParameters: [],
    };
  }
  getData() {
    this.detailHeadService.getMasterDetailHead(this.tableQueryParameters).subscribe((response: any) => {
      this.tableData = response.result;
      this.alldata = response.result.dataCount;
    });
  }
  editData(tmpid: number) {
    this.ref = this.dialogService.open(MasterdetailheadformComponent, {
      data:{
        dialogButt : 2,
        code : this.codes,
        id : tmpid,
        isDisable : false,
        pgetData : this.getData.bind(this),

      },
      width: '50rem',
      modal:true,
      header: 'EDIT DETAIL HEAD DATA' 
    });
  }
  delData(tmpid: number) {
    this.detailHeadService.deleteMasterDetailHeadById(tmpid).subscribe(() => {
      this.getData();
      this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'Record deleted', life: 2000 });
    },
      error => {
        console.error('Error deleting MasterDDO data:', error);
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to delete MasterDDO record', life: 2000 });
      }
    );
  }




  viewData(tmpid : number){
    this.detailHeadService.getMasterDetailHeadById(tmpid).subscribe((res: MasterDetailHead) => {
      this.ref = this.dialogService.open(MasterdetailheadformComponent, {
        data:{
          dialogButt : 3,
          code : this.codes,
          id : tmpid,
          isDisable : true,
        },
        width: '50rem',
        modal:true,
        header: 'VIEW DETAIL HEAD DATA' 
      });
    },
      error => {
        console.error('Error fetching MasterDDO data by ID:', error);
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to fetch MasterDDO data by ID', life: 2000 });
      }
    );
  }

  handleRowSelection($event: any) {
    console.log("Download the details from above");
  }
  handleButtonClick(event: any) {
    if (event.buttonIdentifier == "edit") {
      this.editData(event.rowData.id);
    }
    else if (event.buttonIdentifier == "del") {
      this.delData(event.rowData.id);
    }
    else if (event.buttonIdentifier == "view") {
      this.viewData(event.rowData.id);
    }
  }
  handQueryParameterChange(event: any) {
    this.tableQueryParameters = {
      pageSize: event.pageSize,
      pageIndex: event.pageIndex,
      filterParameters: event.filterParameters || [],
    };
    this.getData();
  }
  handleSearch(event: any) {
    console.log(event);
  }

}
