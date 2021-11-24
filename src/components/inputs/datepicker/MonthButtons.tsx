import { IconButton } from '@mui/material';
import React, { FC, useState } from 'react';
import { Sides, SideType } from '../../../types/side';
import { ReactComponent as left_icon } from '../../../icons/ic_angle-left.svg';
import { ReactComponent as right_icon } from '../../../icons/ic_angle-right.svg';
import { ReactComponent as double_left_icon } from '../../../icons/ic_angle_double_left.svg';
import { ReactComponent as double_right_icon } from '../../../icons/ic_angle_double_right.svg';

interface IMonthButtonsProps {
    side: SideType;
    onBtnClick?: () => void;
    onDoubleBtnClick?: () => void;
    btnDisabled?: boolean;
    doubleBtnDisabled?: boolean;
}

const MonthButtons: FC<IMonthButtonsProps> = ({ 
    side, 
    onBtnClick, 
    onDoubleBtnClick,
    btnDisabled,
    doubleBtnDisabled
}) => {
    const [Icon] = useState(side === Sides.LEFT ? () => left_icon : () => right_icon);
    const [DoubleIcon] = useState(side === Sides.LEFT ? () => double_left_icon : () => double_right_icon);
    const [direction] = useState(side === Sides.LEFT ? "left-0" : "right-0");

    return (
        <div className={`absolute top-0 m-2 ${direction}`}>
            <IconButton onClick={onBtnClick} disabled={btnDisabled}>
                <Icon/>
            </IconButton>
            <IconButton onClick={onDoubleBtnClick} disabled={doubleBtnDisabled}>
                <DoubleIcon/>
            </IconButton>
        </div>
    )
}

export default MonthButtons