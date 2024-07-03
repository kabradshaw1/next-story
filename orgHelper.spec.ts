import { type RoleInput } from './app/(story)/organizations/add-organization/OrganizationForm';
import { convertToHierarchy } from './orgHelper';

describe('TreeComponent', () => {
  describe('convertToHierarchy', () => {
    it('givenProperlyFormattedArgument_whenCalled_thenItShouldReturnHierarchy', () => {
      const args: RoleInput[] = [
        {
          title: 'King',
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
        superiorTitle: null,
        text: null,
        children: [
          {
            title: 'Knight',
            superiorTitle: 'King',
            text: null,
            children: [
              {
                title: 'Squires',
                superiorTitle: 'Knight',
                text: null,
                children: [
                  {
                    title: 'Peasants',
                    superiorTitle: 'Squires',
                    text: null,
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
