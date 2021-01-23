import 'react-native';
import React from 'react';
import { shallow, ShallowWrapper, mount } from 'enzyme';
import renderer from 'react-test-renderer';
import { View, FlatList, TextInput } from "react-native";

import SearchMovies from './../src/screens/SearchMovies';
import { GSearchBox } from './../src/commonComponents';

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
    let mockFn = null;
    let flatList = null;

    const result = {
        "Search": [
            {
                "Title": "Batman Begins",
                "Year": "2005",
                "imdbID": "tt0372784",
                "Type": "movie",
                "Poster": "https://m.media-amazon.com/images/M/MV5BOTY4YjI2N2MtYmFlMC00ZjcyLTg3YjEtMDQyM2ZjYzQ5YWFkXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg"
            },
            {
                "Title": "Batman Ends",
                "Year": "2005",
                "imdbID": "tt0372784",
                "Type": "movie",
                "Poster": "https://m.media-amazon.com/images/M/MV5BOTY4YjI2N2MtYmFlMC00ZjcyLTg3YjEtMDQyM2ZjYzQ5YWFkXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg"
            }
        ]
    }

    beforeEach(() => {
        props = createTestProps({});
        wrapper = shallow(<SearchMovies {...props} />).children()
            .renderProp('children')({ result, loader: false, error: false });

        // // mockFn = jest.fn()
        // console.log(wrapper.debug())
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('Initial render', () => {
        // const tree = renderer.create(<SearchMovies {...props} />).toJSON();
        // expect(tree).toMatchSnapshot();


    });

    it("should render a <FlatList />", () => {
        // expect(wrapper.find(FlatList).exists()).toBeTruthy();
        // expect(wrapper.find('FlatList')).toHaveLength(1);
        // expect(wrapper.find('FlatList').props().data(result.Search)).toBe(3);


        const flatList = wrapper
            .find('FlatList');
        // const item = flatList.renderProp('renderItem')({ item: result.Search[0] });
        // console.log(item);

        const item = flatList.props().renderItem({ item: result.Search[0] });
        // item

        const fn = jest.fn();
        const item2 = <item handleFavourite={fn} />
        shallow(item2).simulate('click')
        // console.log(item.props.handleFavourite())
        expect(fn).toHaveBeenCalled();
        console.log(wrapper)


        // const fn = jest.fn();
        // expect(fn).toHaveBeenCalled();

        // expect(item.props.handleFavourite()).toHaveBeenCalled()

        // console.log(wrapper);

        // console.log(ke2.renderItem())
        // console.log(ke.props().handleFavourite())
        // console.log(ke.props.handleFavourite(result.Search[0]))
    });
    // ke.simulate('press')

    it('should flatlist return keyExtractor correctly', () => {
        const key = wrapper
            .find('FlatList')
            .props()
            .keyExtractor(result.Search[0]);

        expect(key).toEqual('tt0372784')
    });

    it("should render a <FlatList /> with ListHeaderComponent (GSearchBox) 1", () => {
        // let wrapperMounted = mount(<SearchMovies />)
        let instance = renderer.create(<SearchMovies />).root
        // .getInstance()
        // .find(GSearchBox)
        // .renderProp('child')({ result, loader: false, error: false });
        // .renderProp('children')({ result, loader: false, error: false });
        // console.log(wrapperMounted.handleChangeText('alpha'))
        // console.log(wrapperMounted.search)
        // console.log(instance)
        // console.log(instance)
        // const element = instance.findByType(TextInput);
        const element2 = instance.findByProps({ testID: 'searchbox' });

        const onSearch = jest.fn();

        // wrapper = shallow(<SearchMovies {...props} />).children()
        //     .renderProp('children')({ result, loader: false, error: false });
        // expect(wrapper.find(FlatList)).toHaveLength(1);
        // element2.find('TextInput').simulate('changeText', 'test search text');
        // console.log(wrapper.debug())
        const { act } = renderer;

        act(() => {
            element2.props.onChangeText('base')

        })
        expect(element2.props.value).toEqual('base')
        // console.log()

        // const stateSetter = jest.fn()
        // jest
        //     .spyOn(React, 'useState')
        //     //Simulate that mode state value was set to 'new mode value'
        //     .mockImplementation(stateValue => [stateValue = 'new mode value', stateSetter])
        // const element2 = GSearchBox.findByType(TextInput);

        // console.log(instance)
        // console.log(element.props.value)
        // console.log(element2.props.value)
        // console.log(wrapperMounted

        // .renderProp('children')({ result, loader: false, error: false });
        // expect(wrapperMounted.find(GSearchBox).exists()).toBeTruthy();
        // expect(wrapper.find(GSearchBox)).toHaveLength(1);
    });

    it("should update state on type", () => {
        // const changeSize = jest.fn();
        // const wrapper = mount(<App onClick={changeSize} />);
        // const handleClick = jest.spyOn(React, "useState");
        // handleClick.mockImplementation(size => [size, changeSize]);

        // wrapper.find("#para1").simulate("click");
        // expect(changeSize).toBeTruthy();
    });

    it("should navigate from Home Screen", () => {
        // expect(jest.fn()).toHaveBeenCalledWith('Home');
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