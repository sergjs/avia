import React from "react";
import { connect } from 'react-redux';
import Tickets from "./Tickets";
import fil from './Filter/Filter.module.css';
import FilterPart from "./Filter/FilterPart";
import { getСheapPriceDispatch, getQuickTicketDispatch } from "../../redux/app-reducer";
import logo from '../../img/Logo.png';

class TicketsContainer extends React.Component {
    state = {
        ticketsLocal: this.props.tickets,
        num: [],
    };

    getNumFilter = (num) => {
        if (this.state.num.some(elem => elem == 'all' && num != 'all')) {
            this.state.num = [];
            this.state.num.push(num);
            return this.state.num
        } else if (!this.state.num.some(elem => elem == num && elem != 'all') && num != 'all') {
            this.state.num.push(num)
            return this.state.num

        } else if (this.state.num.some(elem => elem == 'all' && num == 'all')) {
            this.state.num = [];
            return this.state.num;
        } else if (num == 'all') {
            this.state.num = [];
            this.state.num.push('all');
            return this.state.num;
        } else {
            let index = this.state.num.indexOf(num);
            this.state.num.splice(index, 1)
            return this.state.num;
        }
    }


    getFilter = (num) => {
        let newArr = [];
        let arr = this.props.tickets;
        let correctNumber = this.getNumFilter(num);
        correctNumber.length == 0 || correctNumber == 'all' ? newArr = arr :
            newArr = (correctNumber.map(item =>
                arr.filter(p => (p.segments[0].stops.length == item && p.segments[1].stops.length == item)))
            ); 
        this.setState({ ticketsLocal: newArr.flat() });
    }

    returnBoolean = (num) => {
        for (let key of this.state.num) {
            if (num == key) {
                return true;
            }
        }
    }

    render() {
        return <div className={fil.page_tickets}>
            <div className={fil.wraper_filter}>
                <div className={fil.header_text} >
                    <div className="checkbox__text">  <p >Количетсво пересадок</p> </div>
                </div>
                <FilterPart num={'all'} text={'Все'} getFilter={this.getFilter} returnBoolean={this.returnBoolean} />
                <FilterPart num={0} text={'Без пересадок'} getFilter={this.getFilter} returnBoolean={this.returnBoolean} />
                <FilterPart num={1} text={'1 пересадка'} getFilter={this.getFilter} returnBoolean={this.returnBoolean} />
                <FilterPart num={2} text={'2 пересадки'} getFilter={this.getFilter} returnBoolean={this.returnBoolean} />
                <FilterPart num={3} text={'3 пересадки'} getFilter={this.getFilter} returnBoolean={this.returnBoolean} />
            </div>
            {!this.state.ticketsLocal.length == 0 ?
                <Tickets
                    tickets={this.state.ticketsLocal}
                    getСheapPriceDispatch={this.props.getСheapPriceDispatch}
                    getQuickTicketDispatch={this.props.getQuickTicketDispatch}
                /> : <div className={fil.error}>
                    <img src={logo} alt="" className={fil.logo_error} />
                    <p>Нет подходящих билетов по выбранным критериям</p>
                </div>
            }
        </div>

    }
}
let mapStateToPropse = (state) => {
    return {
        ID: state.app.ID,
        tickets: state.app.tickets,
        initialize: state.app.initialize,
    }
}
export default
    connect(mapStateToPropse, { getСheapPriceDispatch, getQuickTicketDispatch })(TicketsContainer);
