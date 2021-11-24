import add from "date-fns/add";
import { makeAutoObservable } from "mobx";
import { START_DATE } from "../constants/lifetime";
import DateService from "../services/date-service";
import { IBlockDateRange } from "../types/datepicker";

class BlockRange implements IBlockDateRange {
    from?: Date;
    to?: Date;

    constructor() {
        makeAutoObservable(this);
    }

    private swapIfFromAfterTo() {
        if (this.from && this.to && DateService.compare(this.from, this.to) > 0) {
            this.swap();
        }
    }

    setFrom(date: Date) {
        this.from = date;
    }

    setTo(date: Date) {
        this.to = date;
        this.swapIfFromAfterTo();
    }

    setRange(from: Date, to: Date) {
        this.from = from;
        this.to = to;
    }

    swap() {
        [this.from, this.to] = [this.to, this.from];
    }

    isBetween(date: Date): boolean {
        if (!this.from || !this.to) {
            return false;
        }

        if (DateService.areDaysEqual(this.from, date) ||
            DateService.areDaysEqual(this.to, date)) {
            return true;
        }

        return DateService.isBetween(date, this.from, this.to);
    }

    setToday() {
        this.from = DateService.getToday();
        this.to = DateService.getToday();
    }

    setYesterday() {
        this.from = DateService.getYesterday();
        this.to = DateService.getYesterday();
    }

    setNLastDays(days: number) {
        this.from = DateService.getLastNDays(days);
        this.to = DateService.getToday();
    }

    setLastMonth() {
        this.from = DateService.getPrevMonth(DateService.getToday());
        this.to = DateService.getToday();
    }

    setLastYear() {
        this.from = DateService.getPrevYear(DateService.getToday());
        this.to = DateService.getToday();
    }

    setLifetime() {
        this.from = START_DATE;
        this.to = DateService.getToday();
    }

    clearFrom() {
        this.from = undefined;
    }

    clearTo() {
        this.to = undefined;
    }
}   

export default new BlockRange();