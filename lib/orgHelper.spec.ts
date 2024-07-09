import { convertToHierarchy } from './orgHelper';
import { type RoleInput } from '../app/(story)/organizations/add-organization/RoleForm';

describe('TreeComponent', () => {
  describe('convertToHierarchy', () => {
    it('givenProperlyFormattedArgument_whenCalled_thenItShouldReturnHierarchy', () => {
      const args: RoleInput[] = [
        {
          roleTitle: 'King',
          text: 'King of the land',
        },
        {
          roleTitle: 'Knight',
          superiorTitle: 'King',
        },
        {
          roleTitle: 'Squires',
          superiorTitle: 'Knight',
        },
        {
          roleTitle: 'Peasants',
          superiorTitle: 'Squires',
        },
      ];

      const result = convertToHierarchy(args);

      const expected = {
        roleTitle: 'King',
        text: 'King of the land',
        children: [
          {
            roleTitle: 'Knight',
            superiorTitle: 'King',
            children: [
              {
                roleTitle: 'Squires',
                superiorTitle: 'Knight',
                children: [
                  {
                    roleTitle: 'Peasants',
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
