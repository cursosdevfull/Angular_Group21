export type Paginate<T> = {
    data: T[],
    pagination: {
        currentPage: number,
        pageSize: number,
        totalItems: number,
        totalPages: number,
        hasNext: boolean,
        hasPrevious: boolean
    },
}