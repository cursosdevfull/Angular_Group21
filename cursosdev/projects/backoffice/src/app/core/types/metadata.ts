type ItemMetadata<T> = {
    field: keyof T;
    label: string;
}

export type Metadata<T> = ItemMetadata<T>[]