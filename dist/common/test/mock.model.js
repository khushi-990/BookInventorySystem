"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MockModel = void 0;
class MockModel {
    findOne() {
        return {
            lean: () => ({
                exec: () => this.entityStub,
            }),
        };
    }
    find() {
        return {
            sort: () => ({
                exec: () => [this.entityStub],
            }),
        };
    }
    async create() {
        return this.entityStub;
    }
    async save() {
        return this.entityStub;
    }
    findOneAndUpdate() {
        return {
            exec: async () => this.entityStub,
        };
    }
    lean() {
        return {
            lean: () => ({
                exec: () => this.entityStub,
            }),
        };
    }
    updateOne() {
        return {
            exec: () => { },
        };
    }
    deleteOne() {
        return this.updateOne();
    }
    getUserByEmail() {
        return {
            lean: () => ({
                exec: () => this.entityStub,
            }),
        };
    }
}
exports.MockModel = MockModel;
//# sourceMappingURL=mock.model.js.map