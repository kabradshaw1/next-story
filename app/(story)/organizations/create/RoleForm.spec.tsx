import React from 'react';

import { MockedProvider } from '@apollo/client/testing';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';

import InputField from '@/components/main/forms/FormInput/InputField';
import StoreProvider from '@/lib/StoreProvider';

import RoleForm from './RoleForm';

// Mock the InputField component
jest.mock('@/components/main/forms/FormInput/InputField', () => {
  return jest.fn(() => null);
});

describe('RoleForm Component', () => {
  const setup = (superiorTitle?: string): void => {
    render(
      <StoreProvider>
        <MockedProvider mocks={[]} addTypename={false}>
          <RoleForm superiorTitle={superiorTitle} />
        </MockedProvider>
      </StoreProvider>
    );
  };

  beforeEach(() => {
    (InputField as jest.Mock).mockClear();
  });

  afterEach(() => {});

  test('renders correctly', () => {
    setup();

    expect(InputField).toHaveBeenCalledTimes(3);
    expect(InputField).toHaveBeenCalledWith(
      expect.objectContaining({
        id: 'superiorTitle',
        label: 'Superior Role (Click To Select)',
        placeholder: 'Click A Superior',
        readOnly: true,
      }),
      {}
    );
    expect(InputField).toHaveBeenCalledWith(
      expect.objectContaining({
        id: 'roleTitle',
        label: 'Role',
        placeholder: 'Role title',
      }),
      {}
    );
    expect(InputField).toHaveBeenCalledWith(
      expect.objectContaining({
        id: 'text',
        label: 'Role Description',
        placeholder: 'Role description',
      }),
      {}
    );
    expect(screen.getByText('Add Role')).toBeInTheDocument();
    expect(screen.getByText('Clear All Roles')).toBeInTheDocument();
  });

  test('clears state and form on clear button click', async () => {
    setup();

    fireEvent.click(screen.getByText('Clear All Roles'));

    await waitFor(() => {
      expect(
        screen.getByText('Roles Cleared and Not Submitted')
      ).toBeInTheDocument();
    });
  });
});
