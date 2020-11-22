// Configuration stores
import { createStore, combineReducers, applyMiddleware} from 'redux';
// The reducer is splited into 4 parts
import { Dishes } from './dishes';
import { Comments } from './comments';
import { Promotions } from './promotions';
import { Leaders } from './leaders';
// Thunk
import thunk from 'redux-thunk';
import logger from 'redux-logger';
// RRF
import { createForms } from 'react-redux-form';
import { InitialFeedback } from './forms';

export const StoreConfig = () => {
    // Creating a reduce store
    const store = createStore(
        //Combine reducers
        combineReducers({
            dishes: Dishes,
            comments: Comments,
            promotions: Promotions,
            leaders: Leaders,
            ...createForms({
                feedback: InitialFeedback
            })
        }),
        applyMiddleware(thunk, logger)
    );
    return store;
}