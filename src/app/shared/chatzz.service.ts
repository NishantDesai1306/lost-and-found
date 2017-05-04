import { BehaviorSubject, Observable } from 'rxjs/Rx';
import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';

interface SocketMessage {
    type: string;
    data: any;
}

@Injectable()
class ChatzzService {
    private socket;
    socketMessageBehaviousSubject: BehaviorSubject<SocketMessage>;

    messageTypes = {
        OLD_MESSAGES: 'old-messages',
        NEW_MESSAGE: 'new-message',
        USER_DETAILS: 'user-details',
        MESSAGE_STATUS_CHANGED: 'message-status-changed',
        CHAT_USER_STATUS_CHANGED: 'chat-user-status-changed'
    };

    messageStatus = {
        READ: 'read',
        SENT: 'sent',
        NOT_SENT: 'not_sent'
    };

    constructor(private serverUrl: string) {
        if(!serverUrl) {
            throw new Error('invalid server url provided');
        }
        else {
            console.log('chatzz service configured to work with server', serverUrl);
        }

        this.socket = io(serverUrl);

        this.socketMessageBehaviousSubject = new BehaviorSubject<any>({});

        this.socket.on('chatzz', (data) => {
            console.log(data.type, data.data);
            this.socketMessageBehaviousSubject.next(data);
        });
    }

    newMessage(): Observable<any> {
        return this
            .socketMessageBehaviousSubject
            .asObservable()
            .share()
            .distinctUntilChanged();
    }

    connect(userId: string) {
        if (!this.socket.connected) {
            this.socket = this.socket.open();
        }

        if(!userId) {
            return console.error('null UserId passed');
        }

        this.socket.emit('connect-user', {userId});
    }

    addChatUser(userToAdd: string) {
        if (!this.socket.connected) {
            return console.log('socket not connected');
        }

        if (!userToAdd) {
            return console.error('null userId passed');
        }

        this.socket.emit('add-chat-user', { userToAdd });
    }

    sendMessage(toUser: string, message: string) {
        if (!this.socket.connected) {
            return console.log('socket not connected');
        }
        if (!toUser) {
            return console.error('null recipientUserId passed');
        }
        if (!message) {
            return console.error('null message passed');
        }

        this.socket.emit('send-message', { toUser, message });
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

const getChatzzService = (url: string): ChatzzService => {
    let chatzzServiceInstance: ChatzzService = null;

    if(!chatzzServiceInstance) {
        chatzzServiceInstance = new ChatzzService(url);
    }
    return chatzzServiceInstance;
};

const dummyTest = (url): ChatzzService => {return getChatzzService(url)};

export default dummyTest;