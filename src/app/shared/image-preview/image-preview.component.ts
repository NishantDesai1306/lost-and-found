import { Component, Input, EventEmitter, Output, OnDestroy } from '@angular/core';

@Component({
    selector: 'image-preview-component',
    templateUrl: './image-preview.component.html',
})
export class ImagePreviewComponent implements OnDestroy {
    @Input() fileField: string;
    @Input() set images(files: any[]) {
        this.updateFiles(files);
    };
    @Output() remove = new EventEmitter<string>();

    cache = {};
    previews = [];

    ngOnDestroy() {
        this.cache = {};
        this.previews = [];
    }

    removeFile(id) {
        delete this.cache[id];
        this.remove.emit(id);
    }

    async getBase64(id, file): Promise<any> {
        return new Promise((resolve, reject) => {
            // first check in cache
            if (this.cache[id]) {
                return resolve(this.cache[id]);
            }

            const reader = new FileReader();

            reader.readAsDataURL(file);

            reader.onload = () => {
                const base64String = reader.result;

                this.cache[id] = base64String;
                resolve(base64String);
            };
            reader.onerror = (error) => {
                reject(error);
            };
        });
    }

    async updateFiles(files: any[]) {
        const promises = files.map(async (file) => {
            const value = file[this.fileField];

            if (value instanceof File) {
                return this.getBase64(file.id, value);
            } else if (typeof value === 'string') {
                return Promise.resolve(value);
            }
        });
        const values = await Promise.all(promises);

        this.previews = files.map(({id}, index) => {

            const base64Regex = /^([A-Za-z0-9+/]{4})*([A-Za-z0-9+/]{4}|[A-Za-z0-9+/]{3}=|[A-Za-z0-9+/]{2}==)$/;
            const value = values[index];
            const finalObj = {
                id,
                base64: undefined,
                url: undefined
            };

            if (base64Regex.test(value)) {
                finalObj.base64 = value;
            } else {
                finalObj.url = value;
            }

            return finalObj;
        });
    }
}
