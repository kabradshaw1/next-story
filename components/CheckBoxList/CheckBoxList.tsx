import type { Dispatch, SetStateAction } from 'react';

type Props = {
  data: Array<{ title: string; id: number }>;
  setSelected: Dispatch<SetStateAction<number[]>>;
  selected: number[];
  idPrefix?: string;
  singleSelect?: boolean; // New prop to handle single selection
};

export default function CheckBoxList({
  data,
  setSelected,
  selected,
  idPrefix = 'checkbox',
  singleSelect = false, // Default to multi-select
}: Props): JSX.Element {
  const handleChange = (Id: number): void => {
    setSelected((prevSelectedIds) => {
      if (singleSelect) {
        return [Id]; // Only allow one selection
      } else if (prevSelectedIds.includes(Id)) {
        return prevSelectedIds.filter((id) => id !== Id);
      } else {
        return [...prevSelectedIds, Id];
      }
    });
  };

  return (
    <>
      {data.map((item) => (
        <div key={item.id} className="mb-2">
          <label
            className="inline-flex items-center"
            htmlFor={`${idPrefix}-${item.id}`}
          >
            <input
              type="checkbox"
              value={item.id}
              id={`${idPrefix}-${item.id}`}
              checked={selected.includes(item.id)}
              onChange={() => {
                handleChange(item.id);
              }}
            />
            <span className="ml-2">{item.title}</span>
          </label>
        </div>
      ))}
    </>
  );
}
