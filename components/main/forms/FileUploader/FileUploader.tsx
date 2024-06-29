import React from 'react';

import type {
  UseFormSetValue,
  FieldValues,
  Path,
  PathValue,
} from 'react-hook-form';

type FileUploaderProps<T extends FieldValues> = {
  files: File[];
  setFiles: React.Dispatch<React.SetStateAction<File[]>>;
  setValue: UseFormSetValue<T>;
  error?: string;
};

const FileUploader = <T extends FieldValues>({
  files,
  setFiles,
  setValue,
  error,
}: FileUploaderProps<T>): JSX.Element => {
  const handleFileChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const selectedFiles =
      event.target.files !== null ? Array.from(event.target.files) : [];
    setFiles((prevFiles) => [...prevFiles, ...selectedFiles]);
    setValue(
      'files' as Path<T>,
      [...files, ...selectedFiles] as PathValue<T, Path<T>>
    );
  };

  const handleRemoveFile = (fileToRemove: File): void => {
    const updatedFiles = files.filter((file) => file !== fileToRemove);
    setFiles(updatedFiles);
    setValue('files' as Path<T>, updatedFiles as PathValue<T, Path<T>>);
  };

  return (
    <div className="mb-4">
      <label htmlFor="files" className="label">
        Images
      </label>
      <input
        type="file"
        id="files"
        className="input bg-gray-700"
        multiple
        onChange={handleFileChange}
      />
      {error !== null && <p className="error-message">{error}</p>}
      {files.length > 0 && (
        <ul className="mt-2">
          {files.map((file, index) => (
            <li key={index} className="flex justify-between items-center">
              <span>{file.name}</span>
              <button
                type="button"
                className="text-red-500 ml-2"
                onClick={() => {
                  handleRemoveFile(file);
                }}
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FileUploader;
