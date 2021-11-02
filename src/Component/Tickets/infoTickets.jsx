import React from "react";
import css from './Tickets.module.css';

const InfoTickets = ({index}) => {

    const getTime = (time, duration) => {
        let sp = time.match(/\d+/g);
        let datemin = new Date(+sp[0], +sp[1], +sp[2], +(sp[3] +  Math.trunc(duration / 60)), +(sp[4] +  duration % 60), +sp[5]);
        let hours = datemin.getHours() < 10 ? '0'+datemin.getHours()  : datemin.getHours();
        let min = datemin.getMinutes() < 10 ? '0'+datemin.getMinutes() : datemin.getMinutes();
        return sp[3] + ':' + sp[4] + ' - ' +hours+':'+min;
    };

    const getTimeWay = (duration) => {
        return Math.trunc(duration / 60) + 'ч ' + duration % 60 + 'м';
    };

    const getStops = (stops) => {
        if (stops.length == 1) {
           return stops.length + ' пересадка'
        } else if(stops.length == 0) {
            return "без пересадок"
        } else { 
            return stops.length  + ' пересадки'}
    };
    
    return <div className={css.blog_departure}>
        <div className={css.blog_departure_flex}>
            <div className={css.blog_departure_top}>{index['origin'] + ' - ' + index['destination']}</div>
            <div className={css.blog_departure_bottom}>{getTime(index.date, index.duration)}</div>
        </div>
        <div className={css.blog_departure_flex}>
            <div className={css.blog_departure_top}> В пути</div>
            <div className={css.blog_departure_bottom}>{getTimeWay(index.duration)}</div>
        </div>
        <div className={css.blog_departure_flex}>
            <div className={css.blog_departure_top}>{getStops(index.stops)}</div>
            <div className={css.blog_departure_bottom}>{String(index.stops).replace(/,/g, ', ')}</div>
        </div>
    </div>
}

export default InfoTickets;