export interface IDate {
    day: IComplexProp,
    date: number,
    month: IComplexProp,
    year: number,
    array: MonthArray
}

export type MonthArray = IMonthArrayDay[];

interface IMonthArrayDay {
    id: string;
    date: Date;
    number: number;
}

interface IComplexProp {
    name: {
        short: string,
        full: string
    },
    number: number
}