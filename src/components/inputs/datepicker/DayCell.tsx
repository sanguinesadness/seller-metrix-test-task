import { toJS } from 'mobx';
import { observer } from 'mobx-react-lite';
import React, { FC, useEffect, useState } from 'react'
import blockRange from '../../../store/block-range';

interface IDayCell {
    value: string | number;
    date: Date;
    disabled?: boolean;
    invisible?: boolean;
}

const DayCell: FC<IDayCell> = observer(({ 
    value, 
    date,
    disabled, 
    invisible
}) => {
    const [isBetween, setIsBetween] = useState<boolean>(false);

    const clickHandler = () => {
        if (disabled) {
            return;
        }

        if (blockRange.from && !blockRange.to) {
            blockRange.setTo(date);
        } else {
            blockRange.setFrom(date);
            blockRange.clearTo();
        }
    }

    useEffect(() => {
        setIsBetween(blockRange.isBetween((date)));
    }, [blockRange.from, blockRange.to]);

    return (
        <div className={`datepicker__day-cell flex items-center justify-center
                        ${isBetween ? "between" : ""} 
                        ${invisible ? "invisible" : ""}
                        ${disabled ? "text-gray-300 cursor-default" : "cursor-pointer"}`}
             onClick={clickHandler}>
            {value}
        </div>
    )
})

export default DayCell
