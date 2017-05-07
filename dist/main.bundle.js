webpackJsonp([1,4],{

/***/ 175:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__shared_auth_service__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__(22);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DashboardCanActivateGuard; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var DashboardCanActivateGuard = (function () {
    function DashboardCanActivateGuard(authSerivce, router) {
        this.authSerivce = authSerivce;
        this.router = router;
    }
    DashboardCanActivateGuard.prototype.canActivate = function () {
        if (this.authSerivce.isUserLoggedIn()) {
            return true;
        }
        else {
            var navigationExtras = {
                queryParams: { 'errorMessage': 'You have to login first' }
            };
            this.router.navigate(['/login'], navigationExtras);
            return false;
        }
    };
    return DashboardCanActivateGuard;
}());
DashboardCanActivateGuard = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["d" /* Injectable */])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__shared_auth_service__["a" /* AuthSerivce */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__shared_auth_service__["a" /* AuthSerivce */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__angular_router__["b" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_router__["b" /* Router */]) === "function" && _b || Object])
], DashboardCanActivateGuard);

var _a, _b;
//# sourceMappingURL=app.guards.js.map

/***/ }),

/***/ 176:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__shared_user_service__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__shared_notification_service__ = __webpack_require__(57);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ChangePasswordComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var ChangePasswordComponent = (function () {
    function ChangePasswordComponent(userService, router, notificationService) {
        this.userService = userService;
        this.router = router;
        this.notificationService = notificationService;
        this.watchers = [];
        this.user = {
            oldPassword: '',
            newPassword: '',
            confirmNewPassword: ''
        };
        this.newPasswordError = '';
        this.newPasswordMatchError = '';
        this.oldPasswordError = '';
    }
    ChangePasswordComponent.prototype.changePassword = function () {
        var _this = this;
        this.oldPasswordError = '';
        this.newPasswordError = '';
        this.newPasswordMatchError = '';
        if (!this.user.oldPassword) {
            this.oldPasswordError = 'Old Password can`t be empty';
        }
        if (!this.user.newPassword) {
            this.newPasswordError = 'New Password can`t be empty';
        }
        if (this.user.newPassword !== this.user.confirmNewPassword) {
            this.newPasswordMatchError = 'New Password and Confirm New Password must match';
        }
        if (this.oldPasswordError || this.newPasswordError || this.newPasswordMatchError) {
            return;
        }
        this.userService
            .changePassword(this.user.oldPassword, this.user.newPassword)
            .subscribe(function (res) {
            if (res.status) {
                _this.notificationService.createSimpleNotification('Password Changed Succesfully');
                _this.router.navigateByUrl('/dashboard/user');
            }
            else {
                _this.oldPasswordError = res.reason;
            }
        });
    };
    ChangePasswordComponent.prototype.ngOnInit = function () {
        var _this = this;
        var watcher = this.userService.getUser().subscribe(function (user) {
            _this.user = user;
        });
        this.watchers.push(watcher);
    };
    ChangePasswordComponent.prototype.ngOnDestroy = function () {
        this.watchers.forEach(function (watcher) {
            watcher.unsubscribe();
        });
    };
    return ChangePasswordComponent;
}());
ChangePasswordComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["_11" /* Component */])({
        template: __webpack_require__(567)
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__shared_user_service__["a" /* UserService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__shared_user_service__["a" /* UserService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__angular_router__["b" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_router__["b" /* Router */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_3__shared_notification_service__["a" /* NotificationService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__shared_notification_service__["a" /* NotificationService */]) === "function" && _c || Object])
], ChangePasswordComponent);

var _a, _b, _c;
//# sourceMappingURL=change-password.component.js.map

/***/ }),

/***/ 177:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__services_notification_count_service__ = __webpack_require__(74);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__shared_chatzz_service_provider__ = __webpack_require__(56);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_flex_layout__ = __webpack_require__(73);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__shared_user_service__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__angular_material__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_rxjs_Rx__ = __webpack_require__(53);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_rxjs_Rx___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_rxjs_Rx__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ChatComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};








var ChatComponent = (function () {
    function ChatComponent(userSerivce, media, route, chatzzService, notificationCountService) {
        this.userSerivce = userSerivce;
        this.media = media;
        this.route = route;
        this.chatzzService = chatzzService;
        this.notificationCountService = notificationCountService;
        this.watchers = [];
        this.extraMargin = 65;
        this.chatData = {
            companionUser: {
                _id: ''
            },
            messages: [],
            newMessage: '',
            lastUserIdWithImage: ''
        };
        this.connectedUsers = [];
        this.missedMessageMap = {};
        this.userSerivce = userSerivce;
        this.screenHeight = window.innerHeight - this.extraMargin;
        this.companionUserBehaviourSubject = new __WEBPACK_IMPORTED_MODULE_7_rxjs_Rx__["BehaviorSubject"](null);
    }
    ChatComponent.prototype.isScreeSizeLg = function () {
        return this.media.isActive('lg');
    };
    ChatComponent.prototype.ngOnInit = function () {
        var _this = this;
        var watcher;
        watcher = this.userSerivce
            .getUser()
            .subscribe(function (newUser) {
            _this.userId = newUser.getId();
            _this.username = newUser.getUsername();
            _this.connectedUsers = newUser.getConnectedUsers();
            _this.missedMessageMap = newUser.getChatData().missedMessages;
            watcher = _this.route.queryParams.subscribe(function (data) {
                if (data && data.user) {
                    var requiredUser = _this.connectedUsers.find(function (connectedUser) {
                        return data.user === connectedUser._id;
                    });
                    _this.selectCompanionUser(requiredUser);
                }
            });
        });
        this.watchers.push(watcher);
        this.notificationCountService.setCount(0);
        this.notificationCountService.setUpdateFlag(false);
        if (this.isScreeSizeLg()) {
            this.sideNav.open();
        }
        this.companionUserBehaviourSubject.subscribe(function (companionUserObj) {
            if (!companionUserObj) {
                return;
            }
            _this.chatData.companionUser = companionUserObj;
            _this.loadMessages(_this.chatData.companionUser._id);
        });
        watcher = this.chatzzService.newMessage().subscribe(function (message) {
            switch (message.type) {
                case _this.chatzzService.messageTypes.OLD_MESSAGES: {
                    if (message.data && message.data.length) {
                        var chatRoomId = message.data[0].chatRoom;
                        _this.missedMessageMap[chatRoomId] = 0;
                    }
                    message.data.map(function (oldMessage) {
                        if (oldMessage.to.user._id === _this.userId && oldMessage.status !== _this.chatzzService.messageStatus.READ) {
                            _this.chatzzService.markMessageRead(oldMessage._id);
                        }
                    });
                    _this.chatData.messages = message.data;
                    _this.chatData.messages.forEach(function (messageObj) {
                        if (messageObj.from.user._id !== _this.chatData.lastUserIdWithImage) {
                            _this.chatData.lastUserIdWithImage = messageObj.from.user._id;
                            messageObj.showImage = true;
                        }
                    });
                    break;
                }
                case _this.chatzzService.messageTypes.NEW_MESSAGE: {
                    if (message.data.to.user._id === _this.userId &&
                        message.data.status !== _this.chatzzService.messageStatus.READ &&
                        _this.chatData.companionUser._id === message.data.from.user._id) {
                        _this.chatData.messages.push(message.data);
                        _this.chatzzService.markMessageRead(message.data._id);
                    }
                    else {
                        if (_this.missedMessageMap[message.data.chatRoom]) {
                            _this.missedMessageMap[message.data.chatRoom]++;
                        }
                        else {
                            _this.missedMessageMap[message.data.chatRoom] = 1;
                        }
                    }
                    if (message.data.from.user._id !== _this.chatData.lastUserIdWithImage) {
                        message.data.showImage = true;
                        _this.chatData.lastUserIdWithImage = message.data.from.user._id;
                    }
                    if (message.data.from.user._id === _this.userId) {
                        _this.chatData.messages.push(message.data);
                    }
                    break;
                }
                case _this.chatzzService.messageTypes.MESSAGE_STATUS_CHANGED:
                    {
                        _this.chatData.messages.forEach(function (messageObj) {
                            if (messageObj._id === message.data.message._id) {
                                messageObj = Object.assign(messageObj, message.data.message);
                            }
                        });
                        break;
                    }
                case _this.chatzzService.messageTypes.CHAT_USER_STATUS_CHANGED: {
                    _this.connectedUsers.forEach(function (connectedUser) {
                        if (connectedUser._id === message.data.user._id) {
                            connectedUser.status = message.data.status;
                            connectedUser.lastOnline = message.data.lastOnline;
                        }
                    });
                }
            }
        });
        this.watchers.push(watcher);
        watcher = this.media.subscribe(function (change) {
            _this.screenHeight = window.innerHeight - _this.extraMargin;
            if (_this.isScreeSizeLg()) {
                _this.sideNav.open();
            }
            else {
                _this.sideNav.close();
            }
        });
        this.watchers.push(watcher);
    };
    ChatComponent.prototype.ngOnDestroy = function () {
        this.notificationCountService.setUpdateFlag(true);
        this.watchers.forEach(function (watcher) {
            watcher.unsubscribe();
        });
    };
    ChatComponent.prototype.selectCompanionUser = function (user) {
        this.companionUserBehaviourSubject.next(user);
    };
    ChatComponent.prototype.sendMessage = function (message) {
        if (message) {
            this.chatzzService.sendMessage(this.chatData.companionUser._id, message);
        }
    };
    ChatComponent.prototype.loadMessages = function (userId) {
        this.chatzzService.getChatMessages(userId);
    };
    ChatComponent.prototype.getMessageAlignment = function (messageObj) {
        return (messageObj.from.user._id === this.userId ? "end" : "start") + " start";
    };
    ChatComponent.prototype.getMessageStatusIcon = function (messageObj) {
        switch (messageObj.status) {
            case this.chatzzService.messageStatus.NOT_SENT: return 'done';
            case this.chatzzService.messageStatus.SENT:
            case this.chatzzService.messageStatus.READ: return 'done_all';
        }
    };
    ChatComponent.prototype.isMessageRead = function (messageObj) {
        return messageObj.status === this.chatzzService.messageStatus.READ;
    };
    ChatComponent.prototype.replaceSlashes = function (url) {
        return url.replace(/\\/g, '/');
    };
    return ChatComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__angular_core__["_15" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_6__angular_material__["f" /* MdSidenav */]),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_6__angular_material__["f" /* MdSidenav */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_6__angular_material__["f" /* MdSidenav */]) === "function" && _a || Object)
], ChatComponent.prototype, "sideNav", void 0);
ChatComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__angular_core__["_11" /* Component */])({
        template: __webpack_require__(568)
    }),
    __param(3, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__angular_core__["G" /* Inject */])(__WEBPACK_IMPORTED_MODULE_1__shared_chatzz_service_provider__["b" /* ChatzzService */])),
    __metadata("design:paramtypes", [typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_5__shared_user_service__["a" /* UserService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5__shared_user_service__["a" /* UserService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_3__angular_flex_layout__["b" /* ObservableMedia */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__angular_flex_layout__["b" /* ObservableMedia */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_2__angular_router__["c" /* ActivatedRoute */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_router__["c" /* ActivatedRoute */]) === "function" && _d || Object, Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_0__services_notification_count_service__["a" /* NotificationCountService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__services_notification_count_service__["a" /* NotificationCountService */]) === "function" && _e || Object])
], ChatComponent);

var _a, _b, _c, _d, _e;
//# sourceMappingURL=chat.component.js.map

/***/ }),

/***/ 178:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__shared_user_service__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(1);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DashboardComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var DashboardComponent = (function () {
    function DashboardComponent(userSerivce) {
        this.userSerivce = userSerivce;
    }
    DashboardComponent.prototype.ngOnInit = function () {
        var self = this;
        self.userSerivce
            .getUser()
            .subscribe(function (newUser) {
            self.username = newUser.getUsername();
        });
    };
    return DashboardComponent;
}());
DashboardComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["_11" /* Component */])({
        template: __webpack_require__(569)
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__shared_user_service__["a" /* UserService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__shared_user_service__["a" /* UserService */]) === "function" && _a || Object])
], DashboardComponent);

var _a;
//# sourceMappingURL=dashboard.component.js.map

/***/ }),

/***/ 179:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__shared_item_service__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ngx_uploader__ = __webpack_require__(86);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__shared_notification_service__ = __webpack_require__(57);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_material__ = __webpack_require__(21);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CreateItemComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};





