import { TOKEN_IDENTIFIER } from '../index';

const baseURL: string = 'https://conduit.productionready.io/api';

/* todo: fix typing so T is an instance of array of type ctor... don't know how.. stupid Typescript :-( */
export function get<T extends Array<any> | any>(endpoint: string, ctor?: new () => any, property?: string): Promise<T> {
    let options: RequestInit = {};

    if(localStorage.getItem(TOKEN_IDENTIFIER) !== null) {
        options.headers = new Headers({
            'Authorization': 'Token ' + localStorage.getItem(TOKEN_IDENTIFIER)
        })
    }

    return fetch(baseURL + endpoint, options).then((response: Response): Promise<any> => {
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

export function deepCopyProperties(a: any, b: any): void {
    if (Array.isArray(b)) {
        for (let i = 0; i < a.length; i++) {
            b[i] = a[i];
        }
    }
    else {
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
}

export function post(endpoint: string, data: any): Promise<any> {
    return send(endpoint, 'post', data);
}

export function put(endpoint: string, data: any): Promise<any> {
    return send(endpoint, 'put', data);
}

export function del(endpoint: string): Promise<any> {
    return send(endpoint, 'delete', {});
}

function send(endpoint: string, method: string, data: any): Promise<any> {
    let options: RequestInit =  {
        method: method,
        headers: new Headers({
          'Accept': 'application/json, text/plain, */*',
          'Content-Type': 'application/json'
        }),
        body: JSON.stringify(data)
    };

    if(localStorage.getItem(TOKEN_IDENTIFIER) !== null) {
        (<Headers>options.headers).append('Authorization', 'Token ' + localStorage.getItem(TOKEN_IDENTIFIER));
    }

    return fetch(baseURL + endpoint, options).then((response: Response): Promise<any> => response.json());
}