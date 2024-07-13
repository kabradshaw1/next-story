import React from 'react';

import { render, screen } from '@testing-library/react';

import ButtonAndPopup from '@/components/ButtonAndPopup/ButtonAndPopup';
import ImageList from '@/components/ImageList/ImageList';
import LinksCard from '@/components/LinksCard/LinksCard';
import { type OrganizationQuery } from '@/generated/graphql';

import SingleOrg from './SingleOrg';

jest.mock('@/components/ImageList/ImageList', () => jest.fn(() => null));
jest.mock('@/components/LinksCard/LinksCard', () => jest.fn(() => null));
jest.mock('@/components/ButtonAndPopup/ButtonAndPopup', () =>
  jest.fn(() => null)
);

describe('SingleOrg Component', () => {
  const setup = (props: OrganizationQuery): void => {
    render(<SingleOrg {...props} />);
  };

  const mockOrganization: OrganizationQuery = {
    organization: {
      title: 'Test Organization',
      text: 'Test Description',
      createdAt: '2021-01-01',
      user: 'Test User',
      downloadURLs: ['http://example.com/image1.jpg'],
      roles: [
        {
          title: 'Role 1',
          text: 'Role 1 Description',
          superior: { title: 'Superior 1' },
        },
        {
          title: 'Role 2',
          text: 'Role 2 Description',
          superior: null,
        },
      ],
      scenes: [{ title: 'Scene 1' }],
      locations: [{ title: 'Location 1' }],
      conflicts: [{ title: 'Conflict 1' }],
    },
  };

  beforeEach(() => {
    (ImageList as jest.Mock).mockClear();
    (LinksCard as jest.Mock).mockClear();
    (ButtonAndPopup as jest.Mock).mockClear();
  });

  test('renders correctly', () => {
    setup(mockOrganization);

    expect(screen.getByText('Test Organization')).toBeInTheDocument();
    expect(screen.getByText('Test Description')).toBeInTheDocument();
    expect(screen.getByText('Created at: 2021-01-01')).toBeInTheDocument();
    expect(screen.getByText('Created by: Test User')).toBeInTheDocument();
  });

  test('renders ImageList component with correct props', () => {
    setup(mockOrganization);

    expect(ImageList).toHaveBeenCalledWith(
      expect.objectContaining({
        alt: 'Organization',
        downloadURLs: ['http://example.com/image1.jpg'],
      }),
      {}
    );
  });

  test('renders LinksCard components with correct props', () => {
    setup(mockOrganization);

    expect(LinksCard).toHaveBeenCalledWith(
      expect.objectContaining({
        type: 'Scenes',
        items: mockOrganization.organization?.scenes,
      }),
      {}
    );
    expect(LinksCard).toHaveBeenCalledWith(
      expect.objectContaining({
        type: 'Locations',
        items: mockOrganization.organization?.locations,
      }),
      {}
    );
    expect(LinksCard).toHaveBeenCalledWith(
      expect.objectContaining({
        type: 'Conflicts',
        items: mockOrganization.organization?.conflicts,
      }),
      {}
    );
  });

  test('renders ButtonAndPopup component with mapped roles', () => {
    setup(mockOrganization);

    expect(ButtonAndPopup).toHaveBeenCalledWith(
      expect.objectContaining({
        roles: [
          {
            roleTitle: 'Role 1',
            superiorTitle: 'Superior 1',
            text: 'Role 1 Description',
          },
          {
            roleTitle: 'Role 2',
            superiorTitle: undefined,
            text: 'Role 2 Description',
          },
        ],
      }),
      {}
    );
  });

  test('handles empty organization data', () => {
    setup({ organization: null });

    expect(screen.queryByText('Test Organization')).not.toBeInTheDocument();
    expect(screen.queryByText('Created at:')).not.toBeInTheDocument();
    expect(screen.queryByText('Created by:')).not.toBeInTheDocument();
  });
});
