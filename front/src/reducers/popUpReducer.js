export default function (state={}, action) {
    switch (action.type) {
        case "CREATE_SESSION":
            return {...state, msg: action.message};
        default:
            return state;
    }
}