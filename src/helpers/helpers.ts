const baseURL: string = 'https://conduit.productionready.io/api';

/* todo: fix typing so T is an instance of array of type ctor... don't know how.. stupid Typescript :-( */
export function get<T extends Array<any> | any>(endpoint: string, ctor?: new () => any, property?: string): Promise<T> {

    return fetch(baseURL + endpoint).then((response: Response): Promise<any> => {
        return response.json();
    }).then((data: any): T => {

        if (property) {
            data = data[property];
        }
        
        if (Array.isArray(data)) {
            let items: any[] = [];
            for (let i = 0; i < data.length; i++) {
                if (ctor) {
                    let item: any = new ctor();
                    deepCopyProperties(data[i], item);

                    items.push(item);
                }
                else {
                    items.push(data[i]);
                }
            }
            return <T>items;
        }
        else {
            if (ctor) {
                let item: any = new ctor();
                deepCopyProperties(data, item);

                return item;
            }
            else {
                return data;
            }
        }
    });
}

function deepCopyProperties(a: any, b: any): void {
    for (let key of Object.getOwnPropertyNames(b)) {
        if (!a[key]) continue;

        if (b[key] instanceof Date) {
            (<Date>b[key]).setTime(Date.parse(a[key]));
        }
        else if (typeof b[key] === 'object') {
            deepCopyProperties(a[key], b[key]);
        }
        else {
            b[key] = a[key];
        }
    }
}