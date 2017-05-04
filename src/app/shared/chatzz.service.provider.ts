import { FactoryProvider, OpaqueToken } from '@angular/core';
import dummyTest from './chatzz.service';

export const ChatzzService = new OpaqueToken('ChatzzSerivce');
export const ChatzzServiceProvider: FactoryProvider = {
    provide: ChatzzService,
    useFactory: () => dummyTest('http://localhost:4200/')
};
