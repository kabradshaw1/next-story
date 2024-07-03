import type { Dispatch, SetStateAction } from 'react';

type Props = {
  data: Array<{ title: string; id: number }>;
  selected: number | undefined;
  setSelected: Dispatch<SetStateAction<number | undefined>>;
  idPrefix?: string;
};

export default function HeadquartersDowndown({
  data,
  selected,
  setSelected,
  idPrefix = 'dropdown',
}: Props): JSX.Element {
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>): void => {
    setSelected(parseInt(event.target.value, 10));
  };

  return (
    <select
      id={`${idPrefix}-select`}
      value={selected}
      onChange={handleChange}
      className="form-select"
    >
      <option value="">Select an option</option>
      {data.map((item) => (
        <option key={item.id} value={item.id}>
          {item.title}
        </option>
      ))}
    </select>
  );
}
