import React from 'react';

import { MockedProvider } from '@apollo/client/testing';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { useRouter } from 'next/navigation';

import {
  useCreateOrganizationMutation,
  useForOrganizationFormQuery,
} from '@/generated/graphql';
import StoreProvider from '@/lib/StoreProvider';

import OrganizationForm from './OrganizationForm';

// Mock the GraphQL mutation and query
jest.mock('@/generated/graphql', () => ({
  useCreateOrganizationMutation: jest.fn(),
  useForOrganizationFormQuery: jest.fn(),
}));

// Mock the useRouter hook
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

// Mock the d3 module
jest.mock('d3', () => {
  return {
    select: jest.fn(),
    hierarchy: jest.fn(),
    tree: jest.fn(),
    linkHorizontal: jest.fn(),
  };
});

// Mock the specific component that uses d3
jest.mock('@/components/TreeSVG/TreeSVG', () => {
  return function DummyTreeSVG() {
    return <div data-testid="mock-tree-svg">Mock Tree SVG</div>;
  };
});

const mockUseCreateOrganizationMutation =
  useCreateOrganizationMutation as jest.Mock;
const mockUseForOrganizationFormQuery =
  useForOrganizationFormQuery as jest.Mock;
const mockUseRouter = useRouter as jest.Mock;

describe('OrganizationForm Component', () => {
  const createOrganizationMock = jest.fn();
  const pushMock = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    mockUseCreateOrganizationMutation.mockReturnValue([
      createOrganizationMock,
      { error: null },
    ]);
    mockUseRouter.mockReturnValue({ push: pushMock });
  });

  test('renders the form correctly', () => {
    mockUseForOrganizationFormQuery.mockReturnValue({
      data: { locations: [], conflicts: [] },
      loading: false,
      error: null,
    });

    render(
      <StoreProvider>
        <MockedProvider mocks={[]} addTypename={false}>
          <OrganizationForm />
        </MockedProvider>
      </StoreProvider>
    );

    expect(screen.getByLabelText(/Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Back Ground/i)).toBeInTheDocument();
    expect(screen.getByText(/Create Organization/i)).toBeInTheDocument();
  });

  test('handles form submission correctly', async () => {
    mockUseForOrganizationFormQuery.mockReturnValue({
      data: { locations: [], conflicts: [] },
      loading: false,
      error: null,
    });
    createOrganizationMock.mockResolvedValue({
      data: {
        createOrganization: {
          uploadURLs: [],
          title: 'New Organization',
        },
      },
    });

    render(
      <StoreProvider>
        <MockedProvider mocks={[]} addTypename={false}>
          <OrganizationForm />
        </MockedProvider>
      </StoreProvider>
    );

    fireEvent.change(screen.getByLabelText(/Name/i), {
      target: { value: 'Test Org' },
    });
    fireEvent.change(screen.getByLabelText(/Back Ground/i), {
      target: { value: 'Test Description' },
    });

    fireEvent.click(screen.getByText(/Create Organization/i));

    await waitFor(() => {
      expect(createOrganizationMock).toHaveBeenCalledWith({
        variables: {
          title: 'Test Org',
          text: 'Test Description',
          files: [],
          roleCreate: [],
          locationIds: [],
          conflictIds: [],
          headquartersId: undefined,
        },
      });
    });

    expect(pushMock).toHaveBeenCalledWith('/organizations/create/review');
  });

  test('handles file upload correctly', async () => {
    mockUseForOrganizationFormQuery.mockReturnValue({
      data: { locations: [], conflicts: [] },
      loading: false,
      error: null,
    });

    render(
      <StoreProvider>
        <MockedProvider mocks={[]} addTypename={false}>
          <OrganizationForm />
        </MockedProvider>
      </StoreProvider>
    );

    const fileInput = screen.getByLabelText(/Images/i);
    const file = new File(['dummy content'], 'example.png', {
      type: 'image/png',
    });

    fireEvent.change(fileInput, { target: { files: [file] } });

    await waitFor(() => {
      expect(screen.getByText('example.png')).toBeInTheDocument();
    });
  });

  test('handles conflict and location selection correctly', async () => {
    mockUseForOrganizationFormQuery.mockReturnValue({
      data: {
        locations: [{ id: 1, title: 'Location 1' }],
        conflicts: [{ id: 1, title: 'Conflict 1' }],
      },
      loading: false,
      error: null,
    });

    render(
      <StoreProvider>
        <MockedProvider mocks={[]} addTypename={false}>
          <OrganizationForm />
        </MockedProvider>
      </StoreProvider>
    );

    const conflictCheckbox = screen.getByLabelText(/Conflict 1/i);
    const locationCheckbox = screen.getByLabelText(/Location 1/i);

    fireEvent.click(conflictCheckbox);
    fireEvent.click(locationCheckbox);

    await waitFor(() => {
      expect(conflictCheckbox).toBeChecked();
      expect(locationCheckbox).toBeChecked();
    });
  });
});
