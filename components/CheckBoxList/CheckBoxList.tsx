import type { Dispatch, SetStateAction } from 'react';
type Props = {
  data: Array<{ title: string; id: number }>;
  setSelected: Dispatch<SetStateAction<number[]>>;
  selected: number[];
  idPrefix?: string;
};

export default function CheckBoxList({
  data,
  setSelected,
  selected,
  idPrefix = 'checkbox',
}: Props): JSX.Element {
  const handleChange = (Id: number): void => {
    setSelected((prevSelecteIds) => {
      if (prevSelecteIds.includes(Id)) {
        return prevSelecteIds.filter((id) => id !== Id);
      } else {
        return [...prevSelecteIds, Id];
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
              className="form-checkbox"
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