var CreateItemComponent = (function () {
    function CreateItemComponent(zone, itemService, notificationService, dialogRef) {
        this.zone = zone;
        this.itemService = itemService;
        this.notificationService = notificationService;
        this.dialogRef = dialogRef;
        this.item = {
            title: '',
            description: ''
        };
        this.titleError = '';
        this.descriptionError = '';
        this.uploadError = '';
        this.sizeLimit = 5 * 1024 * 1024;
        this.creating = false;
        this.previewData = [];
        this.imageUploadIds = [];
        this.inputUploadEvent = new __WEBPACK_IMPORTED_MODULE_1__angular_core__["t" /* EventEmitter */]();
    }
    CreateItemComponent.prototype.ngOnInit = function () {
        this.uploaderOptions = new __WEBPACK_IMPORTED_MODULE_2_ngx_uploader__["b" /* NgUploaderOptions */]({
            url: '/api/upload',
            filterExtensions: true,
            allowedExtensions: ['jpeg', 'jpg', 'png'],
            multiple: true,
            maxSize: this.sizeLimit,
            autoUpload: false,
            previewUrl: true,
        });
    };
    CreateItemComponent.prototype.handleUpload = function (data) {
        var _this = this;
        var self = this;
        setTimeout(function () {
            _this.zone
                .run(function () {
                self.uploadProgress = data.progress.percent;
                if (data && data.response) {
                    var responseObj = JSON.parse(data.response);
                    if (_this.imageUploadIds.indexOf(responseObj.data) === -1) {
                        _this.imageUploadIds.push(responseObj.data);
                    }
                }
                if (_this.imageUploadIds.length === _this.previewData.length && !_this.creating) {
                    self.uploadProgress = 0;
                    _this.creating = true;
                    _this.itemService.createItem(_this.item.title, _this.item.description, _this.imageUploadIds)
                        .subscribe(function (serverResponse) {
                        if (serverResponse.status) {
                            _this.dialogRef.close();
                        }
                        else {
                            console.error(serverResponse.reason);
                        }
                    });
                }
            });
        });
    };
    CreateItemComponent.prototype.handlePreviewData = function (data) {
        this.previewData.push(data);
    };
    CreateItemComponent.prototype.createItem = function () {
        this.titleError = this.descriptionError = '';
        if (!this.item.title) {
            this.titleError = 'Title can`t be empty';
        }
        if (!this.item.description) {
            this.descriptionError = 'Description can`t be empty';
        }
        if (this.previewData && !this.previewData.length) {
            return this.notificationService.createSimpleNotification('Aleast one image is required');
        }
        if (this.titleError || this.descriptionError) {
            return;
        }
        this.inputUploadEvent.emit('startUpload');
    };
    return CreateItemComponent;
}());
CreateItemComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["_11" /* Component */])({
        template: __webpack_require__(570)
    }),
    __param(0, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["G" /* Inject */])(__WEBPACK_IMPORTED_MODULE_1__angular_core__["W" /* NgZone */])),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_core__["W" /* NgZone */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_core__["W" /* NgZone */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_0__shared_item_service__["a" /* ItemService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__shared_item_service__["a" /* ItemService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_3__shared_notification_service__["a" /* NotificationService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__shared_notification_service__["a" /* NotificationService */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_4__angular_material__["e" /* MdDialogRef */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__angular_material__["e" /* MdDialogRef */]) === "function" && _d || Object])
], CreateItemComponent);

var _a, _b, _c, _d;
//# sourceMappingURL=create-item.component.js.map

/***/ }),

/***/ 180:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__shared_item_service__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ngx_uploader__ = __webpack_require__(86);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__shared_notification_service__ = __webpack_require__(57);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__shared_confirm_service__ = __webpack_require__(75);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_material__ = __webpack_require__(21);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EditItemComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};






var EditItemComponent = (function () {
    function EditItemComponent(zone, itemService, notificationService, confirmService, dialogRef) {
        this.zone = zone;
        this.itemService = itemService;
        this.notificationService = notificationService;
        this.confirmService = confirmService;
        this.dialogRef = dialogRef;
        this.titleError = '';
        this.descriptionError = '';
        this.uploadError = '';
        this.sizeLimit = 5 * 1024 * 1024;
        this.updating = false;
        this.previewData = [];
        this.imageUploadIds = [];
        this.inputUploadEvent = new __WEBPACK_IMPORTED_MODULE_1__angular_core__["t" /* EventEmitter */]();
    }
    EditItemComponent.prototype.ngOnInit = function () {
        this.uploaderOptions = new __WEBPACK_IMPORTED_MODULE_2_ngx_uploader__["b" /* NgUploaderOptions */]({
            url: '/api/upload',
            filterExtensions: true,
            allowedExtensions: ['jpeg', 'jpg', 'png'],
            multiple: true,
            maxSize: this.sizeLimit,
            autoUpload: false,
            previewUrl: true,
        });
    };
    EditItemComponent.prototype.handleUpload = function (data) {
        var _this = this;
        var self = this;
        setTimeout(function () {
            _this.zone
                .run(function () {
                self.uploadProgress = data.progress.percent;
                if (data && data.response) {
                    var responseObj = JSON.parse(data.response);
                    if (_this.imageUploadIds.indexOf(responseObj.data) === -1) {
                        _this.imageUploadIds.push(responseObj.data);
                    }
                }
                if (_this.imageUploadIds.length === _this.item.images.length + _this.previewData.length && !_this.updating) {
                    self.uploadProgress = 0;
                    _this.updating = true;
                    _this.itemService.updateItem(_this.item._id, _this.item.title, _this.item.description, _this.imageUploadIds)
                        .subscribe(function (serverResponse) {
                        if (serverResponse.status) {
                            _this.dialogRef.close();
                        }
                        else {
                            console.error(serverResponse.reason);
                        }
                    });
                }
            });
        });
    };
    EditItemComponent.prototype.replaceSlashes = function (url) {
        return url.replace(/\\/g, '/');
    };
    EditItemComponent.prototype.handlePreviewData = function (data) {
        this.previewData.push(data);
    };
    EditItemComponent.prototype.deleteImage = function (index) {
        var _this = this;
        if (this.item.images && this.item.images.length === 1) {
            return this.notificationService.createSimpleNotification('Item should have atleast single image');
        }
        var image = this.item.images[index];
        this.confirmService.confirm('Confirm', 'Are you sure you want to remove this image ?')
            .subscribe(function (result) {
            if (result) {
                _this.itemService.removeImage(_this.item, image).subscribe(function (res) {
                    if (res.status) {
                        _this.item.splice(index, 1);
                    }
                });
            }
        });
    };
    EditItemComponent.prototype.editItem = function () {
        var _this = this;
        this.titleError = this.descriptionError = '';
        if (!this.item.title) {
            this.titleError = 'Title can`t be empty';
        }
        if (!this.item.description) {
            this.descriptionError = 'Description can`t be empty';
        }
        if (this.titleError || this.descriptionError) {
            return;
        }
        this.item.images.forEach(function (image) {
            _this.imageUploadIds.push(image._id.toString());
        });
        if (this.previewData && !this.previewData.length) {
            this.itemService.updateItem(this.item._id, this.item.title, this.item.description, this.imageUploadIds)
                .subscribe(function (serverResponse) {
                if (serverResponse.status) {
                    console.log('completed');
                }
                else {
                    console.error(serverResponse.reason);
                }
            });
        }
        else {
            this.inputUploadEvent.emit('startUpload');
        }
    };
    return EditItemComponent;
}());
EditItemComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["_11" /* Component */])({
        template: __webpack_require__(571)
    }),
    __param(0, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["G" /* Inject */])(__WEBPACK_IMPORTED_MODULE_1__angular_core__["W" /* NgZone */])),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_core__["W" /* NgZone */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_core__["W" /* NgZone */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_0__shared_item_service__["a" /* ItemService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__shared_item_service__["a" /* ItemService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_3__shared_notification_service__["a" /* NotificationService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__shared_notification_service__["a" /* NotificationService */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_4__shared_confirm_service__["a" /* ConfirmService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__shared_confirm_service__["a" /* ConfirmService */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_5__angular_material__["e" /* MdDialogRef */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5__angular_material__["e" /* MdDialogRef */]) === "function" && _e || Object])
], EditItemComponent);

var _a, _b, _c, _d, _e;
//# sourceMappingURL=edit-item.component.js.map

/***/ }),

/***/ 181:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__services_notification_count_service__ = __webpack_require__(74);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__shared_chatzz_service_provider__ = __webpack_require__(56);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__shared_item_service__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_material__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_flex_layout__ = __webpack_require__(73);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__create_item_create_item_component__ = __webpack_require__(179);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__shared_user_service__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__shared_confirm_service__ = __webpack_require__(75);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MainComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};









var MainComponent = (function () {
    function MainComponent(dialog, media, itemService, userService, confirmService, chatzzService, notificationCountService) {
        var _this = this;
        this.dialog = dialog;
        this.media = media;
        this.itemService = itemService;
        this.userService = userService;
        this.confirmService = confirmService;
        this.chatzzService = chatzzService;
        this.notificationCountService = notificationCountService;
        this.watchers = [];
        this.leftItems = [];
        this.rightItems = [];
        this.loadingItems = false;
        this.copy = {
            leftItems: this.leftItems,
            rightItems: this.rightItems
        };
        var singleLaneModes = ['sm', 'xs'];
        var watcher = this.media.subscribe(function (change) {
            if (singleLaneModes.indexOf(change.mqAlias) > -1) {
                _this.leftItems = _this.copy.leftItems.concat(_this.copy.rightItems);
            }
            else {
                _this.leftItems = _this.copy.leftItems;
                _this.rightItems = _this.copy.rightItems;
            }
        });
        this.watchers.push(watcher);
    }
    MainComponent.prototype.loadItems = function () {
        var _this = this;
        this.loadingItems = true;
        this.itemService.getItems().subscribe(function (res) {
            if (res.status) {
                var items = res.data;
                _this.copy.rightItems = _this.rightItems = items.splice(0, items.length / 2);
                _this.copy.leftItems = _this.leftItems = items;
                _this.loadingItems = false;
            }
            else {
                console.error(res.reason);
            }
        });
    };
    MainComponent.prototype.ngOnInit = function () {
        var _this = this;
        var watcher;
        this.loadItems();
        watcher = this.userService.getUser().subscribe(function (user) {
            _this.user = user;
            if (user.getId()) {
                _this.chatzzService.connect(user.getId());
            }
        });
        this.watchers.push(watcher);
        watcher = this.chatzzService.newMessage().subscribe(function (message) {
            switch (message.type) {
                case _this.chatzzService.messageTypes.USER_DETAILS: {
                    var allMissedMessages = Object.values(message.data.missedMessages);
                    var allMissedMessagesCount = allMissedMessages.reduce(function (partialSum, messageSet) {
                        return partialSum + messageSet.length;
                    }, 0);
                    _this.notificationCountService.setCount(allMissedMessagesCount);
                    _this.user.setConnectedUsers(message.data.connectedUsers);
                    var allConnectedUsers = Object.keys(message.data.missedMessages);
                    allConnectedUsers.forEach(function (connectedUser) {
                        _this.user.chatData.missedMessages[connectedUser] = message.data.missedMessages[connectedUser].length;
                    });
                    break;
                }
                case _this.chatzzService.messageTypes.NEW_MESSAGE: {
                    if (_this.user.chatData.missedMessages[message.data.chatRoom]) {
                        _this.user.chatData.missedMessages[message.data.chatRoom]++;
                    }
                    else {
                        _this.user.chatData.missedMessages[message.data.chatRoom] = 1;
                    }
                    _this.notificationCountService.addToCount(1);
                    break;
                }
            }
        });
        this.watchers.push(watcher);
    };
    MainComponent.prototype.ngOnDestroy = function () {
        this.watchers.forEach(function (watcher) {
            watcher.unsubscribe();
        });
    };
    MainComponent.prototype.createItem = function () {
        var _this = this;
        this.dialog.open(__WEBPACK_IMPORTED_MODULE_6__create_item_create_item_component__["a" /* CreateItemComponent */], {
            width: '600px',
        });
        this.dialog.afterAllClosed.subscribe(function (data) {
            _this.loadItems();
        });
    };
    return MainComponent;
}());
MainComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__angular_core__["_11" /* Component */])({
        template: __webpack_require__(573)
    }),
    __param(5, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__angular_core__["G" /* Inject */])(__WEBPACK_IMPORTED_MODULE_1__shared_chatzz_service_provider__["b" /* ChatzzService */])),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_4__angular_material__["c" /* MdDialog */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__angular_material__["c" /* MdDialog */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_5__angular_flex_layout__["b" /* ObservableMedia */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5__angular_flex_layout__["b" /* ObservableMedia */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_2__shared_item_service__["a" /* ItemService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__shared_item_service__["a" /* ItemService */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_7__shared_user_service__["a" /* UserService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_7__shared_user_service__["a" /* UserService */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_8__shared_confirm_service__["a" /* ConfirmService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_8__shared_confirm_service__["a" /* ConfirmService */]) === "function" && _e || Object, Object, typeof (_f = typeof __WEBPACK_IMPORTED_MODULE_0__services_notification_count_service__["a" /* NotificationCountService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__services_notification_count_service__["a" /* NotificationCountService */]) === "function" && _f || Object])
], MainComponent);

var _a, _b, _c, _d, _e, _f;
//# sourceMappingURL=main.component.js.map

/***/ }),

/***/ 182:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__shared_item_service__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(1);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ViewItemComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var ViewItemComponent = (function () {
    function ViewItemComponent(itemService) {
        this.itemService = itemService;
        this.itemImages = [];
    }
    ViewItemComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.itemImages = this.item.images.map(function (image) {
            return {
                thumbnail: _this.replaceSlashes(image.path),
                image: _this.replaceSlashes(image.path)
            };
        });
    };
    ViewItemComponent.prototype.replaceSlashes = function (url) {
        return url.replace(/\\/g, '/');
    };
    return ViewItemComponent;
}());
ViewItemComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["_11" /* Component */])({
        template: __webpack_require__(574)
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__shared_item_service__["a" /* ItemService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__shared_item_service__["a" /* ItemService */]) === "function" && _a || Object])
], ViewItemComponent);

var _a;
//# sourceMappingURL=view-item.component.js.map

/***/ }),

/***/ 183:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ngx_uploader__ = __webpack_require__(86);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_object_fit_images__ = __webpack_require__(564);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_object_fit_images___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_object_fit_images__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__shared_user_service__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__shared_notification_service__ = __webpack_require__(57);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UserComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};






