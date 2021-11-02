import { getId, getTicketsApi } from "../Component/API/api";

let initialState = {
    ID: null,
    tickets: [],
    initialize: false,
};

const AppReduser = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_INITISLIZED_ID':
            return {
                ...state, ID: action.ID,

            }
        case 'SET_TICKETS':
            return {
                ...state, tickets: [...action.tickets],
            }
        case 'SET_INITIALIZE':
            return {
                ...state, initialize: action.boole,
            }
        default:
            return state;
    }
}

export const setIDAC = (ID) => ({ type: 'SET_INITISLIZED_ID', ID });
export const setTicketsAC = (tickets) => ({ type: 'SET_TICKETS', tickets });
export const initializeSuccess = (boole) => ({ type: 'SET_INITIALIZE', boole });


export const apiTicketCheck = async () => {
    try {
        let responseTicket = await getTicketsApi(initialState.ID);
        if (responseTicket.data.stop === false) {
            return apiTicketCheck();
        } else {
            return responseTicket;
        }
    }
    catch (error) {
        return apiTicketCheck()
    }
};

export const startDispatch = () => async (dispatch) => {
    let response = await getId();
    dispatch(setIDAC(response.data.searchId));
    initialState.ID = response.data.searchId;
    apiTicketCheck().then(result => (
        dispatch(setTicketsAC(result.data.tickets)),
        dispatch(initializeSuccess(true)))
    );
};

export const getСheapPriceDispatch = (arr) => {
    let arr2 = arr.sort((a, b) => (a.price - b.price));
    return (dispatch) => {
        dispatch(setTicketsAC(arr2));
    }
}
export const getQuickTicketDispatch = (arr) => {
    let arr2 = arr.sort((a, b) => (a.segments[0].duration + a.segments[1].duration) - 
    (b.segments[0].duration + b.segments[1].duration));
    return (dispatch) => {
        dispatch(setTicketsAC(arr2));
    }
}


export default AppReduser;
