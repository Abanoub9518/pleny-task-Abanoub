import { CommonModule } from "@angular/common";
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from "@angular/core";

@Component({
  selector: "app-paginator",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./paginator.component.html",
  styleUrl: "./paginator.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaginatorComponent {
  @Input() totalItems!: any;
  @Input() itemsPerPage!: any;
  @Input() currentPage!: any;
  @Output() pageChanged = new EventEmitter<number>();

  ngOnInit() {
    // console.log(this.totalItems);
    // console.log(this.itemsPerPage);
  }
  get totalPages(): number {
    return Math.ceil(this.totalItems / this.itemsPerPage);
  }

  onPageChange(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.pageChanged.emit(page);
      this.currentPage = page;
    }
  }
}
