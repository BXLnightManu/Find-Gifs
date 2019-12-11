export default function (state={}, action) {
    switch (action.type) {
        case "GIF":
            return {...state, msg: action.message};
        default:
            return state;
    }
}