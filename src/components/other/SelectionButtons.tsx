import React, { FC, SetStateAction } from 'react'
import { ISelectionButton } from '../../types/selection-button'
import SelectionButton from '../inputs/button/SelectionButton'

interface ISelectionButtonsProps {
    buttons: ISelectionButton[];
    setIsCollapsed: React.Dispatch<SetStateAction<boolean>>;
}

const SelectionButtons: FC<ISelectionButtonsProps> = ({ buttons, setIsCollapsed }) => {
    const clickHandler = (btn: ISelectionButton) => {
        setIsCollapsed(false);
        btn.onClick?.call(null);
    }

    return (
        <div className="border-l-2 flex flex-col h-full w-34 p-2 ml-6">
            {
                buttons.map((btn, index) => (
                    <SelectionButton key={index}
                                     text={btn.text}
                                     onClick={() => clickHandler(btn)}/>
                ))
            }
        </div>
    )
}

export default SelectionButtons
