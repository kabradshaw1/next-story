import type { Dispatch, SetStateAction } from 'react';
type Props = {
  data: Array<{ title: string; id: number }>;
  setSelected: Dispatch<SetStateAction<number[]>>;
  selected: number[];
};

export default function CheckBoxList({
  data,
  setSelected,
  selected,
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
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              className="form-checkbox"
              value={item.id}
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
