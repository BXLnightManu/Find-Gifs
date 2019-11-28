export default function (state={}, action) {
    switch (action.type) {
        case "SAVE":
            return {...state, msg: action.message};
        default:
            return state;
    }
}