__WEBPACK_IMPORTED_MODULE_3_object_fit_images___default()('img.avatar-100');
var UserComponent = (function () {
    function UserComponent(userService, zone, router, notificationService) {
        this.userService = userService;
        this.zone = zone;
        this.router = router;
        this.notificationService = notificationService;
        this.watchers = [];
        this.temp = 50;
        this.error = '';
        this.sizeLimit = 5 * 1024 * 1024;
        this.loading = false;
        this.uploadPromise = Promise.resolve("");
        this.inputUploadEvent = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["t" /* EventEmitter */]();
    }
    UserComponent.prototype.saveChanges = function () {
        var _this = this;
        this.error = '';
        if (!this.user.username) {
            return this.error = 'Username can`t be empty';
        }
        if (!this.user.email) {
            return this.error = 'Email can`t be empty';
        }
        var watcher = this.userService
            .changeDetails(this.user.username, this.user.email)
            .subscribe(function (res) {
            if (res.status) {
                _this.loading = false;
                _this.router.navigateByUrl('/dashboard');
                _this.notificationService.createSimpleNotification('User Details changed successfully');
            }
            else {
                _this.error = res.reason;
            }
        });
        this.watchers.push(watcher);
    };
    UserComponent.prototype.handleUpload = function (data) {
        var _this = this;
        setTimeout(function () {
            _this.zone
                .run(function () {
                _this.uploadProgress = data.progress.percent;
                if (data && data.response && !_this.loading) {
                    var serverResponse = JSON.parse(data.response);
                    _this.uploadProgress = 0;
                    if (serverResponse.status) {
                        _this.userService.changeProfilePicture(serverResponse.data).subscribe(function () { });
                        _this.notificationService.createSimpleNotification('Profile Picture changed successfully');
                    }
                    else {
                        console.error(serverResponse.reason);
                    }
                }
            });
        });
    };
    UserComponent.prototype.beforeUpload = function (uploadingFile) {
        if (uploadingFile.size > this.sizeLimit) {
            uploadingFile.setAbort();
            this.error = 'Can\'t upload file with size more than 5MB';
        }
    };
    UserComponent.prototype.handlePreviewData = function (data) {
        this.previewData = data;
    };
    UserComponent.prototype.ngOnInit = function () {
        var _this = this;
        var watcher = this
            .userService
            .getUser()
            .subscribe(function (user) {
            _this.user = Object.assign({}, user);
        });
        this.watchers.push(watcher);
        this.uploaderOptions = new __WEBPACK_IMPORTED_MODULE_2_ngx_uploader__["b" /* NgUploaderOptions */]({
            url: '/api/upload',
            filterExtensions: true,
            allowedExtensions: ['jpeg', 'jpg', 'png'],
            autoUpload: true,
            maxUploads: 1,
            previewUrl: true,
        });
    };
    UserComponent.prototype.ngOnDestroy = function () {
        this.watchers.forEach(function (watcher) {
            watcher.unsubscribe();
        });
    };
    return UserComponent;
}());
UserComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_11" /* Component */])({ template: __webpack_require__(575) }),
    __param(1, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["G" /* Inject */])(__WEBPACK_IMPORTED_MODULE_0__angular_core__["W" /* NgZone */])),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_4__shared_user_service__["a" /* UserService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__shared_user_service__["a" /* UserService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["W" /* NgZone */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["W" /* NgZone */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_5__shared_notification_service__["a" /* NotificationService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5__shared_notification_service__["a" /* NotificationService */]) === "function" && _d || Object])
], UserComponent);

var _a, _b, _c, _d;
//# sourceMappingURL=user.component.js.map

/***/ }),

/***/ 184:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__shared_auth_service__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(1);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomeComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var HomeComponent = (function () {
    function HomeComponent(authService) {
        this.authService = authService;
    }
    HomeComponent.prototype.ngOnInit = function () {
        this.isUserLoggedIn = this.authService.isUserLoggedIn();
    };
    return HomeComponent;
}());
HomeComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["_11" /* Component */])({
        selector: 'home',
        template: __webpack_require__(576)
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__shared_auth_service__["a" /* AuthSerivce */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__shared_auth_service__["a" /* AuthSerivce */]) === "function" && _a || Object])
], HomeComponent);

var _a;
//# sourceMappingURL=home.component.js.map

/***/ }),

/***/ 185:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__shared_auth_service__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__(22);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var LoginComponent = (function () {
    function LoginComponent(authService, router, route) {
        this.authService = authService;
        this.router = router;
        this.route = route;
        this.user = {
            email: 'nishant',
            password: 'nishant'
        };
        this.rememberMe = false;
        this.usernameError = '';
        this.passwordError = '';
    }
    LoginComponent.prototype.login = function () {
        var self = this;
        self.usernameError = !self.user.email ? 'Email can`t be empty' : '';
        self.passwordError = !self.user.password ? 'Password can`t be empty' : '';
        if (self.usernameError || self.passwordError) {
            return;
        }
        self.authService
            .login(self.user.email, self.user.password, self.rememberMe)
            .subscribe(function (isSuccessfull) {
            if (isSuccessfull) {
                self.router.navigateByUrl('/dashboard');
            }
            else {
                console.error('error occurred while login');
            }
        }, function (err) {
            console.log(err);
            self.error = err;
        });
    };
    LoginComponent.prototype.ngOnInit = function () {
        var self = this;
        self.route
            .queryParams
            .subscribe(function (params) {
            self.error = params['errorMessage'] || '';
        });
        self.authService.getUserDetails().subscribe(function (isSuccessfull) {
            if (isSuccessfull) {
                self.router.navigateByUrl('/dashboard');
            }
        });
    };
    return LoginComponent;
}());
LoginComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["_11" /* Component */])({ selector: 'login', template: __webpack_require__(577) }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__shared_auth_service__["a" /* AuthSerivce */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__shared_auth_service__["a" /* AuthSerivce */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__angular_router__["b" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_router__["b" /* Router */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_2__angular_router__["c" /* ActivatedRoute */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_router__["c" /* ActivatedRoute */]) === "function" && _c || Object])
], LoginComponent);

var _a, _b, _c;
//# sourceMappingURL=login.component.js.map

/***/ }),

/***/ 186:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_router__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__shared_auth_service__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__(1);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RegisterComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var RegisterComponent = (function () {
    function RegisterComponent(authServie, router) {
        this.authServie = authServie;
        this.router = router;
        this.user = {
            username: '',
            password: '',
            confirmPassword: '',
            email: ''
        };
        this.error = '';
        this.doesPasswordsMatch = false;
        this.emailError = '';
        this.usernameError = '';
        this.passwordError = '';
    }
    RegisterComponent.prototype.register = function () {
        var self = this;
        self.emailError = !self.user.email ? 'Email can`t be empty' : '';
        self.usernameError = !self.user.username ? 'Username can`t be empty' : '';
        self.passwordError = self.user.password !== self.user.confirmPassword ? 'Password and Confirm Password must match' : '';
        if (self.emailError || self.usernameError || self.passwordError) {
            return;
        }
        self.authServie
            .register(self.user.email, self.user.username, self.user.password)
            .subscribe(function (isSuccessfull) {
            if (isSuccessfull) {
                self.router.navigateByUrl('/dashboard');
            }
            else {
                console.error('error occurred while login');
            }
        }, function (err) {
            console.log(err);
            self.error = err;
        });
    };
    RegisterComponent.prototype.ngOnInit = function () { };
    return RegisterComponent;
}());
RegisterComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__angular_core__["_11" /* Component */])({
        template: __webpack_require__(578)
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__shared_auth_service__["a" /* AuthSerivce */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__shared_auth_service__["a" /* AuthSerivce */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_0__angular_router__["b" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_router__["b" /* Router */]) === "function" && _b || Object])
], RegisterComponent);

var _a, _b;
//# sourceMappingURL=register.component.js.map

/***/ }),

/***/ 187:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_material__ = __webpack_require__(21);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ConfirmComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var ConfirmComponent = (function () {
    function ConfirmComponent(dialogRef) {
        this.dialogRef = dialogRef;
    }
    return ConfirmComponent;
}());
ConfirmComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_11" /* Component */])({
        template: __webpack_require__(579)
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_material__["e" /* MdDialogRef */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_material__["e" /* MdDialogRef */]) === "function" && _a || Object])
], ConfirmComponent);

var _a;
//# sourceMappingURL=confirm.component.js.map

/***/ }),

/***/ 188:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__confirm_confirm_component__ = __webpack_require__(187);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__confirm_service__ = __webpack_require__(75);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__item_service__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__user_service__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__auth_service__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__notification_service__ = __webpack_require__(57);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__angular_material__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__chatzz_service_provider__ = __webpack_require__(56);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SharedModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};









var SharedModule = (function () {
    function SharedModule() {
    }
    return SharedModule;
}());
SharedModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__angular_core__["b" /* NgModule */])({
        imports: [__WEBPACK_IMPORTED_MODULE_7__angular_material__["a" /* MaterialModule */]],
        exports: [__WEBPACK_IMPORTED_MODULE_0__confirm_confirm_component__["a" /* ConfirmComponent */]],
        declarations: [__WEBPACK_IMPORTED_MODULE_0__confirm_confirm_component__["a" /* ConfirmComponent */]],
        providers: [
            __WEBPACK_IMPORTED_MODULE_3__user_service__["a" /* UserService */],
            __WEBPACK_IMPORTED_MODULE_4__auth_service__["a" /* AuthSerivce */],
            __WEBPACK_IMPORTED_MODULE_6__notification_service__["a" /* NotificationService */],
            __WEBPACK_IMPORTED_MODULE_2__item_service__["a" /* ItemService */],
            __WEBPACK_IMPORTED_MODULE_1__confirm_service__["a" /* ConfirmService */],
            __WEBPACK_IMPORTED_MODULE_8__chatzz_service_provider__["a" /* ChatzzServiceProvider */]
        ],
        entryComponents: [__WEBPACK_IMPORTED_MODULE_0__confirm_confirm_component__["a" /* ConfirmComponent */]],
        schemas: [__WEBPACK_IMPORTED_MODULE_5__angular_core__["c" /* CUSTOM_ELEMENTS_SCHEMA */]]
    })
], SharedModule);

//# sourceMappingURL=shared.module.js.map

/***/ }),

/***/ 28:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_http__ = __webpack_require__(55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Rx__ = __webpack_require__(53);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Rx___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_Rx__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_catch__ = __webpack_require__(66);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_catch___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_catch__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UserService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var User = (function () {
    function User(_id, username, email, profilePicture) {
        this._id = _id;
        this.username = username;
        this.email = email;
        this.profilePictureUrl = profilePicture;
        this.chatData = {
            connectedUsers: [],
            missedMessages: {}
        };
    }
    User.prototype.setConnectedUsers = function (users) {
        this.chatData.connectedUsers = users;
    };
    User.prototype.getConnectedUsers = function () {
        return this.chatData.connectedUsers;
    };
    User.prototype.getId = function () {
        return this._id;
    };
    User.prototype.getUsername = function () {
        return this.username || null;
    };
    ;
    User.prototype.getEmail = function () {
        return this.email || null;
    };
    User.prototype.getProfilePictureUrl = function () {
        return this.profilePictureUrl || null;
    };
    User.prototype.getChatData = function () {
        return this.chatData;
    };
    return User;
}());
var UserService = (function () {
    function UserService(http) {
        this.http = http;
        this.apiUrl = '/api/user';
        this.userBehaviousSubject = new __WEBPACK_IMPORTED_MODULE_1_rxjs_Rx__["BehaviorSubject"](new User(null, null, null, null));
    }
    UserService.prototype.setUser = function (id, username, email, profilePciture) {
        var user = new User(id, username, email, profilePciture);
        this.userBehaviousSubject.next(user);
    };
    UserService.prototype.getUser = function () {
        return this
            .userBehaviousSubject
            .asObservable()
            .share()
            .distinctUntilChanged();
    };
    ;
    UserService.prototype.changeDetails = function (username, email) {
        var self = this;
        var changeDetailsUrl = this.apiUrl + '/change-details';
        return self.http.post(changeDetailsUrl, { username: username, email: email })
            .map(function (res) { return res.json(); })
            .map(function (res) {
            if (res.status) {
                self.setUser(res.data._id, res.data.username, res.data.email, res.data.profilePictureUrl);
            }
            return res;
        })
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_1_rxjs_Rx__["Observable"].throw(error.json().error || 'Server error'); });
    };
    UserService.prototype.changeProfilePicture = function (uploadId) {
        var self = this;
        var changeProfilePictureUrl = this.apiUrl + '/change-profile-picture';
        return self.http.post(changeProfilePictureUrl, { profilePicture: uploadId })
            .map(function (res) {
            return res.json();
        })
            .map(function (res) {
            if (res && res.status) {
                self.setUser(res.data._id, res.data.username, res.data.email, res.data.profilePictureUrl);
            }
            return res;
        })
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_1_rxjs_Rx__["Observable"].throw(error || 'Server error'); });
    };
    UserService.prototype.changePassword = function (oldPassword, newPassword) {
        var self = this;
        var changePasswordUrl = this.apiUrl + '/change-password';
        return self.http.post(changePasswordUrl, { oldPassword: oldPassword, newPassword: newPassword })
            .map(function (res) { return res.json(); })
            .map(function (res) {
            return res;
        })
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_1_rxjs_Rx__["Observable"].throw(error.json().error || 'Server error'); });
    };
    return UserService;
}());
UserService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__angular_core__["d" /* Injectable */])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_http__["b" /* Http */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_http__["b" /* Http */]) === "function" && _a || Object])
], UserService);

var _a;
//# sourceMappingURL=user.service.js.map

/***/ }),

/***/ 433:
/***/ (function(module, exports) {

function webpackEmptyContext(req) {
	throw new Error("Cannot find module '" + req + "'.");
}
webpackEmptyContext.keys = function() { return []; };
webpackEmptyContext.resolve = webpackEmptyContext;
module.exports = webpackEmptyContext;
webpackEmptyContext.id = 433;


/***/ }),

