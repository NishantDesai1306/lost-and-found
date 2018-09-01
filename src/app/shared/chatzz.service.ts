import { BehaviorSubject, Observable } from 'rxjs/Rx';
import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';

interface SocketMessage {
    type: string;
    data: any;
}

export class ChatzzServiceImplementation {
    private socket;
    socketMessageBehaviourSubject: BehaviorSubject<SocketMessage>;

    messageTypes = {
        OLD_MESSAGES: 'old-messages',
        NEW_MESSAGE: 'new-message',
        USER_DETAILS: 'user-details',
        MESSAGE_STATUS_CHANGED: 'message-status-changed',
        CHAT_USER_STATUS_CHANGED: 'chat-user-status-changed',
        CHAT_USER_ADDED: 'chat-user-added'
    };

    messageStatus = {
        READ: 'read',
        SENT: 'sent',
        NOT_SENT: 'not_sent'
    };

    constructor(private serverUrl: string) {
        if (!serverUrl) {
            throw new Error('invalid server url provided');
        } else {
            console.log('chatzz service configured to work with server', serverUrl);
        }

        this.socket = io(serverUrl);

        this.socketMessageBehaviourSubject = new BehaviorSubject<any>({});

        this.socket.on('chatzz', (data) => {
            console.log(data.type, data.data);
            this.socketMessageBehaviourSubject.next(data);
        });
    }

    newMessage(): Observable<any> {
        return this
            .socketMessageBehaviourSubject
            .asObservable()
            .share()
            .distinctUntilChanged();
    }

    connect(userId: string) {
        if (!this.socket.connected) {
            this.socket = this.socket.open();
        }

        if (!userId) {
            return console.error('null UserId passed');
        }

        this.socket.emit('connect-user', {userId});
    }

    addChatUser(userToAdd: string, callback) {
        if (!this.socket.connected) {
            return console.log('socket not connected');
        }

        if (!userToAdd) {
            return console.error('null userId passed');
        }

        this.socket.emit('add-chat-user', { userToAdd }, callback);
    }

    sendMessage(userId: string, message: string) {
        if (!this.socket.connected) {
            return console.log('socket not connected');
        }
        if (!userId) {
            return console.error('null recipientUserId passed');
        }
        if (!message) {
            return console.error('null message passed');
        }

        this.socket.emit('send-message', { userId, message });
    }

    getChatMessages(userId: string, fromDate: Date) {
        if (!this.socket.connected) {
            return console.log('socket not connected');
        }
        if (!userId) {
            return console.error(`cannot find chat with ${userId} user`);
        }

        const data = {
            userId,
            fromDate: null
        };

        if (fromDate) {
            data.fromDate = fromDate;
        }

        this.socket.emit('get-old-messages', data);
    }

    markMessageRead(messageId: string) {
        if (!this.socket.connected) {
            return console.log('socket not connected');
        }
        if (!messageId) {
            return new Error('null messageId passed');
        }

        this.socket.emit('message-read', { messageId });
    }

    disconnect() {
        if (!this.socket.connected) {
            return console.log('socket not connected');
        }

        this.socket.disconnect();
    }
}

const getChatzzService = (url: string): ChatzzServiceImplementation => {
    let chatzzServiceInstance: ChatzzServiceImplementation = null;

    if (!chatzzServiceInstance) {
        chatzzServiceInstance = new ChatzzServiceImplementation(url);
    }

    return chatzzServiceInstance;
};

@Injectable({
    providedIn: 'root',
    useFactory: () => getChatzzService('http://localhost:4200/')
})
export class ChatzzService {}
