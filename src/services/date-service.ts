import { MONTH_NAMES } from "../constants/month-names";
import { add, compareAsc, differenceInDays, isWithinInterval, sub } from 'date-fns';
import { IDate, MonthArray } from "../types/date";
import { DAY_NAMES } from "../constants/day-names";
import { v4 } from 'uuid';
import { START_DATE } from '../constants/lifetime';

class DateService {
    public static getToday(): Date {
        return new Date();
    }

    public static getPrevMonth(date: Date): Date {
        return sub(date, { months: 1 });
    }

    public static getNextMonth(date: Date): Date {
        return add(date, { months: 1 });
    }

    public static addMonth(date: Date, num: number): Date {
        return add(date, { months: num });
    }

    public static subMonth(date: Date, num: number): Date {
        return sub(date, { months: num });
    }

    public static addDays(date: Date, num: number): Date {
        return add(date, { days: num });
    }

    public static subDays(date: Date, num: number): Date {
        return sub(date, { days: num });
    }

    public static getLastNDays(days: number) {
        return sub(new Date(), { days });
    }

    public static getYesterday(): Date {
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() - 1);

        return tomorrow;
    }

    public static getPrevYear(date: Date) {
        return sub(date, { years: 1 });
    }

    public static getDifferenseInDays(from: Date, to: Date) {
        return differenceInDays(from, to);
    }

    public static isToday(date: Date): boolean {
        const today = new Date();

        const year1 = today.getFullYear();
        const year2 = date.getFullYear();

        const month1 = today.getMonth();
        const month2 = date.getMonth();

        const day1 = today.getDate();
        const day2 = date.getDate();

        return year1 === year2 && month1 === month2 && day1 === day2;
    }

    public static isFirstDay(date: Date): boolean {
        const today = START_DATE;

        const year1 = today.getFullYear();
        const year2 = date.getFullYear();

        const month1 = today.getMonth();
        const month2 = date.getMonth();

        const day1 = today.getDate();
        const day2 = date.getDate();

        return year1 === year2 && month1 === month2 && day1 === day2;
    }

    public static isCurrentMonth(date: Date): boolean {
        const today = new Date();

        const year1 = today.getFullYear();
        const year2 = date.getFullYear();

        const month1 = today.getMonth();
        const month2 = date.getMonth();

        return year1 === year2 && month1 === month2;
    }

    public static isFirstMonth(date: Date): boolean {
        const today = START_DATE;

        const year1 = today.getFullYear();
        const year2 = date.getFullYear();

        const month1 = today.getMonth();
        const month2 = date.getMonth();

        return year1 === year2 && month1 === month2;
    }

    public static isBetween(date: Date, from: Date, to: Date): boolean {
        return isWithinInterval(date, {
            start: from,
            end: to
        });
    }

    public static compare(date1: Date, date2: Date): number {
        return compareAsc(date1, date2);
    }

    public static isLaterThanToday(date: Date): boolean {
        const today = new Date();
        const res = compareAsc(date, today);

        return res > 0;
    }

    public static isSoonerThanFirstDay(date: Date): boolean {
        const res = compareAsc(date, START_DATE);

        return res < 0;
    }

    public static toString(date: Date) {
        const month = date.getMonth();
        const day = date.getDate();
        const year = date.getFullYear();

        const monthName = MONTH_NAMES.SHORT[month];

        return `${monthName} ${day}, ${year}`;
    }

    public static getMonthArray(date: Date): MonthArray {
        const firstDay = this.getFirstMonthDay(date);
        const monthDays = this.getMonthDays(date);

        const array: MonthArray = new Array(6 * 7).fill({
            date: new Date(),
            number: 0
        });
        
        let j = firstDay;
        for (let i = 1; i <= monthDays; i++) {
            array[j] = {
                id: v4(),
                number: i,
                date: new Date(date.getFullYear(), date.getMonth(), i)
            };

            j++;
        }

        return array;
    }

    public static getMonthInfo(date: Date): IDate {
        const day = date.getDay();
        const monthDay = date.getDate();
        const month = date.getMonth();
        const year = date.getFullYear();

        const result: IDate = {
            day: {
                name: {
                    short: DAY_NAMES.SHORT[day],
                    full: DAY_NAMES.FULL[day]
                },
                number: day
            },
            date: monthDay,
            month: {
                name: {
                    short: MONTH_NAMES.SHORT[month],
                    full: MONTH_NAMES.FULL[month]
                },
                number: month
            },
            year: year,
            array: this.getMonthArray(date)
        };

        return result;
    }

    public static getMonthDays(date: Date) {
        return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    }

    public static getFirstMonthDay(date: Date) {
        return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
    }

    public static areDatesEqual(date1: Date, date2: Date) {
        return date1.getTime() === date2.getTime();
    }

    public static areDaysEqual(date1: Date, date2: Date) {
        const year1 = date1.getFullYear();
        const year2 = date2.getFullYear();

        const month1 = date1.getMonth();
        const month2 = date2.getMonth();

        const day1 = date1.getDate();
        const day2 = date2.getDate();

        return year1 === year2 && month1 === month2 && day1 === day2;
    }
}

export default DateService;