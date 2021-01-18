import { useCallback, useEffect, useReducer, useRef } from 'react';
import debounce from 'lodash.debounce';
import isEqual from 'lodash.isequal';
import Request from './../serviceRequest/apiRequest';
import { GET_MOVIES } from './../serviceRequest/serviceConstants';

/*
* This function is used to update the reducer with
* the new state it received and it returns the 
* current state and dispatch
*/

function useSetState(initialState) {
    const [state, setState] = useReducer(
        (_state, newState) => ({ ..._state, ...newState }),
        initialState
    );
    return [state, setState]
}

/*
* This function is used to make sure that state updates happend 
* only in the mount state of component and
* returns the state and safeSetState function
*/

function useSafeSetState(initialState) {
    const [state, setState] = useSetState(initialState)
    const mountedRef = useRef()
    useEffect(() => {
        mountedRef.current = true
        return () => (mountedRef.current = false)
    }, [])
    const safeSetState = (...args) => mountedRef.current && setState(...args)

    return [state, safeSetState];
}

/*
* This function is used to hold the 
* previous state of the component into the reference variable
* and returns the reference variable
*/

function usePrevious(value) {
    const ref = useRef()
    useEffect(() => {
        ref.current = value
    })

    return ref.current;
}

/*
* This function is used to query the server with the given params
* also it returns the object contains the response from the request
* with loader and error ,in case if any
*/

function Query({ query, variables, children }) {
    const initialState = {
        result: [],
        loader: false,
        error: false
    }
    const [state, safeSetState] = useSafeSetState(initialState);

    useEffect(() => {
        const inputs = [query, variables];
        const { param, key } = variables;
        if (isEqual(previousInputs, inputs) || param === '') {
            return
        }

        safeSetState({ loader: true, error: false });
        (key === GET_MOVIES) ? debouncedSave(inputs) : getData(inputs)
    });

    const debouncedSave = useCallback(debounce(x => getData(x), 1000), [])

    /*
    * This function is used for making a request to the server
    * and returns the response it received
    */

    const getData = async ([_query, { param, key }]) => {
        let parameters = {
            ..._query,
        }
        parameters = (key === GET_MOVIES) ?
            { ...parameters, s: param } :
            { ...parameters, i: param }

        let result;
        let data;
        let error;

        try {
            result = await Request(key, parameters);
            data = result.data;
            error = false;
        } catch (err) {
            console.log('QUERY response from Request 1', err);
            if (key === GET_MOVIES) {
                data = { Search: [] }
            } else {
                data = {}
            }
            error = { name: err.name, message: err.message };
        }

        safeSetState({ loader: false, result: data, error })
    }

    const previousInputs = usePrevious([query, variables]);

    return children(state)
}

export default Query;