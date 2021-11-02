import React from "react";
import fil from './Filter.module.css';

const FilterPart = ({ num, text, getFilter, returnBoolean }) => {

    return (

        <div className={fil.checkbox_filter}>
            <label className={fil.checkbox}>
                <input type={"checkbox"}  checked={returnBoolean(num)}
                 className={fil.checkbox_none}
                    onClick={() => getFilter(num)} />
                <div className={fil.checkbox__text}  >
                    <p > {text} </p>
                </div>
            </label>
        </div>

    )
};

export default FilterPart;