import React, { FC, useEffect, useState } from 'react';
import DateService from '../../../services/date-service';
import { Sides } from '../../../types/side';
import MonthBlock from './MonthBlock';
import MonthButtons from './MonthButtons';
import dateRange from '../../../store/date-range';
import blockRange from '../../../store/block-range';
import { observer } from 'mobx-react-lite';

interface IMonthBlocksProps {
    isCollapsed: boolean;
}

const MonthBlocks: FC<IMonthBlocksProps> = observer(({ isCollapsed }) => {
    const [rightMonth, setRightMonth] = useState<Date>(DateService.getToday());
    const [leftMonth, setLeftMonth] = useState<Date>(DateService.getPrevMonth(rightMonth));

    useEffect(() => {
        if (blockRange.from && blockRange.to) {
            dateRange.setRange(blockRange.from, blockRange.to);
        }
    }, [blockRange.from, blockRange.to]);

    useEffect(() => {
        blockRange.setRange(dateRange.from, dateRange.to);
    }, [dateRange.from, dateRange.to]);

    useEffect(() => {
        if (blockRange.from && !blockRange.to) {
            blockRange.clearFrom();
            blockRange.clearTo();
        }

        setRightMonth(dateRange.to);
        setLeftMonth(DateService.getPrevMonth(dateRange.to));
    }, [isCollapsed]);

    const toPrevMonth = () => {
        setRightMonth(leftMonth);
        setLeftMonth(DateService.getPrevMonth(leftMonth));
    }

    const toNextMonth = () => {
        setLeftMonth(rightMonth);
        setRightMonth(DateService.getNextMonth(rightMonth));
    }

    const toNextMonthDouble = () => {
        let monthNum = 2;

        if (DateService.isCurrentMonth(DateService.getNextMonth(rightMonth))) {
            monthNum = 1;
        }

        setLeftMonth(DateService.addMonth(leftMonth, monthNum));
        setRightMonth(DateService.addMonth(rightMonth, monthNum));
    }

    const toPrevMonthDouble = () => {
        let monthNum = 2;

        if (DateService.isFirstMonth(DateService.getPrevMonth(leftMonth))) {
            monthNum = 1;
        }

        setLeftMonth(DateService.subMonth(leftMonth, monthNum));
        setRightMonth(DateService.subMonth(rightMonth, monthNum));
    }

    return (
        <div className="grid grid-flow-col gap-x-10 relative">
            <MonthButtons side={Sides.LEFT}
                          onBtnClick={toPrevMonth}
                          onDoubleBtnClick={toPrevMonthDouble}
                          btnDisabled={DateService.isFirstMonth(leftMonth)}
                          doubleBtnDisabled={DateService.isFirstMonth(leftMonth)}/>
            <MonthButtons side={Sides.RIGHT}
                          onBtnClick={toNextMonth}
                          onDoubleBtnClick={toNextMonthDouble}
                          btnDisabled={DateService.isCurrentMonth(rightMonth)}
                          doubleBtnDisabled={DateService.isCurrentMonth(rightMonth)}/>
            <MonthBlock date={DateService.getMonthInfo(leftMonth)}/>
            <MonthBlock date={DateService.getMonthInfo(rightMonth)}/>
        </div>
    )
})

export default MonthBlocks
