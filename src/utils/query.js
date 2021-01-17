import { useCallback, useEffect, useReducer, useRef } from 'react';
import debounce from 'lodash.debounce';
import isEqual from 'lodash.isequal';
import Request from './../serviceRequest/apiRequest';
import { GET_MOVIES } from './../serviceRequest/serviceConstants';


function Query({ variables, children }) {
    const initialState = {
        _search: '',
        movies: [],
        loader: false
    }

    const [state, setState] = useReducer(
        (_state, newState) => ({ ..._state, ...newState }),
        initialState
    );
    useEffect(() => {
        const { search } = variables;
        if (isEqual(previousInputs.current, variables)
            || previousInputs.current === undefined
            || (search && search.length === 0)
        ) {
            return
        }

        safeSetState({ loader: true })
        debouncedSave(search)
    });

    const searchMovies = async (movie) => {
        const params = {
            s: movie,
            y: 'yes',
            type: 'movie'
        }
        const result = await Request(GET_MOVIES, params);
        const { data } = result;
        const { Search } = data;
        safeSetState({ loader: false, movies: Search })
    }

    const debouncedSave = useCallback(
        debounce(searchValue => searchMovies(searchValue), 1000),
        []);

    const previousInputs = useRef()
    useEffect(() => {
        previousInputs.current = variables
    })

    const mountedRef = useRef()
    useEffect(() => {
        mountedRef.current = true
        return () => (mountedRef.current = false)
    })
    const safeSetState = (...args) => mountedRef.current && setState(...args)

    return children(state)
}

export default Query;