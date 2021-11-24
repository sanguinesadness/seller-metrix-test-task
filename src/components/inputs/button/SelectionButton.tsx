import { Button } from '@mui/material'
import React, { FC } from 'react'

interface ISelectionButtonProps {
    text: string;
    selected?: boolean;
    disabled?: boolean;
    onClick?: () => void;
}

const SelectionButton: FC<ISelectionButtonProps> = ({ text, disabled, onClick, selected }) => {
    const clickHandler = () => {
        if (disabled) {
            return;
        }

        onClick?.call(null);
    }

    return (
        <Button variant="text" 
                className={`selection-button ${selected && "selected"}`}
                onClick={clickHandler}>
                    {text}
        </Button>
    )
}

export default SelectionButton