/***/ 434:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__ = __webpack_require__(455);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_app_module__ = __webpack_require__(460);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__environments_environment__ = __webpack_require__(467);




if (__WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].production) {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["a" /* enableProdMode */])();
}
__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_2__app_app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 459:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_router__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__shared_user_service__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__shared_auth_service__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__shared_chatzz_service_provider__ = __webpack_require__(56);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__dashboard_services_notification_count_service__ = __webpack_require__(74);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};






var AppComponent = (function () {
    function AppComponent(userSerivce, authService, router, chatzzService, notificationCountService) {
        this.userSerivce = userSerivce;
        this.authService = authService;
        this.router = router;
        this.chatzzService = chatzzService;
        this.notificationCountService = notificationCountService;
    }
    AppComponent.prototype.logout = function () {
        var _this = this;
        this.authService.logout()
            .subscribe(function (response) {
            if (response.status) {
                _this.router.navigateByUrl('/login');
            }
            else {
                console.error('error occurred while logging out', response.reason);
            }
        }, function (err) {
            console.log(err);
        });
        this.chatzzService.disconnect();
    };
    AppComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.userSerivce
            .getUser()
            .subscribe(function (newUser) {
            _this.username = newUser.getUsername();
            _this.chatzzService.newMessage()
                .subscribe(function (message) {
                if (message.type === _this.chatzzService.messageTypes.CHAT_USER_ADDED) {
                    var connectedUsers = newUser.getConnectedUsers();
                    connectedUsers.push(message.data);
                    newUser.setConnectedUsers(connectedUsers);
                }
            });
        });
        this.notificationCountService.getSubscription()
            .subscribe(function (newCount) {
            _this.notificationCount = newCount;
        });
    };
    return AppComponent;
}());
AppComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["_11" /* Component */])({
        selector: 'app-root',
        template: __webpack_require__(566),
        styles: [__webpack_require__(537)]
    }),
    __param(3, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["G" /* Inject */])(__WEBPACK_IMPORTED_MODULE_4__shared_chatzz_service_provider__["b" /* ChatzzService */])),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__shared_user_service__["a" /* UserService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__shared_user_service__["a" /* UserService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_3__shared_auth_service__["a" /* AuthSerivce */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__shared_auth_service__["a" /* AuthSerivce */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_0__angular_router__["b" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_router__["b" /* Router */]) === "function" && _c || Object, Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_5__dashboard_services_notification_count_service__["a" /* NotificationCountService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5__dashboard_services_notification_count_service__["a" /* NotificationCountService */]) === "function" && _d || Object])
], AppComponent);

var _a, _b, _c, _d;
//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 460:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__dashboard_main_item_card_item_card_component__ = __webpack_require__(462);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__dashboard_main_view_items_view_item_component__ = __webpack_require__(182);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__dashboard_main_create_item_create_item_component__ = __webpack_require__(179);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_platform_browser__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_forms__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__angular_http__ = __webpack_require__(55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__angular_platform_browser_animations__ = __webpack_require__(173);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__angular_material__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__angular_flex_layout__ = __webpack_require__(73);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__app_component__ = __webpack_require__(459);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__dashboard_change_password_change_password_component__ = __webpack_require__(176);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__dashboard_user_user_component__ = __webpack_require__(183);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__dashboard_main_main_component__ = __webpack_require__(181);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__app_guards__ = __webpack_require__(175);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__dashboard_dashboard_component__ = __webpack_require__(178);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__shared_shared_module__ = __webpack_require__(188);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__angular_router__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18_ng2_bootstrap__ = __webpack_require__(549);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19_ng2_bootstrap_carousel__ = __webpack_require__(329);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__login_login_module__ = __webpack_require__(463);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__app_routing__ = __webpack_require__(461);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__home_home_component__ = __webpack_require__(184);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23_ngx_uploader__ = __webpack_require__(86);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24_hammerjs__ = __webpack_require__(538);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24_hammerjs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_24_hammerjs__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25__dashboard_main_edit_item_edit_item_component__ = __webpack_require__(180);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_26__dashboard_chat_chat_component__ = __webpack_require__(177);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_27__dashboard_services_notification_count_service__ = __webpack_require__(74);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};





























var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__angular_core__["b" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_10__app_component__["a" /* AppComponent */],
            __WEBPACK_IMPORTED_MODULE_22__home_home_component__["a" /* HomeComponent */],
            __WEBPACK_IMPORTED_MODULE_15__dashboard_dashboard_component__["a" /* DashboardComponent */],
            __WEBPACK_IMPORTED_MODULE_13__dashboard_main_main_component__["a" /* MainComponent */],
            __WEBPACK_IMPORTED_MODULE_12__dashboard_user_user_component__["a" /* UserComponent */],
            __WEBPACK_IMPORTED_MODULE_11__dashboard_change_password_change_password_component__["a" /* ChangePasswordComponent */],
            __WEBPACK_IMPORTED_MODULE_0__dashboard_main_item_card_item_card_component__["a" /* ItemCardComponent */],
            __WEBPACK_IMPORTED_MODULE_26__dashboard_chat_chat_component__["a" /* ChatComponent */],
            __WEBPACK_IMPORTED_MODULE_2__dashboard_main_create_item_create_item_component__["a" /* CreateItemComponent */],
            __WEBPACK_IMPORTED_MODULE_25__dashboard_main_edit_item_edit_item_component__["a" /* EditItemComponent */],
            __WEBPACK_IMPORTED_MODULE_1__dashboard_main_view_items_view_item_component__["a" /* ViewItemComponent */]
        ],
        entryComponents: [__WEBPACK_IMPORTED_MODULE_1__dashboard_main_view_items_view_item_component__["a" /* ViewItemComponent */], __WEBPACK_IMPORTED_MODULE_2__dashboard_main_create_item_create_item_component__["a" /* CreateItemComponent */], __WEBPACK_IMPORTED_MODULE_25__dashboard_main_edit_item_edit_item_component__["a" /* EditItemComponent */]],
        imports: [
            __WEBPACK_IMPORTED_MODULE_3__angular_platform_browser__["a" /* BrowserModule */],
            __WEBPACK_IMPORTED_MODULE_21__app_routing__["a" /* AppRoutingModule */],
            __WEBPACK_IMPORTED_MODULE_6__angular_http__["a" /* HttpModule */],
            __WEBPACK_IMPORTED_MODULE_17__angular_router__["a" /* RouterModule */],
            __WEBPACK_IMPORTED_MODULE_20__login_login_module__["a" /* LoginModule */],
            __WEBPACK_IMPORTED_MODULE_16__shared_shared_module__["a" /* SharedModule */],
            __WEBPACK_IMPORTED_MODULE_5__angular_forms__["a" /* FormsModule */],
            __WEBPACK_IMPORTED_MODULE_23_ngx_uploader__["a" /* NgUploaderModule */],
            __WEBPACK_IMPORTED_MODULE_18_ng2_bootstrap__["a" /* ProgressbarModule */].forRoot(),
            __WEBPACK_IMPORTED_MODULE_18_ng2_bootstrap__["b" /* ModalModule */].forRoot(),
            __WEBPACK_IMPORTED_MODULE_8__angular_material__["a" /* MaterialModule */],
            __WEBPACK_IMPORTED_MODULE_8__angular_material__["b" /* MdSidenavModule */],
            __WEBPACK_IMPORTED_MODULE_9__angular_flex_layout__["a" /* FlexLayoutModule */],
            __WEBPACK_IMPORTED_MODULE_7__angular_platform_browser_animations__["a" /* BrowserAnimationsModule */],
            __WEBPACK_IMPORTED_MODULE_19_ng2_bootstrap_carousel__["a" /* CarouselModule */].forRoot()
        ],
        providers: [
            __WEBPACK_IMPORTED_MODULE_14__app_guards__["a" /* DashboardCanActivateGuard */],
            __WEBPACK_IMPORTED_MODULE_27__dashboard_services_notification_count_service__["a" /* NotificationCountService */]
        ],
        schemas: [__WEBPACK_IMPORTED_MODULE_4__angular_core__["c" /* CUSTOM_ELEMENTS_SCHEMA */]],
        bootstrap: [__WEBPACK_IMPORTED_MODULE_10__app_component__["a" /* AppComponent */]]
    })
], AppModule);

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 461:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__dashboard_change_password_change_password_component__ = __webpack_require__(176);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__dashboard_user_user_component__ = __webpack_require__(183);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__dashboard_main_main_component__ = __webpack_require__(181);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_guards__ = __webpack_require__(175);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__dashboard_dashboard_component__ = __webpack_require__(178);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__angular_router__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__home_home_component__ = __webpack_require__(184);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__dashboard_chat_chat_component__ = __webpack_require__(177);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppRoutingModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};









var appRoutes = [
    { path: 'home', component: __WEBPACK_IMPORTED_MODULE_7__home_home_component__["a" /* HomeComponent */] },
    {
        path: 'dashboard',
        component: __WEBPACK_IMPORTED_MODULE_4__dashboard_dashboard_component__["a" /* DashboardComponent */],
        canActivate: [__WEBPACK_IMPORTED_MODULE_3__app_guards__["a" /* DashboardCanActivateGuard */]],
        children: [
            { path: '', redirectTo: '/dashboard/main', pathMatch: 'full' },
            { path: 'main', component: __WEBPACK_IMPORTED_MODULE_2__dashboard_main_main_component__["a" /* MainComponent */] },
            { path: 'user', component: __WEBPACK_IMPORTED_MODULE_1__dashboard_user_user_component__["a" /* UserComponent */] },
            { path: 'change-password', component: __WEBPACK_IMPORTED_MODULE_0__dashboard_change_password_change_password_component__["a" /* ChangePasswordComponent */] },
            { path: 'chat', component: __WEBPACK_IMPORTED_MODULE_8__dashboard_chat_chat_component__["a" /* ChatComponent */] }
        ]
    },
    { path: '', redirectTo: '/home', pathMatch: 'full' }
];
var AppRoutingModule = (function () {
    function AppRoutingModule() {
    }
    return AppRoutingModule;
}());
AppRoutingModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__angular_core__["b" /* NgModule */])({
        imports: [
            __WEBPACK_IMPORTED_MODULE_6__angular_router__["a" /* RouterModule */].forRoot(appRoutes)
        ],
        exports: [
            __WEBPACK_IMPORTED_MODULE_6__angular_router__["a" /* RouterModule */]
        ]
    })
], AppRoutingModule);

//# sourceMappingURL=app.routing.js.map

/***/ }),

/***/ 462:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_router__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__edit_item_edit_item_component__ = __webpack_require__(180);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__view_items_view_item_component__ = __webpack_require__(182);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__shared_user_service__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_material__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__shared_confirm_service__ = __webpack_require__(75);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__shared_item_service__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__shared_chatzz_service_provider__ = __webpack_require__(56);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ItemCardComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};









var ItemCardComponent = (function () {
    function ItemCardComponent(userService, dialog, confirmService, itemService, router, chatzzService) {
        this.userService = userService;
        this.dialog = dialog;
        this.confirmService = confirmService;
        this.itemService = itemService;
        this.router = router;
        this.chatzzService = chatzzService;
        this.watchers = [];
        this.imageLoaded = false;
        this.refreshItems = new __WEBPACK_IMPORTED_MODULE_3__angular_core__["t" /* EventEmitter */]();
    }
    ItemCardComponent.prototype.getUserAvatarStyle = function () {
        return {
            'background-image': 'url(' + this.replaceSlashes(this.item.owner.profilePicture.path) + ')',
            'background-size': 'cover'
        };
    };
    ItemCardComponent.prototype.ngOnInit = function () {
        var _this = this;
        var watcher = this.userService
            .getUser()
            .subscribe(function (newUser) {
            _this.user = newUser;
        });
        this.watchers.push(watcher);
    };
    ItemCardComponent.prototype.ngOnDestroy = function () {
        this.watchers.forEach(function (watcher) {
            watcher.unsubscribe();
        });
    };
    ItemCardComponent.prototype.imageLoadedSuccessfully = function () {
        this.imageLoaded = true;
    };
    ItemCardComponent.prototype.replaceSlashes = function (url) {
        return url.replace(/\\/g, '/');
    };
    ItemCardComponent.prototype.editItem = function () {
        var _this = this;
        var editItemDialogRef = this.dialog.open(__WEBPACK_IMPORTED_MODULE_1__edit_item_edit_item_component__["a" /* EditItemComponent */], {
            width: '600px',
            data: this.item
        });
        this.dialog.afterAllClosed.subscribe(function () {
            _this.refreshItems.emit();
        });
        editItemDialogRef.componentInstance.item = this.item;
    };
    ItemCardComponent.prototype.deleteItem = function () {
        var _this = this;
        this.confirmService.confirm('Delete Item', "Are you sure you want to delete item " + this.item.title + " ?")
            .subscribe(function (res) {
            if (res) {
                _this.itemService.deleteItem(_this.item)
                    .subscribe(function (response) {
                    console.log(response);
                    _this.refreshItems.emit();
                });
            }
        });
    };
    ItemCardComponent.prototype.viewItem = function () {
        var viewItemDialogRef = this.dialog.open(__WEBPACK_IMPORTED_MODULE_2__view_items_view_item_component__["a" /* ViewItemComponent */], {
            width: '600px'
        });
        viewItemDialogRef.componentInstance.item = this.item;
    };
    ItemCardComponent.prototype.contactUser = function (userId) {
        var _this = this;
        var connectedUsers = this.user.getConnectedUsers();
        var isUserAlreadyConnected = false;
        for (var i = 0; i < connectedUsers.length; i++) {
            var connectedUser = connectedUsers[i];
            if (connectedUser._id === userId) {
                isUserAlreadyConnected = true;
                break;
            }
        }
        if (!isUserAlreadyConnected) {
            this.chatzzService.addChatUser(userId, function (err, userObj) {
                if (err) {
                    return console.error(err);
                }
                _this.userService.getUser().subscribe(function (user) {
                    var users = user.getConnectedUsers();
                    userObj.user.status = userObj.status;
                    userObj.user.lastOnline = userObj.lastOnline;
                    users.push(userObj.user);
                    _this.user.setConnectedUsers(users);
                    return _this.router.navigateByUrl('/dashboard/chat?user=' + userId);
                });
            });
        }
    };
    return ItemCardComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__angular_core__["o" /* Input */])(),
    __metadata("design:type", Object)
], ItemCardComponent.prototype, "item", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__angular_core__["x" /* Output */])(),
    __metadata("design:type", Object)
], ItemCardComponent.prototype, "refreshItems", void 0);
ItemCardComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__angular_core__["_11" /* Component */])({
        template: __webpack_require__(572),
        selector: 'app-item-card'
    }),
    __param(5, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__angular_core__["G" /* Inject */])(__WEBPACK_IMPORTED_MODULE_8__shared_chatzz_service_provider__["b" /* ChatzzService */])),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_4__shared_user_service__["a" /* UserService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__shared_user_service__["a" /* UserService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_5__angular_material__["c" /* MdDialog */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5__angular_material__["c" /* MdDialog */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_6__shared_confirm_service__["a" /* ConfirmService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_6__shared_confirm_service__["a" /* ConfirmService */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_7__shared_item_service__["a" /* ItemService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_7__shared_item_service__["a" /* ItemService */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_0__angular_router__["b" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_router__["b" /* Router */]) === "function" && _e || Object, Object])
], ItemCardComponent);

