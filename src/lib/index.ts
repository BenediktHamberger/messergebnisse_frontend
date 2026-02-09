// place files you want to import through the `$lib` alias in this folder.

export interface Filter {
    id: string,
    operator: string,
    value: any | null,
    lower: any | null,
    upper: any | null
}