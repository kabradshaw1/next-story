import React from 'react';

import { MockedProvider } from '@apollo/client/testing';
import { render, screen, fireEvent } from '@testing-library/react';

import { useOrganizationsQuery } from '@/generated/graphql';

import Roles from './Roles';

// Mock the GraphQL query hook
jest.mock('@/generated/graphql', () => ({
  useOrganizationsQuery: jest.fn(),
}));

const mockUseOrganizationsQuery = useOrganizationsQuery as jest.Mock;

describe('Roles Component', () => {
  const setSelectedRolesMock = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders loading state', () => {
    mockUseOrganizationsQuery.mockReturnValue({
      data: null,
      loading: true,
      error: null,
    });

    render(
      <MockedProvider mocks={[]} addTypename={false}>
        <Roles selectedRoles={[]} setSelectedRoles={setSelectedRolesMock} />
      </MockedProvider>
    );

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  test('renders error state', () => {
    mockUseOrganizationsQuery.mockReturnValue({
      data: null,
      loading: false,
      error: { message: 'Error fetching data' },
    });

    render(
      <MockedProvider mocks={[]} addTypename={false}>
        <Roles selectedRoles={[]} setSelectedRoles={setSelectedRolesMock} />
      </MockedProvider>
    );

    expect(screen.getByText('Error: Error fetching data')).toBeInTheDocument();
  });

  test('renders roles and handles checkbox changes', () => {
    mockUseOrganizationsQuery.mockReturnValue({
      data: {
        organizations: [
          {
            id: 1,
            title: 'Org 1',
            roles: [
              { id: 1, title: 'Role 1' },
              { id: 2, title: 'Role 2' },
            ],
          },
          {
            id: 2,
            title: 'Org 2',
            roles: [
              { id: 3, title: 'Role 3' },
              { id: 4, title: 'Role 4' },
            ],
          },
        ],
      },
      loading: false,
      error: null,
    });

    render(
      <MockedProvider mocks={[]} addTypename={false}>
        <Roles selectedRoles={[1, 3]} setSelectedRoles={setSelectedRolesMock} />
      </MockedProvider>
    );

    const checkboxes = screen.getAllByRole('checkbox');

    expect(checkboxes).toHaveLength(4);
    expect(checkboxes[0]).toBeChecked();
    expect(checkboxes[2]).toBeChecked();

    // Test checkbox interaction
    fireEvent.click(checkboxes[1]);

    // Check the updater function
    expect(setSelectedRolesMock).toHaveBeenCalled();
    const updaterFunction = setSelectedRolesMock.mock.calls[0][0];
    expect(updaterFunction([1, 3])).toEqual([1, 3, 2]);

    fireEvent.click(checkboxes[0]);

    // Check the updater function again
    expect(setSelectedRolesMock).toHaveBeenCalledTimes(2);
    const updaterFunction2 = setSelectedRolesMock.mock.calls[1][0];
    expect(updaterFunction2([1, 3])).toEqual([3]);
  });
});
