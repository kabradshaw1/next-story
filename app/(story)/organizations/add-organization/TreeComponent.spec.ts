import { convertToHierarchy } from './TreeComponent';

describe('TreeComponent', () => {
  describe('convertTOHierarchy', () => {
    it('givenProperlyFormattedArguement_whenCalled_thenItShouldReturnHierarchy', () => {
      const args = [
        { title: 'King', subordinatesTitles: ['Knight'] },
        { title: 'Knight', subordinatesTitles: ['Squires'] },
        { title: 'Squires', subordinatesTitles: ['Peasants'] },
        { title: 'Peasants', subordinatesTitles: [] },
      ];
      const result = convertToHierarchy(args);

      const expected = {
        title: 'King',
        subordinatesTitles: ['Knight'],
        children: [
          {
            title: 'Knight',
            superior: 'King',
            subordinatesTitles: ['Squires'],
            children: [
              {
                title: 'Squires',
                subordinatesTitles: ['Peasants'],
                superior: 'Knight',
                children: [{ title: 'Peasants', subordinatesTitles: [] }],
              },
            ],
          },
        ],
      };
      expect(result).toEqual(expected);
    });
  });
});
