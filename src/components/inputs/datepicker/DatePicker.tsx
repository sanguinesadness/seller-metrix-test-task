import { observer } from 'mobx-react-lite';
import React, { FC, useCallback, useEffect, useState } from 'react';
import DatePreview from './DatePreview';
import { motion, Variants } from 'framer-motion';
import MonthBlocks from './MonthBlocks';
import SelectionButtons from '../../other/SelectionButtons';
import blockRange from '../../../store/block-range';
import dateRange from '../../../store/date-range';

const DatePicker: FC = observer(() => {
    const [isCollapsed, setIsCollapsed] = useState<boolean>(true);

    const toggle = () => setIsCollapsed(prev => !prev);
    const memoizedToggle = useCallback(toggle, []);

    const variants: Variants = {
        collapsed: { opacity: 0, y: -80, x: 300, scale: 0 },
        expanded: { opacity: 1, y: 80, x: 0, scale: 1 }
    };

    useEffect(() => {
        setIsCollapsed(false);
    }, [dateRange.from, dateRange.to]);

    return (
        <div className="flex flex-col relative">
            <DatePreview onClick={memoizedToggle}/>

            <motion.div className="absolute right-0 z-10 shadow-lg flex p-5 rounded-lg bg-white select-none"
                        animate={isCollapsed ? "expanded" : "collapsed"}
                        variants={variants}>
                <div className="flex justify-between w-full items-center">
                    <MonthBlocks isCollapsed={isCollapsed}/>
                    <SelectionButtons 
                        setIsCollapsed={setIsCollapsed}
                        buttons={[
                        { text: "Today", onClick: () => blockRange.setToday() },
                        { text: "Yesterday", onClick: () => blockRange.setYesterday() },
                        { text: "Last 7 Days", onClick: () => blockRange.setNLastDays(7) },
                        { text: "Last 30 Days", onClick: () => blockRange.setNLastDays(30) },
                        { text: "This Month", onClick: () => blockRange.setLastMonth() },
                        { text: "This Year", onClick: () => blockRange.setLastYear() },
                        { text: "Lifetime", onClick: () => blockRange.setLifetime() }
                    ]}/>
                </div>
            </motion.div>
        </div>
    )
})

export default DatePicker
