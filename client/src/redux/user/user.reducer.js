import userTypes from "./user.types";

const Intial_State ={
    currentUser:null
}

const userReducer = (state=Intial_State, action) =>{
    switch (action.type) {
        case userTypes.SET_CURRENT_USER:
            return{
                ...state,
                currentUser:action.payload
            }
    
        default:
            return state;
    }
}

export default userReducer;