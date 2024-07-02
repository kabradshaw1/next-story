import React from 'react';

import { render, screen, fireEvent } from '@testing-library/react';

import CheckBoxList from './CheckBoxList';

describe('CheckBoxList Component', () => {
  const setSelectedMock = jest.fn();
  const data = [
    { title: 'Item 1', id: 1 },
    { title: 'Item 2', id: 2 },
    { title: 'Item 3', id: 3 },
  ];
  const selected = [1, 3];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders checkboxes correctly', () => {
    render(
      <CheckBoxList
        data={data}
        selected={selected}
        setSelected={setSelectedMock}
        idPrefix="test"
      />
    );

    const checkboxes = screen.getAllByRole('checkbox');
    expect(checkboxes).toHaveLength(data.length);
    expect(checkboxes[0]).toBeChecked();
    expect(checkboxes[1]).not.toBeChecked();
    expect(checkboxes[2]).toBeChecked();

    expect(checkboxes[0].id).toBe('test-1');
    expect(checkboxes[1].id).toBe('test-2');
    expect(checkboxes[2].id).toBe('test-3');
  });

  test('handles checkbox change correctly', () => {
    render(
      <CheckBoxList
        data={data}
        selected={selected}
        setSelected={setSelectedMock}
      />
    );

    const checkboxes = screen.getAllByRole('checkbox');

    // Uncheck the first checkbox
    fireEvent.click(checkboxes[0]);
    expect(setSelectedMock).toHaveBeenCalledWith(expect.any(Function));
    let updateFunction = setSelectedMock.mock.calls[0][0];
    expect(updateFunction(selected)).toEqual([3]);

    // Check the second checkbox
    fireEvent.click(checkboxes[1]);
    expect(setSelectedMock).toHaveBeenCalledWith(expect.any(Function));
    updateFunction = setSelectedMock.mock.calls[1][0];
    expect(updateFunction(selected)).toEqual([1, 3, 2]);

    // Uncheck the third checkbox
    fireEvent.click(checkboxes[2]);
    expect(setSelectedMock).toHaveBeenCalledWith(expect.any(Function));
    updateFunction = setSelectedMock.mock.calls[2][0];
    expect(updateFunction(selected)).toEqual([1]);
  });
});
