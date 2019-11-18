// Redux: Reducer from the registration container (SignUp)
export default function (state={}, action) {
    switch (action.type) {
        case "REGISTER_USER":
            return {...state, msg: action.message};
        default:
            return state;
    }
}