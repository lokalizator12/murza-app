import React, {useEffect} from 'react';
import {fireEvent, render, screen} from '@testing-library/react';
import WizardForm from './WizardForm';

const FirstStep = ({handleChange, setIsNextEnabled}) => {
    useEffect(() => {
        handleChange('title', 'Test request');
        setIsNextEnabled(true);
    }, [handleChange, setIsNextEnabled]);
    return <div>First step</div>;
};

const LastStep = ({setIsNextEnabled}) => {
    useEffect(() => setIsNextEnabled(true), [setIsNextEnabled]);
    return <div>Last step</div>;
};

test('keeps request data when advancing and submits it once', () => {
    const onSubmit = jest.fn();
    render(<WizardForm steps={[FirstStep, LastStep]} initialData={{requestType: 'Parcel'}} onSubmit={onSubmit}/>);

    fireEvent.click(screen.getByRole('button', {name: 'Next'}));
    fireEvent.click(screen.getByRole('button', {name: 'Submit'}));

    expect(onSubmit).toHaveBeenCalledTimes(1);
    expect(onSubmit).toHaveBeenCalledWith({requestType: 'Parcel', title: 'Test request'});
});
