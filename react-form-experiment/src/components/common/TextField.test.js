import React from 'react';
import {shallow} from 'enzyme';
import TextField from "./TextField";

describe('components.common.TextField', () => {

    let onChange, wrapper;

    describe('with autoComplete', () => {
        beforeEach(() => {
            onChange = jest.fn;
            wrapper = shallow(
                <TextField onChange={onChange}
                           content={'foo'}
                           name={'Foobar'}
                           title={'Foobar'}
                           autoComplete={'email'}
                           placeholder={'Foobar placeholder'}/>
            );
        });

        it('should render autoComplete for email', () => {
            expect(wrapper.find('input').props().autoComplete).toBe('email');
        });
    });


    describe('with autoComplete', () => {
        beforeEach(() => {
            onChange = jest.fn;
            wrapper = shallow(
                <TextField onChange={onChange}
                           content={'foo'}
                           name={'Foobar'}
                           title={'Foobar'}
                           placeholder={'Foobar placeholder'}/>
            );
        });

        it('should not render autoComplete', () => {
            expect(wrapper.find('input').props().autoComplete).toBe(undefined);
        });
    });

});