var _a, _b, _c, _d, _e;
//# sourceMappingURL=item-card.component.js.map

/***/ }),

/***/ 463:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__shared_shared_module__ = __webpack_require__(188);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__register_register_component__ = __webpack_require__(186);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_platform_browser__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_forms__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_platform_browser_animations__ = __webpack_require__(173);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__angular_material__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__angular_flex_layout__ = __webpack_require__(73);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__login_component__ = __webpack_require__(185);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__login_routing__ = __webpack_require__(464);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};










var LoginModule = (function () {
    function LoginModule() {
    }
    return LoginModule;
}());
LoginModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__angular_core__["b" /* NgModule */])({
        imports: [
            __WEBPACK_IMPORTED_MODULE_3__angular_platform_browser__["a" /* BrowserModule */],
            __WEBPACK_IMPORTED_MODULE_4__angular_forms__["a" /* FormsModule */],
            __WEBPACK_IMPORTED_MODULE_9__login_routing__["a" /* LoginRoutingModule */],
            __WEBPACK_IMPORTED_MODULE_0__shared_shared_module__["a" /* SharedModule */],
            __WEBPACK_IMPORTED_MODULE_6__angular_material__["a" /* MaterialModule */],
            __WEBPACK_IMPORTED_MODULE_7__angular_flex_layout__["a" /* FlexLayoutModule */],
            __WEBPACK_IMPORTED_MODULE_5__angular_platform_browser_animations__["a" /* BrowserAnimationsModule */]
        ],
        exports: [],
        declarations: [
            __WEBPACK_IMPORTED_MODULE_8__login_component__["a" /* LoginComponent */],
            __WEBPACK_IMPORTED_MODULE_1__register_register_component__["a" /* RegisterComponent */]
        ],
        providers: [],
        schemas: [__WEBPACK_IMPORTED_MODULE_2__angular_core__["c" /* CUSTOM_ELEMENTS_SCHEMA */]]
    })
], LoginModule);

//# sourceMappingURL=login.module.js.map

/***/ }),

/***/ 464:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__login_component__ = __webpack_require__(185);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__register_register_component__ = __webpack_require__(186);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginRoutingModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var loginRoutes = [
    { path: 'login', component: __WEBPACK_IMPORTED_MODULE_2__login_component__["a" /* LoginComponent */] },
    { path: 'register', component: __WEBPACK_IMPORTED_MODULE_3__register_register_component__["a" /* RegisterComponent */] }
];
var LoginRoutingModule = (function () {
    function LoginRoutingModule() {
    }
    return LoginRoutingModule;
}());
LoginRoutingModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["b" /* NgModule */])({
        imports: [
            __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* RouterModule */].forChild(loginRoutes)
        ],
        exports: [
            __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* RouterModule */]
        ]
    })
], LoginRoutingModule);

//# sourceMappingURL=login.routing.js.map

/***/ }),

/***/ 465:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rxjs_Rx__ = __webpack_require__(53);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rxjs_Rx___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_rxjs_Rx__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_socket_io_client__ = __webpack_require__(823);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_socket_io_client___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_socket_io_client__);
/* unused harmony export ChatzzService */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return getChatzzService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var ChatzzService = (function () {
    function ChatzzService(serverUrl) {
        var _this = this;
        this.serverUrl = serverUrl;
        this.messageTypes = {
            OLD_MESSAGES: 'old-messages',
            NEW_MESSAGE: 'new-message',
            USER_DETAILS: 'user-details',
            MESSAGE_STATUS_CHANGED: 'message-status-changed',
            CHAT_USER_STATUS_CHANGED: 'chat-user-status-changed',
            CHAT_USER_ADDED: 'chat-user-added'
        };
        this.messageStatus = {
            READ: 'read',
            SENT: 'sent',
            NOT_SENT: 'not_sent'
        };
        if (!serverUrl) {
            throw new Error('invalid server url provided');
        }
        else {
            console.log('chatzz service configured to work with server', serverUrl);
        }
        this.socket = __WEBPACK_IMPORTED_MODULE_2_socket_io_client__(serverUrl);
        this.socketMessageBehaviousSubject = new __WEBPACK_IMPORTED_MODULE_0_rxjs_Rx__["BehaviorSubject"]({});
        this.socket.on('chatzz', function (data) {
            console.log(data.type, data.data);
            _this.socketMessageBehaviousSubject.next(data);
        });
    }
    ChatzzService.prototype.newMessage = function () {
        return this
            .socketMessageBehaviousSubject
            .asObservable()
            .share()
            .distinctUntilChanged();
    };
    ChatzzService.prototype.connect = function (userId) {
        if (!this.socket.connected) {
            this.socket = this.socket.open();
        }
        if (!userId) {
            return console.error('null UserId passed');
        }
        this.socket.emit('connect-user', { userId: userId });
    };
    ChatzzService.prototype.addChatUser = function (userToAdd, callback) {
        if (!this.socket.connected) {
            return console.log('socket not connected');
        }
        if (!userToAdd) {
            return console.error('null userId passed');
        }
        this.socket.emit('add-chat-user', { userToAdd: userToAdd }, callback);
    };
    ChatzzService.prototype.sendMessage = function (userId, message) {
        if (!this.socket.connected) {
            return console.log('socket not connected');
        }
        if (!userId) {
            return console.error('null recipientUserId passed');
        }
        if (!message) {
            return console.error('null message passed');
        }
        this.socket.emit('send-message', { userId: userId, message: message });
    };
    ChatzzService.prototype.getChatMessages = function (userId, fromDate) {
        if (!this.socket.connected) {
            return console.log('socket not connected');
        }
        if (!userId) {
            return console.error("cannot find chat with " + userId + " user");
        }
        var data = {
            userId: userId,
            fromDate: null
        };
        if (fromDate) {
            data.fromDate = fromDate;
        }
        this.socket.emit('get-old-messages', data);
    };
    ChatzzService.prototype.markMessageRead = function (messageId) {
        if (!this.socket.connected) {
            return console.log('socket not connected');
        }
        if (!messageId) {
            return new Error('null messageId passed');
        }
        this.socket.emit('message-read', { messageId: messageId });
    };
    ChatzzService.prototype.disconnect = function () {
        if (!this.socket.connected) {
            return console.log('socket not connected');
        }
        this.socket.disconnect();
    };
    return ChatzzService;
}());
ChatzzService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["d" /* Injectable */])(),
    __metadata("design:paramtypes", [String])
], ChatzzService);

var getChatzzService = function (url) {
    var chatzzServiceInstance = null;
    if (!chatzzServiceInstance) {
        chatzzServiceInstance = new ChatzzService(url);
    }
    return chatzzServiceInstance;
};
//# sourceMappingURL=chatzz.service.js.map

/***/ }),

/***/ 466:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__chatzz_service__ = __webpack_require__(465);

var getCustomChatzzService = function () { return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__chatzz_service__["a" /* getChatzzService */])('http://localhost:3000/'); };
/* harmony default export */ __webpack_exports__["a"] = getCustomChatzzService;
//# sourceMappingURL=custom-chatzz.service.js.map

/***/ }),

/***/ 467:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return environment; });
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
// The file contents for the current environment will overwrite these during build.
var environment = {
    production: false
};
//# sourceMappingURL=environment.js.map

/***/ }),

/***/ 47:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__user_service__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_http__ = __webpack_require__(55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_Rx__ = __webpack_require__(53);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_Rx___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_Rx__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_catch__ = __webpack_require__(66);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_catch___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_catch__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AuthSerivce; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




// Import RxJs required methods


var AuthSerivce = (function () {
    function AuthSerivce(http, userService) {
        this.http = http;
        this.userService = userService;
        this.authUrl = '/auth';
        this.isLoggedIn = false;
    }
    AuthSerivce.prototype.isUserLoggedIn = function () {
        return this.isLoggedIn;
    };
    AuthSerivce.prototype.login = function (email, password, rememberMe) {
        var self = this;
        var loginUrl = this.authUrl + '/login';
        return self.http.post(loginUrl, { email: email, password: password, rememberMe: rememberMe })
            .map(function (res) { return res.json(); })
            .map(function (res) {
            self.isLoggedIn = res.status;
            if (self.isLoggedIn) {
                self.userService.setUser(res.data._id, res.data.username, res.data.email, res.data.profilePictureUrl);
            }
            return self.isLoggedIn;
        })
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_3_rxjs_Rx__["Observable"].throw(error.json().error || 'Server error'); });
    };
    AuthSerivce.prototype.register = function (email, username, password) {
        var self = this;
        var loginUrl = this.authUrl + '/register';
        return self.http.post(loginUrl, { email: email, username: username, password: password })
            .map(function (res) { return res.json(); })
            .map(function (res) {
            self.isLoggedIn = res.status;
            if (self.isLoggedIn) {
                self.userService.setUser(res.data._id, res.data.username, res.data.email, res.data.profilePictureUrl);
            }
            return self.isLoggedIn;
        })
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_3_rxjs_Rx__["Observable"].throw(error.json().error || 'Server error'); });
    };
    AuthSerivce.prototype.logout = function () {
        var self = this;
        var logoutUrl = this.authUrl + '/logout';
        return self.http.post(logoutUrl, {})
            .map(function (res) { return res.json(); })
            .map(function (res) {
            if (res.status) {
                self.isLoggedIn = false;
                self.userService.setUser(null, null, null, null);
            }
            return res;
        })
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_3_rxjs_Rx__["Observable"].throw(error.json().error || 'Server error'); });
    };
    AuthSerivce.prototype.getUserDetails = function () {
        var self = this;
        var getUserUrl = '/api/user/details';
        return self.http.get(getUserUrl)
            .map(function (res) { return res.json(); })
            .map(function (res) {
            if (res.status) {
                self.isLoggedIn = true;
                self.userService.setUser(res.data._id, res.data.username, res.data.email, res.data.profilePictureUrl);
            }
            return res.status;
        })
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_3_rxjs_Rx__["Observable"].throw(error.json().error || 'Server error'); });
    };
    return AuthSerivce;
}());
AuthSerivce = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["d" /* Injectable */])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__angular_http__["b" /* Http */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_http__["b" /* Http */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_0__user_service__["a" /* UserService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__user_service__["a" /* UserService */]) === "function" && _b || Object])
], AuthSerivce);

var _a, _b;
//# sourceMappingURL=auth.service.js.map

/***/ }),

/***/ 48:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_http__ = __webpack_require__(55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Rx__ = __webpack_require__(53);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Rx___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_Rx__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_catch__ = __webpack_require__(66);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_catch___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_catch__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ItemService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var ItemService = (function () {
    function ItemService(http) {
        this.http = http;
        this.apiUrl = '/api/item';
    }
    ItemService.prototype.createItem = function (title, description, images) {
        var self = this;
        var createItemUrl = this.apiUrl + '/';
        return self.http.post(createItemUrl, { data: { title: title, description: description, images: images } })
            .map(function (res) { return res.json(); })
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_1_rxjs_Rx__["Observable"].throw(error.json().error || 'Server error'); });
    };
    ItemService.prototype.getItem = function (id) {
        var getItemUrl = this.apiUrl + '/' + id;
        return this.http.get(getItemUrl)
            .map(function (res) { return res.json(); })
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_1_rxjs_Rx__["Observable"].throw(error.json().error || 'Server Error'); });
    };
    ;
    ItemService.prototype.getItems = function () {
        return this.http.get(this.apiUrl)
            .map(function (res) { return res.json(); })
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_1_rxjs_Rx__["Observable"].throw(error.json().error || 'Server Error'); });
    };
    ItemService.prototype.updateItem = function (id, title, description, images) {
        var self = this;
        var updateItemUrl = this.apiUrl + '/' + id;
        return self.http.post(updateItemUrl, { data: { title: title, description: description, images: images } })
            .map(function (res) { return res.json(); })
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_1_rxjs_Rx__["Observable"].throw(error.json().error || 'Server error'); });
    };
    ItemService.prototype.removeImage = function (item, image) {
        var removeImageUrl = this.apiUrl + '/' + (item._id || item) + '/' + (image._id || image) + '/remove-image';
        return this.http.post(removeImageUrl, {})
            .map(function (res) { return res.json(); })
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_1_rxjs_Rx__["Observable"].throw(error.json().error || 'Server error'); });
    };
    ItemService.prototype.deleteItem = function (item) {
        var deleteItemUrl = this.apiUrl + '/' + (item._id || item);
        return this.http.delete(deleteItemUrl)
            .map(function (res) { return res.json(); });
    };
    return ItemService;
}());
ItemService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__angular_core__["d" /* Injectable */])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_http__["b" /* Http */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_http__["b" /* Http */]) === "function" && _a || Object])
], ItemService);

