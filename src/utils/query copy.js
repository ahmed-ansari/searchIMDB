import { useCallback, useEffect, useReducer, useRef } from 'react';
import debounce from 'lodash.debounce';
import isEqual from 'lodash.isequal';
import Request from './../serviceRequest/apiRequest';
import { GET_MOVIES } from './../serviceRequest/serviceConstants';

function useSetState(initialState) {
    const [state, setState] = useReducer(
        (_state, newState) => ({ ..._state, ...newState }),
        initialState
    );
    return [state, setState]
}

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

function usePrevious(value) {
    const ref = useRef()
    useEffect(() => {
        ref.current = value
    })

    return ref.current;
}


function Query({ query, variables, children }) {
    const initialState = {
        results: [],
        loader: false
    }
    const [state, safeSetState] = useSafeSetState(initialState)
    useEffect(() => {
        const inputs = [query, variables];
        const { param, key } = variables;
        if (isEqual(previousInputs, inputs) || param === '') {
            return
        }

        safeSetState({ loader: true });
        (key === GET_MOVIES) ? debouncedSave(inputs, state.results) : getData(inputs)
    });

    const debouncedSave = useCallback(debounce((x, y) => getData(x, y), 1000), [])

    const getData = async ([_query, { param, key }], res) => {
        let parameters = {
            ..._query,
        }
        parameters = (key === GET_MOVIES) ?
            { ...parameters, s: param } :
            { ...parameters, i: param }

        const result = await Request(key, parameters);
        const { data } = result;
        let { Search } = data;

        if (key === GET_MOVIES && _query.page > 1) {
            console.log('state b' + query.page, state)

            Search = [...res, ...Search]
        }
        console.log('Search ' + _query.page, Search)
        safeSetState({ loader: false, results: Search })
    }

    const previousInputs = usePrevious([query, variables]);

    return children(state)
}

export default Query;