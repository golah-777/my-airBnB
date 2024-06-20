import { configureStore } from '@reduxjs/toolkit'
import counterReducer from '../Features/Counter/counterSlice'
import listingReducer from '../Features/Listing/listingSlice'
import openCloseModalReducer from '../Features/OpenCloseModal/openCloseSlice'
import formReducer from '../Features/Form/formSlice'
import authSignUpReducer from '../Features/Auth/authSignUpSlice'
import onAuthStateReducer from '../Features/Auth/onAuthStateSlice'

export default configureStore({
  reducer: {
    counter:counterReducer,
    listing:listingReducer,
    modal:openCloseModalReducer,
    formInfo: formReducer,
    signUp: authSignUpReducer,
    onAuth: onAuthStateReducer
  }
})