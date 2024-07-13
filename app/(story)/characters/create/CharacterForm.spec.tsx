import React from 'react';

import { MockedProvider } from '@apollo/client/testing';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { useRouter } from 'next/navigation';

import {
  useCreateCharacterMutation,
  useOrganizationsQuery,
} from '@/generated/graphql';
import StoreProvider from '@/lib/StoreProvider';

import CharacterForm from './CharacterForm';

// Mock the GraphQL mutation
jest.mock('@/generated/graphql', () => ({
  useCreateCharacterMutation: jest.fn(),
  useOrganizationsQuery: jest.fn(),
}));

// Mock the useRouter hook
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

const mockUseCreateCharacterMutation = useCreateCharacterMutation as jest.Mock;
const mockUseOrganizationsQuery = useOrganizationsQuery as jest.Mock;
const mockUseRouter = useRouter as jest.Mock;

describe('CharacterForm Component', () => {
  const createCharacterMock = jest.fn();
  const pushMock = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    mockUseCreateCharacterMutation.mockReturnValue([
      createCharacterMock,
      { error: null },
    ]);
    mockUseRouter.mockReturnValue({ push: pushMock });
  });

  test('renders the form correctly', () => {
    mockUseOrganizationsQuery.mockReturnValue({
      data: { organizations: [] },
      loading: false,
      error: null,
    });
    render(
      <StoreProvider>
        <MockedProvider mocks={[]} addTypename={false}>
          <CharacterForm />
        </MockedProvider>
      </StoreProvider>
    );

    expect(screen.getByLabelText(/Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Back Ground/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Images/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Roles/i)).toBeInTheDocument();
    expect(screen.getByText(/Submit/i)).toBeInTheDocument();
  });

  test('handles form submission correctly', async () => {
    mockUseOrganizationsQuery.mockReturnValue({
      data: { organizations: [] },
      loading: false,
      error: null,
    });
    createCharacterMock.mockResolvedValue({
      data: {
        createCharacter: {
          uploadURLs: [],
        },
      },
    });

    render(
      <StoreProvider>
        <MockedProvider mocks={[]} addTypename={false}>
          <CharacterForm />
        </MockedProvider>
      </StoreProvider>
    );

    fireEvent.change(screen.getByLabelText(/Name/i), {
      target: { value: 'Test Character' },
    });
    fireEvent.change(screen.getByLabelText(/Back Ground/i), {
      target: { value: 'Test Description' },
    });

    fireEvent.click(screen.getByText(/Submit/i));

    await waitFor(() => {
      expect(createCharacterMock).toHaveBeenCalledWith({
        variables: {
          title: 'Test Character',
          text: 'Test Description',
          files: [],
          roleIds: [],
        },
      });
    });

    expect(pushMock).toHaveBeenCalledWith('/characters/create/review');
  });

  test('handles file upload correctly', async () => {
    mockUseOrganizationsQuery.mockReturnValue({
      data: { organizations: [] },
      loading: false,
      error: null,
    });
    render(
      <StoreProvider>
        <MockedProvider mocks={[]} addTypename={false}>
          <CharacterForm />
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

  test('handles role selection correctly', async () => {
    mockUseOrganizationsQuery.mockReturnValue({
      data: {
        organizations: [
          { title: 'Org 1', id: 1, roles: [{ title: 'Role 1', id: 1 }] },
        ],
      },
      loading: false,
      error: null,
    });
    render(
      <StoreProvider>
        <MockedProvider mocks={[]} addTypename={false}>
          <CharacterForm />
        </MockedProvider>
      </StoreProvider>
    );

    const checkbox = screen.getByLabelText(/Role 1 of Org 1/i);

    fireEvent.click(checkbox);

    await waitFor(() => {
      expect(checkbox).toBeChecked();
    });
  });
});
