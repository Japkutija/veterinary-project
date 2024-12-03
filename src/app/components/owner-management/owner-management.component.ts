import { Component } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { Owner } from 'src/app/models/owner.model';
import { OwnerService } from 'src/app/services/owner.service';
import { OwnerEditComponent } from './owner-edit/owner-edit.component';

@Component({
  selector: 'app-owner-management',
  templateUrl: './owner-management.component.html',
  styleUrls: ['./owner-management.component.css'],
})
export class OwnerManagementComponent {
  ownerList: Owner[] = [];
  loading = false;
  total = 0;
  pageIndex = 1;
  pageSize = 10;
  sortField = 'id';
  sortOrder = 'ascend';
  searchValue = '';
  editCache: { [key: string]: { edit: boolean; data: Owner } } = {};

  constructor(private ownerService: OwnerService, private modal: NzModalService) {}

  ngOnInit(): void {
    this.loadOwners();
  }

  loadOwners(): void {
    this.loading = true;
    const params = {
      page: this.pageIndex - 1,
      size: this.pageSize,
      sort: `${this.sortField},${this.sortOrder === 'ascend' ? 'asc' : 'desc'}`,
      search: this.searchValue,
    };

    this.ownerService.getOwners(this.pageIndex, this.pageSize, this.sortField, this.sortOrder).subscribe(
      (data: any) => {
        console.log();
        this.ownerList = data.content;
        this.total = data.totalElements;
        this.loading = false;
        this.updateEditCache();
      },
      (error) => {
        console.error('Error fetching owners: ', error);
        this.loading = false;
      }
    );
  }

  updateEditCache(): void {
    this.ownerList.forEach((item) => {
      this.editCache[item.uuid] = {
        edit: false,
        data: { ...item },
      };
    });
  }

  startEdit(uuid: string): void {
    this.editCache[uuid].edit = true;
  }

  cancelEdit(uuid: string): void {
    const index = this.ownerList.findIndex((item) => item.uuid === uuid);
    this.editCache[uuid] = {
      data: { ...this.ownerList[index] },
      edit: false,
    };
  }

  confirmDeleteOwner(uuid: string): void {
    this.modal.confirm({
      nzTitle: 'Are you sure you want to delete this owner?',
      nzContent: 'Deleting this owner will remove them from the system.',
      nzOkText: 'Yes',
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () => this.deleteOwner(uuid),
      nzCancelText: 'No',
    });
  }

  deleteOwner(uuid: string): void {
    this.ownerService.deleteOwner(uuid).subscribe({
      next: () => {
        console.log('Owner deleted successfully');
        this.loadOwners();
      },
      error: (err: any) => {
        console.error('Failed to delete owner:', err);
      },
    });
  }

  onQueryParamsChange(params: any): void {
    const { pageIndex, pageSize, sort } = params;
    this.pageIndex = pageIndex;
    this.pageSize = pageSize;

    const activeSort = sort.find((s: any) => s.value);

    if (activeSort) {
      this.sortField = activeSort.key;
      this.sortOrder = activeSort.value;
    }

    this.loadOwners();
  }

  searchOwners(): void {
    this.loadOwners();
  }

  openAddOwnerModal(): void {
    // Implement the logic to open a modal for adding a new owner
    // You can use NzModalService to create a modal component
  }

  // owner-management.component.ts
  openEditOwnerModal(owner: Owner): void {
    const modal = this.modal.create({
      nzTitle: 'Edit Owner',
      nzContent: OwnerEditComponent,
      nzComponentParams: {
        owner: { ...owner },
      },
      nzFooter: null,
      nzClassName: 'owner-edit-modal',
    });

    modal.afterClose.subscribe((result) => {
      if (result === 'Success') {
        this.loadOwners();
        this.showUpdateSuccess();
      }
    });
  }

  showUpdateSuccess(): void {
    this.modal.success({
      nzTitle: 'Owner updated successfully',
      nzContent: 'The owner has been successfully updated.',
    });
  }
}
