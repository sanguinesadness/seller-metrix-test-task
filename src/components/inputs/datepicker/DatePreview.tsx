import { IconButton } from '@mui/material';
import { observer } from 'mobx-react-lite';
import React, { FC, MouseEventHandler, useEffect, useState } from 'react';
import logo from "../../../icons/calendar-alt-solid.svg";
import left_icon from "../../../icons/ic_angle-left.svg";
import right_icon from "../../../icons/ic_angle-right.svg";
import DateService from '../../../services/date-service';
import dateRange from '../../../store/date-range';

interface IDatePreviewProps {
    onClick?: MouseEventHandler<HTMLDivElement>;
}

const DatePreview: FC<IDatePreviewProps> = observer((({ onClick }) => {
    const [isDateSame, setIsDateSame] = useState<boolean>(dateRange.isDateSame());

    useEffect(() => {
        setIsDateSame(DateService.areDaysEqual(dateRange.from, dateRange.to));
    }, [dateRange.from, dateRange.to]);

    const isNextBtnDisabled = (): boolean => {
        const diff = -DateService.getDifferenseInDays(dateRange.from, dateRange.to) || 1;

        const nextFrom = DateService.addDays(dateRange.from, diff);
        const nextTo = DateService.addDays(dateRange.to, diff);

        return DateService.isLaterThanToday(nextFrom) || DateService.isLaterThanToday(nextTo);
    }

    const isPrevBtnDisabled = (): boolean => {
        const diff = -DateService.getDifferenseInDays(dateRange.from, dateRange.to) || 1;

        const prevFrom = DateService.subDays(dateRange.from, diff);
        const prevTo = DateService.subDays(dateRange.to, diff);

        return DateService.isSoonerThanFirstDay(prevFrom) || DateService.isSoonerThanFirstDay(prevTo);
    }

    return (
        <div className="flex p-4 items-center justify-end">
            <div className="flex items-center cursor-pointer"
                 onClick={onClick}>
                <img className="h-5 w-5" src={logo} alt=""/>
                <span className="mx-6">
                    {isDateSame ? 
                        <>{DateService.toString(dateRange.from)}</>
                        :
                        <>{DateService.toString(dateRange.from)} - {DateService.toString(dateRange.to)}</>    
                    }
                </span>
            </div>
            <div>
                <IconButton aria-label="Previous date" 
                            disabled={isPrevBtnDisabled()}
                            onClick={() => dateRange.setPrevPeriod()}>
                    <img src={left_icon} className="h-5 w-5" alt=""/>
                </IconButton>
                <IconButton aria-label="Next date" 
                            disabled={isNextBtnDisabled()}
                            onClick={() => dateRange.setNextPeriod()}>
                    <img src={right_icon} className="h-5 w-5" alt=""/>
                </IconButton>
            </div>
        </div>
    )
}))

export default DatePreview
