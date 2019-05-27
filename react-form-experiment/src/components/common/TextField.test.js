import React from 'react';
import {shallow} from 'enzyme';
import TextField from "./TextField";

describe('components.common.TextField', () => {

    const onChange = (e) => {
    };
    let wrapper;

    describe('with autoComplete', function () {
        beforeEach(function () {
            wrapper = shallow(
                <TextField onChange={onChange}
                           content={'foo'}
                           name={'Foobar'}
                           title={'Foobar'}
                           autoComplete={'email'}
                           placeholder={'Foobar placeholder'}/>
            );
        });

        it('should render', function () {
            expect(wrapper).not.toBeUndefined();
        });
    });

});
