import { convertToHierarchy } from './orgHelper';
import { type RoleInput } from '../app/(story)/organizations/add-organization/OrganizationForm';

describe('TreeComponent', () => {
  describe('convertToHierarchy', () => {
    it('givenProperlyFormattedArgument_whenCalled_thenItShouldReturnHierarchy', () => {
      const args: RoleInput[] = [
        {
          title: 'King',
          text: 'King of the land',
        },
        {
          title: 'Knight',
          superiorTitle: 'King',
        },
        {
          title: 'Squires',
          superiorTitle: 'Knight',
        },
        {
          title: 'Peasants',
          superiorTitle: 'Squires',
        },
      ];

      const result = convertToHierarchy(args);

      const expected = {
        title: 'King',
        text: 'King of the land',
        children: [
          {
            title: 'Knight',
            superiorTitle: 'King',
            children: [
              {
                title: 'Squires',
                superiorTitle: 'Knight',
                children: [
                  {
                    title: 'Peasants',
                    superiorTitle: 'Squires',
                    children: [],
                  },
                ],
              },
            ],
          },
        ],
      };
      expect(result).toEqual(expected);
    });
  });
});
