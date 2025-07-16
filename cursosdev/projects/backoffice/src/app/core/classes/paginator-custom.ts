import { MatPaginatorIntl } from "@angular/material/paginator";

export class PaginatorCustom extends MatPaginatorIntl {
    override itemsPerPageLabel = 'Items por página';
    override nextPageLabel = 'Página siguiente';
    override previousPageLabel = 'Página anterior';
    override firstPageLabel = 'Primera página';
    override lastPageLabel = 'Última página';

    override getRangeLabel = (page: number, pageSize: number, length: number): string => {
        if (length === 0 || pageSize === 0) {
            return `0 of ${length}`;
        }
        length = Math.max(length, 0);
        const startIndex = page * pageSize;
        const endIndex = Math.min(startIndex + pageSize, length);
        return `Desde ${startIndex + 1} hasta ${endIndex}. Total: ${length}`;
    };
}