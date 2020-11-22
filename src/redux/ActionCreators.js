import * as ActionTypes from './ActionTypes';
import { baseURL } from '../shared/baseURL';

// addComment Action Creator
export const addComment = (comment) => ({
    type: ActionTypes.ADD_COMMENT,
    payload: comment
});

export const postComment = (dishId, rating, author, comment) => (dispatch) => {
    const newComment =  {
            dishId: dishId,
            rating: rating,
            author: author,
            comment: comment
    }
    newComment.date = new Date().toISOString();

    // POST the comment to the server
    return fetch(baseURL + 'comments', {
        method: 'POST', // default GET
        body: JSON.stringify(newComment),
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'same-origin'
    })
    .then(response => {
        if(response.ok) {
            return response;
        }
        else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response; //optional
            throw error;
        }
     }, error => { // Even the server doesn't respond
            var  errmess = new Error(error.message);
            throw errmess;
     })
        .then(response => response.json())
        .then(response => dispatch(addComment(response)))
        .catch(error => console.log("Error has occured ", error.message))
}

// Thunk
export const fetchDishes = () => (dispatch) => {
    dispatch(dishesLoading(true));
    // communicating the server
    return fetch(baseURL + 'dishes')
        .then(response => {
           if(response.ok) {
               //response will be available in the next .then
               return response;
           }
           else {
               var error = new Error('Error ' + response.status + ': ' + response.statusText);
               error.response = response; //optional
               throw error;
           }
        }, error => { // Even the server doesn't respond
               var  errmess = new Error(error.message);
               throw errmess;
        })
        .then(response => response.json())
        .then(dishes => dispatch(addDishes(dishes)))
        .catch(error => dispatch(dishesFailed(error.message)))
}

export const fetchComments = () => (dispatch) => {
    // communicating the server
    return fetch(baseURL + 'comments')
        .then(response => {
            if(response.ok) {
                //response will be available in the next .then
                return response;
            }
            else {
                var error = new Error('Error ' + response.status + ': ' + response.statusText);
                error.response = response; //optional
                throw error;
            }
        }, error => { // Even the server doesn't respond
                var  errmess = new Error(error.message);
                throw errmess;
        })
        .then(response => response.json())
        .then(comments => dispatch(addComments(comments)))
        .catch(error => dispatch(commentsFailed(error.message)));
}

// return action object
export const dishesLoading = () => ({
    type: ActionTypes.DISHES_LOADING
});

export const dishesFailed = (errmess) => ({
    type: ActionTypes.DISHES_FAILED,
    payload: errmess

});

export const addDishes = (dishes) => ({
    type: ActionTypes.ADD_DISHES,
    payload: dishes
});

export const commentsFailed = (errmess) => ({
    type: ActionTypes.COMMENTS_FAILED,
    payload: errmess

});

export const addComments = (comments) => ({
    type: ActionTypes.ADD_COMMENTS,
    payload: comments
});

export const fetchPromos = () => (dispatch) => {
    dispatch(promosLoading(true))
    // communicating the server
    return fetch(baseURL + 'promotions')
    .then(response => {
        if(response.ok) {
            //response will be available in the next .then
            return response;
        }
        else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response; //optional
            throw error;
        }
     }, error => { // Even the server doesn't respond
            var  errmess = new Error(error.message);
            throw errmess;
     })
        .then(response => response.json())
        .then(promos => dispatch(addPromos(promos)))
        .catch(error => dispatch(promosFailed(error.message)))

}

// return action object
export const promosLoading = () => ({
    type: ActionTypes.PROMOS_LOADING
});

export const promosFailed = (errmess) => ({
    type: ActionTypes.PROMOS_FAILED,
    payload: errmess

});

export const addPromos = (promos) => ({
    type: ActionTypes.ADD_PROMOS,
    payload: promos
});

export const fetchLeaders = () => (dispatch) => {
    dispatch(leadersLoading(true))
    // communicating the server
    return fetch(baseURL + 'leaders')
    .then(response => {
        if(response.ok) {
            //response will be available in the next .then
            return response;
        }
        else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response; //optional
            throw error;
        }
     }, error => { // Even the server doesn't respond
            var  errmess = new Error(error.message);
            throw errmess;
     })
        .then(response => response.json())
        .then(leaders => dispatch(addLeaders(leaders)))
        .catch(error => dispatch(leadersFailed(error.message)))
}

export const leadersLoading = () => ({
    type: ActionTypes.LEADERS_LOADING
});

export const leadersFailed = (errmess) => ({
    type: ActionTypes.LEADERS_FAILED,
    payload: errmess

});

export const addLeaders = (leaders) => ({
    type: ActionTypes.ADD_LEADERS,
    payload: leaders
});

export const postFeedback = (feedbackId, firstName, lastName, telnum, email, agree, message) => (dispatch) => {
    const newFeedback =  {
            feedbackId: feedbackId,
            firstName: firstName,
            lastName: lastName,
            telnum: telnum,
            email: email,
            agree: agree,
            message: message
    }
    newFeedback.date = new Date().toISOString();

    // POST the feedback to the server
    return fetch(baseURL + 'feedback', {
        method: 'POST', // default GET
        body: JSON.stringify(newFeedback),
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'same-origin'
    })
    .then(response => {
        if(response.ok) {
            return response;
        }
        else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response; //optional
            throw error;
        }
     }, error => { // Even the server doesn't respond
            var  errmess = new Error(error.message);
            throw errmess;
     })
        .then(response => response.json())
        .then(response => dispatch(addFeedback(response)))
        .catch(error => console.log("Error has occured ", error.message))
}

export const addFeedback = (feedback) => ({
    type: ActionTypes.ADD_FEEDBACK,
    payload: feedback
});