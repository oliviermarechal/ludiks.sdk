"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Ludiks = void 0;
class Ludiks {
    static initUser(options) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const baseUrl = (_a = options.baseUrl) !== null && _a !== void 0 ? _a : this.defaultBaseUrl;
            const res = yield fetch(`${baseUrl}/api/end-user`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${options.apiKey}`,
                },
                body: JSON.stringify({
                    id: options.user.id,
                    fullName: options.user.fullName,
                    email: options.user.email,
                    picture: options.user.picture,
                    metadata: options.user.metadata,
                }),
            });
            if (!res.ok) {
                throw new Error(`Failed to init user: ${res.status}`);
            }
        });
    }
    static trackEvent(options) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const baseUrl = (_a = options.baseUrl) !== null && _a !== void 0 ? _a : this.defaultBaseUrl;
            try {
                const res = yield fetch(`${baseUrl}/api/tracking`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${options.apiKey}`,
                    },
                    body: JSON.stringify({
                        userId: options.userId,
                        eventName: options.eventName,
                        value: options.value,
                        timestamp: options.timestamp,
                    }),
                });
                if (!res.ok) {
                    throw new Error(`Failed to track event: ${res.status}`);
                }
                return yield res.json();
            }
            catch (err) {
                console.error('Ludiks trackEvent error:', err);
                throw err;
            }
        });
    }
    static getProfile(options) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const baseUrl = (_a = options.baseUrl) !== null && _a !== void 0 ? _a : this.defaultBaseUrl;
            const res = yield fetch(`${baseUrl}/api/end-user/${options.userId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${options.apiKey}`,
                },
            });
            if (!res.ok) {
                throw new Error(`Failed to get profile: ${res.status}`);
            }
            return yield res.json();
        });
    }
}
exports.Ludiks = Ludiks;
Ludiks.defaultBaseUrl = 'https://api.ludiks.io';
