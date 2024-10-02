"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DateUtils = void 0;
const dayjs_1 = require("dayjs");
exports.DateUtils = {
    startOfDay: (date) => {
        return (0, dayjs_1.default)(date).startOf("day").toDate();
    },
    endOfDay: (date) => {
        return (0, dayjs_1.default)(date).endOf("day").toDate();
    },
    getNumberOfDays: (startDate, endDate) => {
        const start = (0, dayjs_1.default)(startDate).startOf("day");
        const end = (0, dayjs_1.default)(endDate).startOf("day");
        return end.diff(start, "day") + 1;
    },
    addDays: (date, days) => {
        return (0, dayjs_1.default)(date).add(days, "day").toDate();
    },
    subtractDays: (date, days) => {
        return (0, dayjs_1.default)(date).subtract(days, "day").toDate();
    },
};
//# sourceMappingURL=date.helper.js.map