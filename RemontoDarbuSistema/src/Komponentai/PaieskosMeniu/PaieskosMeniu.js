import React, {useState} from 'react';
import './PaieskosMeniu.css';
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { DateRangePicker } from "react-date-range";
import { Button } from "@material-ui/core";
import PeopleIcon from "@material-ui/icons/People";

// outdated failas, gal dar veliau panaudosiu
function PaieskosMeniu() {
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());

    const selectionRange = {
        startDate: startDate,
        endDate: endDate,
        key: "selection",
      };

            function handleSelect(ranges) {
        setStartDate(ranges.selection.startDate);
        setEndDate(ranges.selection.endDate);
    }

    return (
          <div className='paieska'>
             <DateRangePicker ranges={[selectionRange]} onChange={handleSelect} />
             <h2>
                Skaicius <PeopleIcon />
             </h2>
             <input min={0} defaultValue={2} type="number" />
             <Button onClick={() => history.push('/Paieska')}>Paieska</Button>
            </div>
    )
}

export default PaieskosMeniu
