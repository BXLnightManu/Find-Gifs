export default function (state={}, action) {
    switch (action.type) {
        case "MSG":
            return {...state, msg: action.message};
        default:
            return state;
    }
}