var _a;
//# sourceMappingURL=item.service.js.map

/***/ }),

/***/ 537:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(50)();
// imports


// module
exports.push([module.i, ":host {\r\n    display: -webkit-box;\r\n    display: -ms-flexbox;\r\n    display: flex;\r\n    -webkit-box-flex: 1;\r\n        -ms-flex: 1;\r\n            flex: 1;\r\n}\r\n\r\nmd-sidenav {\r\n    width: 320px;\r\n}\r\n\r\n.content {\r\n    padding: 12px;\r\n}\r\n\r\nmd-icon.avatar {\r\n    overflow: hidden;\r\n    width: 64px;\r\n    height: 64px;\r\n    border-radius: 50%;\r\n    margin: 12px;\r\n}\r\n\r\n.fab-bottom-right {\r\n    position: fixed;\r\n    right: 16px;\r\n    bottom: 16px;\r\n}\r\n\r\n/deep/ .mat-list-item-content {\r\n    height: auto !important;\r\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 541:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./af": 206,
	"./af.js": 206,
	"./ar": 213,
	"./ar-dz": 207,
	"./ar-dz.js": 207,
	"./ar-kw": 208,
	"./ar-kw.js": 208,
	"./ar-ly": 209,
	"./ar-ly.js": 209,
	"./ar-ma": 210,
	"./ar-ma.js": 210,
	"./ar-sa": 211,
	"./ar-sa.js": 211,
	"./ar-tn": 212,
	"./ar-tn.js": 212,
	"./ar.js": 213,
	"./az": 214,
	"./az.js": 214,
	"./be": 215,
	"./be.js": 215,
	"./bg": 216,
	"./bg.js": 216,
	"./bn": 217,
	"./bn.js": 217,
	"./bo": 218,
	"./bo.js": 218,
	"./br": 219,
	"./br.js": 219,
	"./bs": 220,
	"./bs.js": 220,
	"./ca": 221,
	"./ca.js": 221,
	"./cs": 222,
	"./cs.js": 222,
	"./cv": 223,
	"./cv.js": 223,
	"./cy": 224,
	"./cy.js": 224,
	"./da": 225,
	"./da.js": 225,
	"./de": 228,
	"./de-at": 226,
	"./de-at.js": 226,
	"./de-ch": 227,
	"./de-ch.js": 227,
	"./de.js": 228,
	"./dv": 229,
	"./dv.js": 229,
	"./el": 230,
	"./el.js": 230,
	"./en-au": 231,
	"./en-au.js": 231,
	"./en-ca": 232,
	"./en-ca.js": 232,
	"./en-gb": 233,
	"./en-gb.js": 233,
	"./en-ie": 234,
	"./en-ie.js": 234,
	"./en-nz": 235,
	"./en-nz.js": 235,
	"./eo": 236,
	"./eo.js": 236,
	"./es": 238,
	"./es-do": 237,
	"./es-do.js": 237,
	"./es.js": 238,
	"./et": 239,
	"./et.js": 239,
	"./eu": 240,
	"./eu.js": 240,
	"./fa": 241,
	"./fa.js": 241,
	"./fi": 242,
	"./fi.js": 242,
	"./fo": 243,
	"./fo.js": 243,
	"./fr": 246,
	"./fr-ca": 244,
	"./fr-ca.js": 244,
	"./fr-ch": 245,
	"./fr-ch.js": 245,
	"./fr.js": 246,
	"./fy": 247,
	"./fy.js": 247,
	"./gd": 248,
	"./gd.js": 248,
	"./gl": 249,
	"./gl.js": 249,
	"./gom-latn": 250,
	"./gom-latn.js": 250,
	"./he": 251,
	"./he.js": 251,
	"./hi": 252,
	"./hi.js": 252,
	"./hr": 253,
	"./hr.js": 253,
	"./hu": 254,
	"./hu.js": 254,
	"./hy-am": 255,
	"./hy-am.js": 255,
	"./id": 256,
	"./id.js": 256,
	"./is": 257,
	"./is.js": 257,
	"./it": 258,
	"./it.js": 258,
	"./ja": 259,
	"./ja.js": 259,
	"./jv": 260,
	"./jv.js": 260,
	"./ka": 261,
	"./ka.js": 261,
	"./kk": 262,
	"./kk.js": 262,
	"./km": 263,
	"./km.js": 263,
	"./kn": 264,
	"./kn.js": 264,
	"./ko": 265,
	"./ko.js": 265,
	"./ky": 266,
	"./ky.js": 266,
	"./lb": 267,
	"./lb.js": 267,
	"./lo": 268,
	"./lo.js": 268,
	"./lt": 269,
	"./lt.js": 269,
	"./lv": 270,
	"./lv.js": 270,
	"./me": 271,
	"./me.js": 271,
	"./mi": 272,
	"./mi.js": 272,
	"./mk": 273,
	"./mk.js": 273,
	"./ml": 274,
	"./ml.js": 274,
	"./mr": 275,
	"./mr.js": 275,
	"./ms": 277,
	"./ms-my": 276,
	"./ms-my.js": 276,
	"./ms.js": 277,
	"./my": 278,
	"./my.js": 278,
	"./nb": 279,
	"./nb.js": 279,
	"./ne": 280,
	"./ne.js": 280,
	"./nl": 282,
	"./nl-be": 281,
	"./nl-be.js": 281,
	"./nl.js": 282,
	"./nn": 283,
	"./nn.js": 283,
	"./pa-in": 284,
	"./pa-in.js": 284,
	"./pl": 285,
	"./pl.js": 285,
	"./pt": 287,
	"./pt-br": 286,
	"./pt-br.js": 286,
	"./pt.js": 287,
	"./ro": 288,
	"./ro.js": 288,
	"./ru": 289,
	"./ru.js": 289,
	"./sd": 290,
	"./sd.js": 290,
	"./se": 291,
	"./se.js": 291,
	"./si": 292,
	"./si.js": 292,
	"./sk": 293,
	"./sk.js": 293,
	"./sl": 294,
	"./sl.js": 294,
	"./sq": 295,
	"./sq.js": 295,
	"./sr": 297,
	"./sr-cyrl": 296,
	"./sr-cyrl.js": 296,
	"./sr.js": 297,
	"./ss": 298,
	"./ss.js": 298,
	"./sv": 299,
	"./sv.js": 299,
	"./sw": 300,
	"./sw.js": 300,
	"./ta": 301,
	"./ta.js": 301,
	"./te": 302,
	"./te.js": 302,
	"./tet": 303,
	"./tet.js": 303,
	"./th": 304,
	"./th.js": 304,
	"./tl-ph": 305,
	"./tl-ph.js": 305,
	"./tlh": 306,
	"./tlh.js": 306,
	"./tr": 307,
	"./tr.js": 307,
	"./tzl": 308,
	"./tzl.js": 308,
	"./tzm": 310,
	"./tzm-latn": 309,
	"./tzm-latn.js": 309,
	"./tzm.js": 310,
	"./uk": 311,
	"./uk.js": 311,
	"./ur": 312,
	"./ur.js": 312,
	"./uz": 314,
	"./uz-latn": 313,
	"./uz-latn.js": 313,
	"./uz.js": 314,
	"./vi": 315,
	"./vi.js": 315,
	"./x-pseudo": 316,
	"./x-pseudo.js": 316,
	"./yo": 317,
	"./yo.js": 317,
	"./zh-cn": 318,
	"./zh-cn.js": 318,
	"./zh-hk": 319,
	"./zh-hk.js": 319,
	"./zh-tw": 320,
	"./zh-tw.js": 320
};
function webpackContext(req) {
	return __webpack_require__(webpackContextResolve(req));
};
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) // check for number
		throw new Error("Cannot find module '" + req + "'.");
	return id;
};
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 541;


/***/ }),

/***/ 56:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__custom_chatzz_service__ = __webpack_require__(466);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return ChatzzService; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ChatzzServiceProvider; });


var ChatzzService = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["_19" /* OpaqueToken */]('ChatzzSerivce');
var ChatzzServiceProvider = {
    provide: ChatzzService,
    useFactory: __WEBPACK_IMPORTED_MODULE_1__custom_chatzz_service__["a" /* default */]
};
//# sourceMappingURL=chatzz.service.provider.js.map

/***/ }),

/***/ 566:
/***/ (function(module, exports) {

module.exports = "<div fxLayout=\"column\" fxFlex>\r\n\r\n    <md-toolbar style=\"height: 64px;\" color=\"primary\" class=\"pb4\">\r\n        <a href=\"#\" routerLink=\"/dashboard\" style=\"color: white; text-decoration: none;\">\r\n            <span>Angular Material</span>\r\n        </a>\r\n        <span fxFlex></span>\r\n\r\n\r\n        <button mdTooltip=\"Chat\" *ngIf=\"username\" md-icon-button routerLink=\"/dashboard/chat\">\r\n            <md-icon>chat</md-icon>\r\n            <md-basic-chip *ngIf=\"notificationCount\">{{notificationCount}}</md-basic-chip>\r\n        </button>\r\n        <button *ngIf=\"username\" md-button [mdMenuTriggerFor]=\"menu\">\r\n             <md-icon>account_circle</md-icon> &nbsp; {{username}}\r\n        </button>\r\n        <md-menu #menu=\"mdMenu\">\r\n            <button md-menu-item routerLink=\"/dashboard/user\">\r\n                <md-icon>person</md-icon>\r\n                <span>User Details</span>\r\n            </button>\r\n            <button md-menu-item (click)=\"logout()\">\r\n                <md-icon>exit_to_app</md-icon>\r\n                <span>Logout</span>\r\n            </button>\r\n        </md-menu>\r\n    </md-toolbar>\r\n\r\n    <router-outlet class=\"mb4\"></router-outlet>\r\n</div>"

/***/ }),

/***/ 567:
/***/ (function(module, exports) {

module.exports = "<div fxFlex=\"100%\" class=\"mt4 pt2\" fxLayout=\"column\" fxLayoutAlign=\"center stretch\">\r\n    <div class=\"content mt4 pt2\" fxLayout=\"row\" fxLayoutGap=\"16px\">\r\n        <div fxFlex.lt-sm=\"100%\" fxFlex=\"70%\" fxFlexOffset.gt-xs=\"15%\">\r\n            <div fxLayout=\"row\">\r\n                <div fxFlex.gt-sm=\"50%\" fxFlexOffset.gt-sm=\"25%\">\r\n                    <md-card class=\"indigo-background-color\">\r\n                        <md-card-header>\r\n                            <div fxFlex fxLayoutAlign=\"center center\">\r\n                                <md-icon class=\"white-text-color\">security</md-icon>\r\n                                &nbsp;&nbsp;\r\n                                <h2 class=\"white-text-color\">\r\n                                    Change Password\r\n                                </h2>\r\n                            </div>\r\n                        </md-card-header>\r\n                        <md-card-content>\r\n                            <div fxLayout=\"column\">\r\n                                <md-input-container fxFlex class=\"white-input mt1\" hintLabel=\"{{oldPasswordError}}\">\r\n                                    <input mdInput type=\"password\" placeholder=\"Old Password\" [(ngModel)]=\"user.oldPassword\">\r\n                                </md-input-container>\r\n\r\n                                <md-input-container fxFlex class=\"white-input mt1\" hintLabel=\"{{newPasswordError}}\">\r\n                                    <input mdInput type=\"password\" placeholder=\"New Password\" [(ngModel)]=\"user.newPassword\">\r\n                                </md-input-container>\r\n\r\n                                <md-input-container fxFlex class=\"white-input mt1\" hintLabel=\"{{newPasswordMatchError}}\">\r\n                                    <input mdInput type=\"password\" placeholder=\"Confirm New Password\" [(ngModel)]=\"user.confirmNewPassword\">\r\n                                </md-input-container>\r\n\r\n                                <div>\r\n                                    <div class=\"mt3\" fxFlex>\r\n                                        <button md-raised-button fxFlex (click)=\"changePassword()\">Change Password</button>\r\n                                    </div>\r\n                                </div>\r\n                            </div>\r\n                        </md-card-content>\r\n                    </md-card>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>"

/***/ }),

