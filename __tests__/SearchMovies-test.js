import 'react-native';
import React from 'react';
import { shallow, mount } from 'enzyme';
import renderer from 'react-test-renderer';

import SearchMovies from './../src/screens/SearchMovies';

describe('<SearchMovies />', () => {
    let _searchMovies = null;
    let mockFn = null
    beforeEach(() => {
        _searchMovies = mount(<SearchMovies />);
        mockFn = jest.fn()
        console.log(_searchMovies.debug())
    });

    it('Initial render', () => {
        const tree = renderer.create(<SearchMovies />).toJSON();
        expect(tree).toMatchSnapshot();
    });

    describe('editing the filter input', () => {
        beforeEach(() => {
            _searchMovies.setMovies = mockFn
            _searchMovies.find('SearchBox').onChangeText('test');
        })
        it('should update the filter state', () => {
            expect(mockFn).toHaveBeenCalledTimes(1)
        })
        it('should update the  state', () => {
            expect(_searchMovies.search).toEqual('test');

        })
    })

    // it('Can input Movie Name', () => {
    //     console.log('st', _searchMovies);
    //     _searchMovies.handleChangeText('testname');
    //     // const textBox = _searchMovies.find('[label="Username"]');
    //     // textBox.simulate('changeText', () => { });
    //     expect(_searchMovies.instance().search).toEqual('testname');
    // });

});