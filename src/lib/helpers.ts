// workaround to turn BigInt into json
export function toObject(obj: any) {
    return JSON.parse(
        JSON.stringify(
            obj,
            (key, value) => (typeof value === 'bigint' ? value.toString() : value) // return everything else unchanged
        )
    );
}

export function populateFilter(event: any, columns: any[], filterList: any[]) {
    columns.map((col) => {
        if (col.filterable) {
            if (col.range) {
                let lower = event.url.searchParams.get(col.sql_name + 'Lower');
                let upper = event.url.searchParams.get(col.sql_name + 'Upper');
                let n = col.sql_name;
                if (lower && upper) {
                    if (col.type == 'string') {
                        let f: any = {};
                        f[col.sql_name] = {
                            lte: String(upper),
                            gte: String(lower)
                        };
                        filterList.push(f);
                    }
                    if (col.type == 'number') {
                        let f: any = {};
                        f[col.sql_name] = {
                            lte: Number(upper),
                            gte: Number(lower)
                        };
                        filterList.push(f);
                    }
                    if (col.type == 'date') {
                        let f: any = {};
                        f[col.sql_name] = {
                            lte: new Date(upper),
                            gte: new Date(lower)
                        };
                        filterList.push(f);
                    }
                    if (col.type == 'datetime') {
                        let f: any = {};
                        f[col.sql_name] = {
                            lte: new Date(upper),
                            gte: new Date(lower)
                        };
                        filterList.push(f);
                    }
                }
            } else {
                let val = event.url.searchParams.get(col.sql_name);
                let f: any = {};
                f[col.sql_name] = val;
                if (val) filterList.push(f);
            }
        }
    });
}