/***/ 568:
/***/ (function(module, exports) {

module.exports = "<div fxFlex=\"100%\" style=\"margin-top: 25px;\" fxLayout=\"column\" [style.height.px]=\"screenHeight\">\r\n    <md-sidenav-container class=\"chat-container\" [style.height]=\"screenHeight\">\r\n        <md-sidenav mode=\"side\" #sidenav class=\"chat-sidenav\" [style.height.px]=\"screenHeight\">\r\n            <md-list>\r\n                <div *ngFor=\"let companionUser of connectedUsers\" class=\"chat-users-list-item cursor-pointer p2\" (click)=\"selectCompanionUser(companionUser)\">\r\n                    <div class=\"chat-user-item\">\r\n                        <md-list-item>\r\n                            <img md-list-avatar src=\"{{replaceSlashes(companionUser.profilePicture.path)}}\" alt=\"{{companionUser.username}}\">\r\n                            <h3 md-line> {{companionUser.username}} </h3>\r\n                            <p *ngIf=\"companionUser.status === 'online'\" class=\"status-online\" md-line>\r\n                                {{companionUser.status}}\r\n                            </p>\r\n                            <p *ngIf=\"companionUser.status !== 'online'\" md-line>\r\n                                {{companionUser.lastOnline | date: 'dd-MMM hh:mm a'}}\r\n                            </p>\r\n                            <md-chip-list *ngIf=\"missedMessageMap[companionUser.chatRoom]\">\r\n                                <md-chip class=\"unread-message-count\">{{missedMessageMap[companionUser.chatRoom]}}</md-chip>\r\n                            </md-chip-list>\r\n                        </md-list-item>\r\n                    </div>\r\n                </div>\r\n            </md-list>\r\n        </md-sidenav>\r\n\r\n        <div class=\"chat-container\" [style.height.px]=\"screenHeight\">\r\n            <div fxFlex fxLayout=\"column\">\r\n                <div fxFlex=\"90%\" style=\"overflow-x: auto;\" fxLayout='column'>\r\n                    <div *ngIf=\"chatData.messages && chatData.messages.length\" class=\"margin-bottom-70 display-block\">\r\n                        <div *ngFor=\"let messageObj of chatData.messages\" fxLayoutAlign=\"{{getMessageAlignment(messageObj)}}\" fxFlex class=\"message-item\">\r\n                            <div class=\"message-container\">\r\n                                <div [ngClass]=\"{'my-pic': messageObj.from.user._id === userId}\">\r\n                                    <img *ngIf=\"messageObj.showImage\" src=\"{{replaceSlashes(messageObj.from.user.profilePicture.path)}}\" class=\"user-image\">\r\n                                </div>\r\n\r\n                                <div class=\"bubble\" [ngClass]=\"{'left-chat-bubble': messageObj.to.user._id === userId, 'right-chat-bubble': messageObj.from.user._id === userId}\">\r\n                                    <span>{{messageObj.message}}</span>\r\n                                    <div class=\"message-details\">\r\n                                        <span class=\"message-time\">{{messageObj.createdAt | date: 'hh:mm a'}}</span>\r\n                                        <md-icon class=\"message-status\" [ngClass]=\"{'green-color': isMessageRead(messageObj)}\">{{getMessageStatusIcon(messageObj)}}</md-icon>\r\n                                    </div>\r\n                                </div>\r\n                            </div>\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n\r\n                <div fxFlex=\"10%\">\r\n                    <md-card *ngIf=\"!!chatData.companionUser._id\" class=\"grey-background-color create-message-card height-70\">\r\n                        <div fxFlex=\"100%\" fxLayout=\"row\">\r\n                            <div fxFlex=\"95%\">\r\n                                <md-input-container fxFlex>\r\n                                    <input mdInput placeholder=\"New Message\" [(ngModel)]=\"chatData.newMessage\">\r\n                                </md-input-container>\r\n                            </div>\r\n                            <div fxFlex=\"5%\" fxLayout=\"row\" fxLayoutAlign=\"center center\">\r\n                                <button mdTooltip=\"Send\" [disabled]=\"!chatData.newMessage\" (click)=\"sendMessage(chatData.newMessage)\" md-icon-button color=\"primary\">\r\n                                    <md-icon>send</md-icon>\r\n                                </button>\r\n                            </div>\r\n                        </div>\r\n                    </md-card>\r\n                </div>\r\n                <button (click)=\"sidenav.toggle()\" md-fab class=\"fab indigo-background-color\" fxShow.lg=\"false\">\r\n                    <md-icon class=\"white-text-color\">format_list_bulleted</md-icon>\r\n                </button>\r\n            </div>\r\n        </div>\r\n\r\n    </md-sidenav-container>\r\n</div>"

/***/ }),

/***/ 569:
/***/ (function(module, exports) {

module.exports = "<router-outlet></router-outlet>"

/***/ }),

/***/ 57:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_material__ = __webpack_require__(21);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NotificationService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var NotificationService = (function () {
    function NotificationService(snackBar) {
        this.snackBar = snackBar;
        this.defaultDuration = 2000;
    }
    NotificationService.prototype.createSimpleNotification = function (message, duration) {
        if (duration === void 0) { duration = this.defaultDuration; }
        this.snackBar.open(message, null, {
            duration: duration
        });
    };
    NotificationService.prototype.createActionedNotification = function (message, action, duration) {
        if (duration === void 0) { duration = this.defaultDuration; }
        var snackBarRef = this.snackBar.open(message, action, {
            duration: duration
        });
        // use .subscribe(() => { //perform action }) on caller side to perform action
        return snackBarRef.onAction();
    };
    return NotificationService;
}());
NotificationService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["d" /* Injectable */])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_material__["d" /* MdSnackBar */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_material__["d" /* MdSnackBar */]) === "function" && _a || Object])
], NotificationService);

var _a;
//# sourceMappingURL=notification.service.js.map

/***/ }),

/***/ 570:
/***/ (function(module, exports) {

module.exports = "<div class=\"overflow-hidden\">\r\n    <h2 md-dialog-title>\r\n        Create Item\r\n\r\n    </h2>\r\n\r\n    <md-dialog-content>\r\n        <div fxLayout=\"column\">\r\n            <md-input-container fxFlex class=\"mt1\" hintLabel=\"{{titleError}}\">\r\n                <input mdInput placeholder=\"Title\" [(ngModel)]=\"item.title\">\r\n            </md-input-container>\r\n\r\n            <md-input-container fxFlex class=\"mt1\" hintLabel=\"{{descriptionError}}\">\r\n                <textarea mdInput placeholder=\"Description\" [(ngModel)]=\"item.description\"></textarea>\r\n            </md-input-container>\r\n\r\n            <div fxFlex=\"100%\" class=\"mt1 mb2\" *ngIf=\"!!uploadProgress\">\r\n                <md-progress-bar class=\"white-progress-bar\" [color]=\"primary\" [mode]=\"determinate\" [value]=\"uploadProgress\">\r\n                </md-progress-bar>\r\n            </div>\r\n\r\n            <div>\r\n                <img class=\"selected-pictures\" *ngFor=\"let imgData of previewData\" [src]=\"imgData\">\r\n            </div>\r\n            <label class=\"mt2 mb2 upload-image-button\">\r\n                <input multiple type=\"file\" id=\"file-upload\" ngFileSelect [options]=\"uploaderOptions\" [events]=\"inputUploadEvent\" (onUpload)=\"handleUpload($event)\" (onPreviewData)=\"handlePreviewData($event)\"> Images\r\n            </label>\r\n            <div fxFlex=\"100%\" class=\"mt1 mb2\" *ngIf=\"!!uploadProgress\">\r\n                <md-progress-bar [color]=\"primary\" [mode]=\"determinate\" [value]=\"uploadProgress\">\r\n                </md-progress-bar>\r\n            </div>\r\n        </div>\r\n    </md-dialog-content>\r\n\r\n    <!--TODO: align buttons to the bottom with-->\r\n    <md-dialog-actions style=\"margin: 0px;\">\r\n        <div fxLayout=\"row\" fxFlex fxLayoutAlign=\"end center\">\r\n            <button md-dialog-close md-button class=\"ml1\">Close</button>\r\n            <button md-button color=\"primary\" (click)=\"createItem()\">Create</button>\r\n        </div>\r\n    </md-dialog-actions>\r\n</div>"

/***/ }),

/***/ 571:
/***/ (function(module, exports) {

module.exports = "<div class=\"overflow-hidden\">\r\n    <h2 md-dialog-title>\r\n        Edit Item\r\n    </h2>\r\n\r\n    <md-dialog-content>\r\n        <div fxLayout=\"column\">\r\n            <md-input-container fxFlex class=\"mt1\" hintLabel=\"{{titleError}}\">\r\n                <input mdInput placeholder=\"Title\" [(ngModel)]=\"item.title\">\r\n            </md-input-container>\r\n\r\n            <md-input-container fxFlex class=\"mt1\" hintLabel=\"{{descriptionError}}\">\r\n                <textarea mdInput placeholder=\"Description\" [(ngModel)]=\"item.description\"></textarea>\r\n            </md-input-container>\r\n\r\n            <div fxFlex=\"100%\" class=\"mt1 mb2\" *ngIf=\"!!uploadProgress\">\r\n                <md-progress-bar class=\"white-progress-bar\" [color]=\"primary\" [mode]=\"determinate\" [value]=\"uploadProgress\">\r\n                </md-progress-bar>\r\n            </div>\r\n\r\n            <h4>Images</h4>\r\n            <div style=\"display: flex;\">\r\n                <div class=\"image-overlay-wrapper\" *ngFor=\"let imgData of item.images; let i = index;\">\r\n                    <div style=\"position: relative;\">\r\n                        <div class=\"image-overlay white-text-color\" (click)=\"deleteImage(i)\">\r\n                            <span>\r\n                                <b>Delete</b>&nbsp;\r\n                            </span>\r\n                            <md-icon>delete</md-icon>\r\n                        </div>\r\n                    </div>\r\n                    <img class=\"selected-pictures\" [src]=\"replaceSlashes(imgData.path)\">\r\n                </div>\r\n            </div>\r\n\r\n            <div *ngIf=\"previewData && previewData.length\">\r\n                <h4>Upload Images</h4>\r\n                <div>\r\n                    <img class=\"selected-pictures\" *ngFor=\"let imgData of previewData\" [src]=\"imgData\">\r\n                </div>\r\n            </div>\r\n\r\n            <label class=\"mt2 mb2 upload-image-button\">\r\n                <input multiple type=\"file\" id=\"file-upload\" ngFileSelect [options]=\"uploaderOptions\" [events]=\"inputUploadEvent\" (onUpload)=\"handleUpload($event)\" (onPreviewData)=\"handlePreviewData($event)\"> Images\r\n            </label>\r\n            <div fxFlex=\"100%\" class=\"mt1 mb2\" *ngIf=\"!!uploadProgress\">\r\n                <md-progress-bar [color]=\"primary\" [mode]=\"determinate\" [value]=\"uploadProgress\">\r\n                </md-progress-bar>\r\n            </div>\r\n        </div>\r\n    </md-dialog-content>\r\n\r\n    <!--TODO: align buttons to the bottom with-->\r\n    <md-dialog-actions style=\"margin: 0px;\">\r\n        <div fxLayout=\"row\" fxFlex fxLayoutAlign=\"end center\">\r\n            <button md-dialog-close md-button class=\"ml1\">Close</button>\r\n            <button md-button color=\"primary\" (click)=\"editItem()\">Edit</button>\r\n        </div>\r\n    </md-dialog-actions>\r\n</div>"

/***/ }),

/***/ 572:
/***/ (function(module, exports) {

module.exports = "<md-card>\r\n    <md-card-header>\r\n        <md-card-title>{{item.title}}</md-card-title>\r\n        <md-card-subtitle>{{'By '+item.owner.username}}</md-card-subtitle>\r\n        <div md-card-avatar [ngStyle]=\"getUserAvatarStyle()\"></div>\r\n    </md-card-header>\r\n    <div fxLayout=\"row\" *ngIf=\"!imageLoaded\">\r\n        <md-spinner fxFlex></md-spinner>\r\n    </div>\r\n    <img md-card-image (load)=\"imageLoadedSuccessfully()\" [hidden]=\"!imageLoaded\" [src]=\"replaceSlashes(item.images[0].path)\">\r\n    <md-card-content>\r\n        <h4>\r\n            Description\r\n        </h4>\r\n        <h5>{{item.description}}</h5>\r\n    </md-card-content>\r\n    <md-card-actions>\r\n        <div *ngIf=\"user._id === item.owner._id\">\r\n            <button md-button (click)=\"editItem()\">EDIT</button>\r\n            <button md-button (click)=\"deleteItem()\">DELETE</button>\r\n        </div>\r\n        <div *ngIf=\"user._id !== item.owner._id\">\r\n            <button md-button (click)=\"contactUser(item.owner._id)\">CONTACT</button>\r\n            <button md-button (click)=\"viewItem()\">VIEW</button>\r\n        </div>\r\n    </md-card-actions>\r\n</md-card>"

/***/ }),

/***/ 573:
/***/ (function(module, exports) {

module.exports = "<div fxFlex=\"100%\" class=\"mt2 pt2\" fxLayout=\"column\" fxLayoutAlign=\"center stretch\">\r\n    <div class=\"content\" fxLayout=\"row\" fxLayoutGap=\"16px\">\r\n        <div fxFlex.lt-sm=\"100%\" fxFlex=\"70%\" fxFlexOffset.gt-xs=\"15%\">\r\n            <div class=\"my3\" fxLayout=\"row\">\r\n                <div fxFlex=\"100%\" fxLayout=\"row\">\r\n                    <md-spinner *ngIf=\"loadingItems\" fxFlex></md-spinner>\r\n\r\n                    <div class=\"content\" *ngIf=\"!loadingItems\" fxLayoutGap=\"16px\" fxLayout=\"column\" fxFlex.lt-md=\"100%\" fxFlex.gt-md=\"50%\">\r\n                        <app-item-card *ngFor=\"let item of leftItems\" [item]=\"item\" (refreshItems)=\"loadItems()\"></app-item-card>\r\n                    </div>\r\n\r\n                    <div fxHide.lt-md class=\"content\" *ngIf=\"!loadingItems\" style=\"margin-left: 16px;\" fxLayoutGap=\"16px\" fxLayout=\"column\" fxFlex=\"50%\">\r\n                        <app-item-card *ngFor=\"let item of rightItems\" [item]=\"item\" (refreshItems)=\"loadItems()\"></app-item-card>\r\n                    </div>\r\n                </div>\r\n\r\n                <button (click)=\"createItem()\" md-fab class=\"fab indigo-background-color\">\r\n                    <md-icon class=\"white-text-color\">add</md-icon>\r\n                </button>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>"

/***/ }),

