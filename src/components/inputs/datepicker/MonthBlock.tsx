import React, { FC } from 'react'
import { DAY_NAMES } from '../../../constants/day-names';
import DateService from '../../../services/date-service';
import { IDate } from '../../../types/date';
import DayCell from './DayCell';

interface IMonthBlockProps {
    date: IDate;
}

const MonthBlock: FC<IMonthBlockProps> = ({ date }) => {
    return (
        <div className="flex flex-col p-3 pb-0">
            <div className="flex items-center justify-center mb-2">
                <div className="font-medium">
                    <span>{date.month.name.full} {date.year}</span>
                </div>
            </div>
            <div className="text-sm">
                <div className="grid grid-cols-7 text-gray-400">
                    {
                        DAY_NAMES.SHORT.map((dayName) => (
                            <div className="datepicker__day-header flex items-center justify-center" 
                                 key={dayName}>
                                     {dayName}
                            </div>
                        ))
                    }
                </div>
                <div className="grid grid-cols-7">
                    {
                        date.array.map((day, index) => (
                            <DayCell key={day.id || index} 
                                     value={day.number || ''} 
                                     date={day.date}
                                     invisible={day.number == 0}
                                     disabled={DateService.isLaterThanToday(day.date) || DateService.isSoonerThanFirstDay(day.date)}/>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default MonthBlock
