import { useState } from 'react';
import type { Dispatch, SetStateAction } from 'react';

type Props = {
  data: Array<{ title: string; id: number }>;
  setSelected: Dispatch<SetStateAction<number[]>>;
  selected: number[];
  idPrefix?: string;
  singleSelect?: boolean;
};

export default function CheckBoxList({
  data,
  setSelected,
  selected,
  idPrefix = 'checkbox',
  singleSelect = false,
}: Props): JSX.Element {
  const [searchTerm, setSearchTerm] = useState('');

  const handleChange = (Id: number): void => {
    setSelected((prevSelectedIds) => {
      if (singleSelect) {
        return [Id];
      } else if (prevSelectedIds.includes(Id)) {
        return prevSelectedIds.filter((id) => id !== Id);
      } else {
        return [...prevSelectedIds, Id];
      }
    });
  };

  const filteredData = data.filter((item) =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col max-w-md">
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) =>
          // eslint-disable-next-line @typescript-eslint/no-confusing-void-expression
          setSearchTerm(e.target.value)
        }
        className="mb-4 p-2 border rounded"
      />
      <div className="overflow-y-auto max-h-64 border rounded p-2">
        {filteredData.map((item) => (
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
      </div>
    </div>
  );
}
