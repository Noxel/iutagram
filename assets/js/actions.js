import "@babel/polyfill";
const adresse = 'http://localhost:8000/api';
export const ERROR = 'ERROR';
export const PROFILE = 'PROFILE';

export const loadUser = ( id ) => async dispatch => {
    try {
        let rep = await fetch(adresse + '/users/' + id, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
            }
        });
        let json = await rep.json();
        console.log(json);
        dispatch({type: PROFILE, profile: json})
    }catch (e) {
        dispatch({type: ERROR, error: e.toString()});
    }
};