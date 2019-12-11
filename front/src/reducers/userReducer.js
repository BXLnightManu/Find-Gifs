// Redux: Reducer from the user infos sharing
export default function (state={}, action) {
    switch (action.type) {
        case "USER":
            return {...state, user: action.user};
        default:
            return state;
    }
}