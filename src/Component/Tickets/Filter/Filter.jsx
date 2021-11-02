import React from "react";
import fil from './Filter.module.css';
import FilterPart from "./FilterPart";

const Filter = ({tickets, getNumFilter }) => {debugger
    

    return (
        <div className={fil.wraper_filter}>
            <div className={fil.header_text}>
                <div class="checkbox__text">  <p >Количетсво пересадок</p> </div>
            </div>
            <FilterPart num={'all'} text={'Все'} getNumFilter={getNumFilter} tickets={tickets}/>
            <FilterPart num={0} text={'Без пересадок'} getNumFilter={getNumFilter} tickets={tickets}/>
            <FilterPart num={1} text={'1 пересадка'} getNumFilter={getNumFilter} tickets={tickets}/>
            <FilterPart num={2} text={'2 пересадки'} getNumFilter={getNumFilter} tickets={tickets}/>
            <FilterPart num={3} text={'3 пересадки'} getNumFilter={getNumFilter} tickets={tickets}/>
        </div>

    )
};


export default (Filter);
