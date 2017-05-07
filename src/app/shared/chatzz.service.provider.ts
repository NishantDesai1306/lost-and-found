import { FactoryProvider, OpaqueToken } from '@angular/core';
import getCustomChatzzService from './custom-chatzz.service';

export const ChatzzService = new OpaqueToken('ChatzzSerivce');
export const ChatzzServiceProvider: FactoryProvider = {
    provide: ChatzzService,
    useFactory: getCustomChatzzService
};
