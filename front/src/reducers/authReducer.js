// Redux: Reducer from the authentication containers (SignUp/SignIn)
export default function (state={}, action) {
    switch (action.type) {
        case "AUTH":
            return {...state, token: action.token};
        default:
            return state;
    }
}