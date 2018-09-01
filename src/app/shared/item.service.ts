import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs/Rx';
import { Injectable } from '@angular/core';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable({
    providedIn: 'root'
})
export class ItemService {
    apiUrl = '/api/item';

    constructor(private http: HttpClient) {}

    createItem(title: string, description: string, images: Array<String>) {
        const self = this;
        const createItemUrl = this.apiUrl + '/';

        return self.http.post(createItemUrl, {data: {title, description, images}})
            // .map((res: any) => res.json())
            .catch((error: any) => Observable.throw(error || 'Server error'));
    }

    getItem(id: string) {
        const getItemUrl = this.apiUrl + '/' + id;
        return this.http.get(getItemUrl)
            // .map((res: any) => res.json())
            .catch((error: any) => Observable.throw(error || 'Server Error'));
    };

    getItems() {
        return this.http.get(this.apiUrl)
            // .map((res: any) => res.json())
            .catch((error: any) => Observable.throw(error || 'Server Error'));
    }

    updateItem(id: string, title: string, description: string, images: Array<String>) {
        const self = this;
        const updateItemUrl = this.apiUrl + '/' + id;

        return self.http.post(updateItemUrl, {data: {title, description, images}})
            // .map((res: any) => res.json())
            .catch((error: any) => Observable.throw(error || 'Server error'));
    }

    removeImage(item: any, image: any) {
        const removeImageUrl = this.apiUrl + '/' + (item._id || item) + '/' + (image._id || image) + '/remove-image';

        return this.http.post(removeImageUrl, {})
            // .map((res: any) => res.json())
            .catch((error: any) => Observable.throw(error || 'Server error'));
    }

    deleteItem(item: any) {
        const deleteItemUrl = this.apiUrl + '/' + (item._id || item);

        return this.http.delete(deleteItemUrl)
            // .map((res: any) => res.json())
    }
}