/***/ 574:
/***/ (function(module, exports) {

module.exports = "<div class=\"overflow-hidden\">\r\n    <h2 md-dialog-title>\r\n        {{item.title}}\r\n    </h2>\r\n\r\n    <md-dialog-content>\r\n        <div fxLayout=\"column\">\r\n            <div style=\"height: 550px;\">\r\n                <carousel>\r\n                    <slide *ngFor=\"let image of item.images\">\r\n                        <img [src]=\"image.path\" style=\"height: 100%; width: 100%; object-fit: cover;\" />\r\n                    </slide>\r\n                </carousel>\r\n            </div>\r\n\r\n            <h4>Description</h4>\r\n            <div fxFlex>\r\n                {{item.description}}\r\n            </div>\r\n        </div>\r\n    </md-dialog-content>\r\n\r\n    <!--TODO: align buttons to the bottom with-->\r\n    <md-dialog-actions style=\"margin: 0px;\">\r\n        <div fxLayout=\"row\" fxFlex fxLayoutAlign=\"end center\">\r\n            <button md-dialog-close md-button class=\"ml1\">Close</button>\r\n            <button md-button color=\"primary\">Contact</button>\r\n        </div>\r\n    </md-dialog-actions>\r\n</div>"

/***/ }),

/***/ 575:
/***/ (function(module, exports) {

module.exports = "<div fxFlex=\"100%\" class=\"mt4 pt2\" fxLayout=\"column\" fxLayoutAlign=\"center stretch\">\r\n    <div class=\"content mt4 pt2\" fxLayout=\"row\" fxLayoutGap=\"16px\">\r\n        <div fxFlex.lt-sm=\"100%\" fxFlex=\"70%\" fxFlexOffset.gt-xs=\"15%\">\r\n            <div fxLayout=\"row\">\r\n                <div fxFlex.gt-sm=\"50%\" fxFlexOffset.gt-sm=\"25%\">\r\n                    <md-card class=\"indigo-background-color\">\r\n                        <md-card-header>\r\n                            <div fxFlex fxLayoutAlign=\"center center\">\r\n                                <md-icon class=\"white-text-color\">account_circle</md-icon>\r\n                                &nbsp;&nbsp;\r\n                                <h2 class=\"white-text-color\">\r\n                                    User Details\r\n                                </h2>\r\n                            </div>\r\n                        </md-card-header>\r\n                        <md-card-content>\r\n                            <div fxLayout=\"column\">\r\n                                <div fxFlex=\"100%\" fxLayout=\"row\" fxLayoutAlign=\"center none\">\r\n                                    <div class=\"avatar-100-image-overlay-wrapper\">\r\n                                        <div class=\"avatar-100\" class=\"avatar-100 avatar-100-image-overlay white-text-color\">\r\n                                            <input type=\"file\" id=\"profile-picture\" ngFileSelect [options]=\"uploaderOptions\" [events]=\"inputUploadEvent\" (onUpload)=\"handleUpload($event)\" (beforeUpload)=\"beforeUpload($event)\" (onPreviewData)=\"handlePreviewData($event)\">\r\n                                            <span>\r\n                                                <b>Change</b>&nbsp;\r\n                                            </span>\r\n                                            <md-icon>mode_edit</md-icon>\r\n                                        </div>\r\n                                        <img [src]=\"user.profilePictureUrl\" alt=\"profile picture\" class=\"avatar-100\">\r\n                                    </div>\r\n                                </div>\r\n\r\n                                <div fxFlex=\"100%\" class=\"mt1 mb2\" *ngIf=\"!!uploadProgress\">\r\n                                    <md-progress-bar class=\"white-progress-bar\" [color]=\"primary\" [mode]=\"determinate\" [value]=\"uploadProgress\">\r\n                                    </md-progress-bar>\r\n                                </div>\r\n\r\n                                <md-input-container fxFlex class=\"white-input mt1\" hintLabel=\"{{usernameError}}\">\r\n                                    <input mdInput placeholder=\"Username\" [(ngModel)]=\"user.username\">\r\n                                </md-input-container>\r\n\r\n                                <md-input-container fxFlex class=\"white-input mt1\" hintLabel=\"{{emailError}}\">\r\n                                    <input mdInput type=\"email\" placeholder=\"Email\" [(ngModel)]=\"user.email\">\r\n                                </md-input-container>\r\n\r\n                                <div class=\"mt3\">\r\n                                    <div fxFlex>\r\n                                        <button md-raised-button fxFlex (click)=\"saveChanges()\">Save Changes</button>\r\n                                    </div>\r\n                                </div>\r\n                                <div class=\"mt1\">\r\n                                    <div fxFlex>\r\n                                        <button routerLink=\"/dashboard/change-password\" md-raised-button fxFlex>Change Password</button>\r\n                                    </div>\r\n                                </div>\r\n                            </div>\r\n                        </md-card-content>\r\n                    </md-card>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>"

/***/ }),

/***/ 576:
/***/ (function(module, exports) {

module.exports = "<div fxLayout=\"row\" class=\"mt4\">\r\n    <div fxFlex=\"80%\" fxFlexOffset=\"10%\" class=\"mt4\">\r\n        <div fxLayout=\"column\" class=\"mt4\">\r\n            <div fxLayoutAlign=\"space-around center\" class=\"mt4\">\r\n                <button class=\"p4\" md-raised-button color=\"primary\" fxFlex routerLink=\"/login\">Login</button>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>"

/***/ }),

/***/ 577:
/***/ (function(module, exports) {

module.exports = "<div fxFlex=\"100%\" class=\"mt4 pt4\" fxLayout=\"column\" fxLayoutAlign=\"center stretch\">\r\n    <div class=\"content mt4\" fxLayout=\"row\" fxLayoutGap=\"16px\">\r\n        <div fxFlex.lt-sm=\"100%\" fxFlex=\"70%\" fxFlexOffset.gt-xs=\"15%\">\r\n            <div fxLayout=\"row\">\r\n                <div fxFlex.gt-sm=\"50%\" fxFlexOffset.gt-sm=\"25%\">\r\n                    <md-card class=\"indigo-background-color\">\r\n                        <md-card-header>\r\n                            <div fxFlex fxLayoutAlign=\"center center\">\r\n                                <h2 class=\"white-text-color\">Login</h2>\r\n                            </div>\r\n                        </md-card-header>\r\n                        <md-card-content>\r\n                            <div fxLayout=\"column\">\r\n                                <md-input-container fxFlex class=\"white-input mt1\" hintLabel=\"{{usernameError}}\">\r\n                                    <input mdInput placeholder=\"Username\" [(ngModel)]=\"user.email\">\r\n                                </md-input-container>\r\n\r\n                                <md-input-container fxFlex class=\"white-input mt1\" hintLabel=\"{{passwordError}}\">\r\n                                    <input mdInput placeholder=\"Password\" type=\"password\" [(ngModel)]=\"user.password\">\r\n                                </md-input-container>\r\n\r\n                                <div class=\"mt3\" fxFlex=\"100%\">\r\n                                    <div fxFlex=\"35%\" fxFlexOffset=\"10%\">\r\n                                        <button md-raised-button fxFlex (click)=\"login()\">Login</button>\r\n                                    </div>\r\n                                    <div fxFlex=\"35%\" fxFlexOffset=\"10%\">\r\n                                        <button routerLink=\"/register\" md-raised-button fxFlex>Register</button>\r\n                                    </div>\r\n                                </div>\r\n                            </div>\r\n                        </md-card-content>\r\n                    </md-card>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>"

/***/ }),

/***/ 578:
/***/ (function(module, exports) {

module.exports = "<div fxFlex=\"100%\" class=\"mt4 pt4\" fxLayout=\"column\" fxLayoutAlign=\"center stretch\">\r\n    <div class=\"content mt4\" fxLayout=\"row\" fxLayoutGap=\"16px\">\r\n        <div fxFlex.lt-sm=\"100%\" fxFlex=\"70%\" fxFlexOffset.gt-xs=\"15%\">\r\n            <div fxLayout=\"row\">\r\n                <div fxFlex.gt-sm=\"50%\" fxFlexOffset.gt-sm=\"25%\">\r\n                    <md-card class=\"indigo-background-color\">\r\n                        <md-card-header>\r\n                            <div fxFlex fxLayoutAlign=\"center center\">\r\n                                <h2 class=\"white-text-color\">Register</h2>\r\n                            </div>\r\n                        </md-card-header>\r\n                        <md-card-content>\r\n                            <div fxLayout=\"column\">\r\n                                <md-input-container fxFlex class=\"white-input mt1\" hintLabel=\"{{emailError}}\">\r\n                                    <input [(ngModel)]=\"user.email\" mdInput placeholder=\"Email\" type=\"email\">\r\n                                </md-input-container>\r\n\r\n                                <md-input-container fxFlex class=\"white-input mt1\" hintLabel=\"{{usernameError}}\">\r\n                                    <input [(ngModel)]=\"user.username\" mdInput placeholder=\"Username\">\r\n                                </md-input-container>\r\n\r\n                                <md-input-container fxFlex class=\"white-input mt1\">\r\n                                    <input [(ngModel)]=\"user.password\" mdInput placeholder=\"Password\" type=\"password\">\r\n                                </md-input-container>\r\n\r\n                                <md-input-container fxFlex class=\"white-input mt1\" hintLabel=\"{{passwordError}}\">\r\n                                    <input [(ngModel)]=\"user.confirmPassword\" mdInput placeholder=\"Confirm Password\" type=\"password\">\r\n                                </md-input-container>\r\n\r\n                                <div>\r\n                                    <div class=\"mt3\" fxFlex>\r\n                                        <button (click)=\"register()\" routerLink=\"/register\" md-raised-button fxFlex>Register</button>\r\n                                    </div>\r\n                                </div>\r\n                            </div>\r\n                        </md-card-content>\r\n                    </md-card>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>"

/***/ }),

/***/ 579:
/***/ (function(module, exports) {

module.exports = "<div class=\"overflow-hidden\">\r\n    <h2 md-dialog-title>\r\n        {{title}}\r\n    </h2>\r\n\r\n    <md-dialog-content>\r\n        {{description}}\r\n    </md-dialog-content>\r\n\r\n    <!--TODO: align buttons to the bottom with-->\r\n    <md-dialog-actions style=\"margin: 0px;\">\r\n        <div fxLayout=\"row\" fxFlex fxLayoutAlign=\"end center\">\r\n            <button md-dialog-close md-button class=\"ml1\" (click)=\"dialogRef.close()\">{{cancelButtonText || 'Cancel'}}</button>\r\n            <button md-button color=\"primary\" (click)=\"dialogRef.close(true)\">{{confirmButtonText || 'Confirm'}}</button>\r\n        </div>\r\n    </md-dialog-actions>\r\n</div>"

/***/ }),

/***/ 74:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Rx__ = __webpack_require__(53);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Rx___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_Rx__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NotificationCountService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var NotificationCountService = (function () {
    function NotificationCountService() {
        this.updateFlag = true;
        this.notificationCountSubject = new __WEBPACK_IMPORTED_MODULE_1_rxjs_Rx__["BehaviorSubject"](0);
        this.count = 0;
    }
    NotificationCountService.prototype.setCount = function (count) {
        this.count = count;
        if (this.updateFlag) {
            this.notificationCountSubject.next(this.count);
        }
    };
    NotificationCountService.prototype.addToCount = function (num) {
        this.count += num;
        if (this.updateFlag) {
            this.notificationCountSubject.next(this.count);
        }
    };
    NotificationCountService.prototype.setUpdateFlag = function (val) {
        this.updateFlag = val;
    };
    NotificationCountService.prototype.getSubscription = function () {
        return this.notificationCountSubject
            .asObservable()
            .share()
            .distinctUntilChanged();
    };
    return NotificationCountService;
}());
NotificationCountService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["d" /* Injectable */])(),
    __metadata("design:paramtypes", [])
], NotificationCountService);

//# sourceMappingURL=notification-count.service.js.map

/***/ }),

/***/ 75:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_material__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__confirm_confirm_component__ = __webpack_require__(187);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ConfirmService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var ConfirmService = (function () {
    function ConfirmService(dialog) {
        this.dialog = dialog;
    }
    ConfirmService.prototype.confirm = function (title, message, confirmButtonText, cancelButtonText) {
        if (title === void 0) { title = 'Confirm'; }
        if (confirmButtonText === void 0) { confirmButtonText = 'Confirm'; }
        if (cancelButtonText === void 0) { cancelButtonText = 'Cancel'; }
        var dialogRef;
        dialogRef = this.dialog.open(__WEBPACK_IMPORTED_MODULE_2__confirm_confirm_component__["a" /* ConfirmComponent */]);
        dialogRef.componentInstance.title = title;
        dialogRef.componentInstance.description = message;
        dialogRef.componentInstance.confirmButtonText = confirmButtonText;
        dialogRef.componentInstance.cancelButtonText = cancelButtonText;
        return dialogRef.afterClosed();
    };
    return ConfirmService;
}());
ConfirmService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["d" /* Injectable */])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_material__["c" /* MdDialog */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_material__["c" /* MdDialog */]) === "function" && _a || Object])
], ConfirmService);

var _a;
//# sourceMappingURL=confirm.service.js.map

/***/ }),

/***/ 830:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 832:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(434);


/***/ })

},[832]);
//# sourceMappingURL=main.bundle.js.map