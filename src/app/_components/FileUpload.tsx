import { Button, Stack } from '@mui/material';
import { useRef } from 'react';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import Image from 'next/image';

type Props = {
  label: string;
  file: File | undefined;
  setFile: (file: File) => void;
};
const FileUploadButton = ({ file, label, setFile }: Props) => {
  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setFile(file);
  };

  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <>
      {file && (
        <Stack alignItems='center'>
          <Image
            src={URL.createObjectURL(file)}
            width={300}
            height={300}
            alt='Icon image'
          />
        </Stack>
      )}
      <Button
        startIcon={<FileUploadIcon />}
        onClick={() => inputRef.current?.click()}
        sx={{ height: '100%' }}
      >
        {label}
      </Button>
      <input
        ref={inputRef}
        accept='image/*'
        type='file'
        style={{ display: 'none' }}
        onChange={onFileChange}
      />
    </>
  );
};

export default FileUploadButton;
