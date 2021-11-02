import React, { useState } from "react";
import InfoTickets from "./infoTickets";
import css from './Tickets.module.css';
import logo from '../../img/Logo.png';

const Tickets = ({ tickets, getСheapPriceDispatch, getQuickTicketDispatch, isButton = true }) => {

    const [numberTicket, setNumberTicket] = useState(5);
    const [isButtonState, setIsButtonState] = useState(true);
    const [isActiveFirstButton, setisActiveFirstButton] = useState(false);
    const [isActiveSecondButton, setisActiveSecondButton] = useState(false);

    let newTicketArr = [];

    if (tickets.length <= 5) {
        for (let i = 0; i < tickets.length; i++) {
            newTicketArr.push(tickets[i]);
            isButton = false;
        }
    } else {
        for (let i = 0; i < numberTicket; i++) {
            newTicketArr.push(tickets[i])
        }
    };

    const getNumberForSpace = (number) => {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    };

    const get5Tickets = () => {
        if (tickets.length - 5 < numberTicket) {
            setNumberTicket(numberTicket + tickets.length % 5);
            setIsButtonState(false);
        } else if (tickets.length - 5 == numberTicket) {
            setNumberTicket(numberTicket + 5);
            setIsButtonState(false);
        }
        else {
            setNumberTicket(numberTicket + 5);
        }
    };

    const getActiveCss = (num) => {
        if (num == 1) {
            setisActiveFirstButton(true);
            setisActiveSecondButton(false)
        } else {
            setisActiveFirstButton(false);
            setisActiveSecondButton(true)
        }
    };

    return <div className={css.wrapper}>
        <img src={logo} alt="" className={css.logo} />
        <div className={css.sorting}>
            <button onClick={() => { getСheapPriceDispatch(tickets); getActiveCss(1) }}
                className={isActiveFirstButton ? css.sorting_buttun + ' ' + css.active : css.sorting_buttun} >  <p>самый дешевый</p></button>

            <button onClick={() => { getQuickTicketDispatch(tickets); getActiveCss(2) }}
                className={isActiveSecondButton ? css.sorting_buttun + ' ' + css.active : css.sorting_buttun}><p>самый быстрый</p></button>
        </div >
        <div> {Object.values(newTicketArr).map((index) =>
            <div className={css.tickets_container}>
                <div className={css.container_price}>
                    <div className={css.price}>{getNumberForSpace(index.price) + ' Р'}</div>
                    <div style={{ backgroundImage: `url(//pics.avs.io/99/36/${index.carrier}.png` }}
                        className={css.photo} >
                    </div>
                </div>
                <InfoTickets index={index.segments[0]} />
                <InfoTickets index={index.segments[1]} />
            </div>
        )}
            <div className={css.area_button_add}  > {(isButton && isButtonState) &&
                <button onClick={() => get5Tickets()} className={css.button_add}><p className={css.button_text}>
                    показать еще 5 билетов!</p>
                </button>}
            </div>
        </div>

    </div>
}
export default Tickets;

