import React from 'react';

import { render, screen, fireEvent } from '@testing-library/react';

import HeadquartersDowndown from './HeadquartersDropdown'; // Adjust the import path as necessary

describe('HeadquartersDowndown Component', () => {
  const mockData = [
    { title: 'Option 1', id: 1 },
    { title: 'Option 2', id: 2 },
    { title: 'Option 3', id: 3 },
  ];

  const mockSetSelected = jest.fn();

  beforeEach(() => {
    mockSetSelected.mockClear();
  });

  test('renders without crashing', () => {
    render(
      <HeadquartersDowndown
        data={mockData}
        selected={undefined}
        setSelected={mockSetSelected}
      />
    );
    expect(screen.getByRole('combobox')).toBeInTheDocument();
  });

  test('renders options correctly', () => {
    render(
      <HeadquartersDowndown
        data={mockData}
        selected={undefined}
        setSelected={mockSetSelected}
      />
    );
    mockData.forEach((item) => {
      expect(screen.getByText(item.title)).toBeInTheDocument();
    });
  });

  test('calls setSelected with correct value on change', () => {
    render(
      <HeadquartersDowndown
        data={mockData}
        selected={undefined}
        setSelected={mockSetSelected}
      />
    );
    fireEvent.change(screen.getByRole('combobox'), { target: { value: '2' } });
    expect(mockSetSelected).toHaveBeenCalledWith(2);
  });

  test('sets the correct selected value', () => {
    render(
      <HeadquartersDowndown
        data={mockData}
        selected={2}
        setSelected={mockSetSelected}
      />
    );
    expect(screen.getByRole('combobox')).toHaveValue('2');
  });

  test('displays the placeholder option when no selection is made', () => {
    render(
      <HeadquartersDowndown
        data={mockData}
        selected={undefined}
        setSelected={mockSetSelected}
      />
    );
    expect(
      screen.getByRole('option', { name: 'Select an option' })
    ).toBeInTheDocument();
    expect(screen.getByRole('combobox')).toHaveValue('');
  });

  test('uses the correct id prefix for the select element', () => {
    render(
      <HeadquartersDowndown
        data={mockData}
        selected={undefined}
        setSelected={mockSetSelected}
        idPrefix="custom-prefix"
      />
    );
    expect(screen.getByRole('combobox').id).toBe('custom-prefix-select');
  });
});
