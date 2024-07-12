import React from 'react';

import { render, screen, fireEvent } from '@testing-library/react';
import { useForm } from 'react-hook-form';

import InputField from './InputField';

describe('InputField Component', () => {
  const Wrapper = (): JSX.Element => {
    const { register } = useForm();
    return (
      <InputField
        id="test-input"
        label="Test Input"
        placeholder="Enter text"
        register={register}
      />
    );
  };

  test('renders without crashing', () => {
    render(<Wrapper />);
    expect(screen.getByLabelText('Test Input')).toBeInTheDocument();
  });

  test('displays error message', () => {
    render(
      <InputField
        id="test-input"
        label="Test Input"
        placeholder="Enter text"
        register={jest.fn()}
        error="Error message"
      />
    );
    expect(screen.getByText('Error message')).toBeInTheDocument();
  });

  test('renders with readOnly prop', () => {
    render(
      <InputField
        id="test-input"
        label="Test Input"
        placeholder="Enter text"
        register={jest.fn()}
        readOnly
      />
    );
    expect(screen.getByLabelText('Test Input')).toHaveAttribute('readOnly');
  });

  test('accepts input', () => {
    render(<Wrapper />);
    const input = screen.getByLabelText('Test Input');
    fireEvent.change(input, { target: { value: 'New value' } });
    expect(input).toHaveValue('New value');
  });
});
