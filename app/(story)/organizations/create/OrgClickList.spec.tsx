import React from 'react';

import { MockedProvider } from '@apollo/client/testing';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';

import { useForOrganizationFormQuery } from '@/generated/graphql';

import OrgClickLists from './OrgClickLists';

// Mock the GraphQL query
jest.mock('@/generated/graphql', () => ({
  useForOrganizationFormQuery: jest.fn(),
}));

const mockUseForOrganizationFormQuery =
  useForOrganizationFormQuery as jest.Mock;

describe('OrgClickLists Component', () => {
  const setSelectedConflicts = jest.fn();
  const setSelectedLocations = jest.fn();
  const setSelectedHeadquarters = jest.fn();

  const defaultProps = {
    selectedConflicts: [],
    setSelectedConflicts,
    selectedLocations: [],
    setSelectedLocations,
    selectedHeadquarters: undefined,
    setSelectedHeadquarters,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders loading state', () => {
    mockUseForOrganizationFormQuery.mockReturnValue({
      data: undefined,
      loading: true,
      error: null,
    });

    render(
      <MockedProvider>
        <OrgClickLists {...defaultProps} />
      </MockedProvider>
    );

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  test('renders error state', () => {
    mockUseForOrganizationFormQuery.mockReturnValue({
      data: undefined,
      loading: false,
      error: new Error('Failed to load data'),
    });

    render(
      <MockedProvider>
        <OrgClickLists {...defaultProps} />
      </MockedProvider>
    );

    expect(screen.getByText('Error: Failed to load data')).toBeInTheDocument();
  });

  test('renders with data', async () => {
    mockUseForOrganizationFormQuery.mockReturnValue({
      data: {
        locations: [
          { id: 1, title: 'Location 1' },
          { id: 2, title: 'Location 2' },
        ],
        conflicts: [
          { id: 1, title: 'Conflict 1' },
          { id: 2, title: 'Conflict 2' },
        ],
      },
      loading: false,
      error: null,
    });

    render(
      <MockedProvider>
        <OrgClickLists {...defaultProps} />
      </MockedProvider>
    );

    expect(screen.getByText('Conflicts')).toBeInTheDocument();
    expect(screen.getByLabelText('Conflict 1')).toBeInTheDocument();
    expect(screen.getByLabelText('Conflict 2')).toBeInTheDocument();
    expect(screen.getByText('Headquarters')).toBeInTheDocument();
    expect(screen.getByText('Locations')).toBeInTheDocument();
  });

  test('handles conflict selection', async () => {
    mockUseForOrganizationFormQuery.mockReturnValue({
      data: {
        locations: [
          { id: 1, title: 'Location 1' },
          { id: 2, title: 'Location 2' },
        ],
        conflicts: [
          { id: 1, title: 'Conflict 1' },
          { id: 2, title: 'Conflict 2' },
        ],
      },
      loading: false,
      error: null,
    });

    render(
      <MockedProvider>
        <OrgClickLists {...defaultProps} />
      </MockedProvider>
    );

    fireEvent.click(screen.getByLabelText('Conflict 1'));

    await waitFor(() => {
      expect(setSelectedConflicts).toHaveBeenCalledTimes(1);
      expect(setSelectedConflicts).toHaveBeenCalledWith(expect.any(Function));
    });
  });

  test('handles location selection', async () => {
    mockUseForOrganizationFormQuery.mockReturnValue({
      data: {
        locations: [
          { id: 1, title: 'Location 1' },
          { id: 2, title: 'Location 2' },
        ],
        conflicts: [
          { id: 1, title: 'Conflict 1' },
          { id: 2, title: 'Conflict 2' },
        ],
      },
      loading: false,
      error: null,
    });

    render(
      <MockedProvider>
        <OrgClickLists {...defaultProps} />
      </MockedProvider>
    );

    fireEvent.click(screen.getByLabelText('Location 1'));

    await waitFor(() => {
      expect(setSelectedLocations).toHaveBeenCalledTimes(1);
      expect(setSelectedLocations).toHaveBeenCalledWith(expect.any(Function));
    });
  });

  test('handles headquarters selection', async () => {
    mockUseForOrganizationFormQuery.mockReturnValue({
      data: {
        locations: [
          { id: 1, title: 'Location 1' },
          { id: 2, title: 'Location 2' },
        ],
        conflicts: [
          { id: 1, title: 'Conflict 1' },
          { id: 2, title: 'Conflict 2' },
        ],
      },
      loading: false,
      error: null,
    });

    render(
      <MockedProvider>
        <OrgClickLists {...defaultProps} />
      </MockedProvider>
    );

    fireEvent.change(screen.getByRole('combobox'), {
      target: { value: '1' },
    });

    await waitFor(() => {
      expect(setSelectedHeadquarters).toHaveBeenCalledTimes(1);
      expect(setSelectedHeadquarters).toHaveBeenCalledWith(1);
    });
  });
});
