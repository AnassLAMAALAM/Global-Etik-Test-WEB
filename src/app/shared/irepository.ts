export interface IRepository<T> {
    delete(url: string, id: string): any;
    getById<T>(url: string, id: any): any;
    update(url: string, body: any, id: any): any;
    create(url: string, body: any): any;
    getAll(url: string): any;
}


