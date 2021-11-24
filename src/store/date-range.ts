import { makeAutoObservable } from "mobx";
import DateService from "../services/date-service";
import { IDateRange } from "../types/datepicker";

class DateRange implements IDateRange {
    from: Date = DateService.getToday();
    to: Date = DateService.getToday();

    constructor() {
        makeAutoObservable(this);
    }

    setRange(from: Date, to: Date) {
        this.from = from;
        this.to = to;
    }

    setOneDate(date: Date) {
        this.from = this.to = date;
    }   

    setToday() {
        this.setOneDate(DateService.getToday());
    }

    setYesterday() {
        this.setOneDate(DateService.getYesterday());
    }

    setPrevPeriod() {
        const diff = -DateService.getDifferenseInDays(this.from, this.to) || 1;
        
        this.from = DateService.subDays(this.from, diff);
        this.to = DateService.subDays(this.to, diff);
    }

    setNextPeriod() {
        const diff = -DateService.getDifferenseInDays(this.from, this.to) || 1;

        this.from = DateService.addDays(this.from, diff);
        this.to = DateService.addDays(this.to, diff);
    }

    isDateSame() {
        return DateService.areDatesEqual(this.from, this.to);
    }
}   

export default new DateRange();