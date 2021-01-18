import 'react-native';
import React from 'react';
import { shallow, ShallowWrapper, mount } from 'enzyme';
import renderer from 'react-test-renderer';
import { View, FlatList } from "react-native";

import SearchMovies from './../src/screens/SearchMovies';

// "collectCoverage": true,

const createTestProps = (props) => ({
    navigation: {
        navigate: jest.fn()
    },
    ...props
});


describe('<SearchMovies />', () => {
    let wrapper = null;
    let props = null;
    let mockFn = null
    beforeEach(() => {
        props = createTestProps({});
        wrapper = shallow(<SearchMovies {...props} />).children();
        mockFn = jest.fn()
        console.log(wrapper.debug())
    });

    it('Initial render', () => {
        const tree = renderer.create(<SearchMovies {...props} />).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it("should render a <FlatList />", () => {
        expect(wrapper.find(FlatList).children()).toHaveLength(1);
        expect(props.navigation.navigate).toHaveBeenCalledWith('Home');
    });

    // describe('editing the filter input', () => {
    //     beforeEach(() => {
    //         wrapper.setMovies = mockFn
    //         wrapper.find('SearchBox').onChangeText('test');
    //     })
    //     it('should update the filter state', () => {
    //         expect(mockFn).toHaveBeenCalledTimes(1)
    //     })
    //     it('should update the  state', () => {
    //         expect(wrapper.search).toEqual('test');

    //     })
    // })

    // it('Can input Movie Name', () => {
    //     console.log('st', wrapper);
    //     wrapper.handleChangeText('testname');
    //     // const textBox = wrapper.find('[label="Username"]');
    //     // textBox.simulate('changeText', () => { });
    //     expect(wrapper.instance().search).toEqual('testname');
    // });

});