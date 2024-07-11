import Image from 'next/image';

type Props = {
  downloadURLs?: Array<string | null> | null;
  alt: string;
};

const ImageList: React.FC<Props> = ({ downloadURLs, alt }) => {
  return (
    <div className="gap-2">
      {downloadURLs !== null &&
        downloadURLs !== undefined &&
        downloadURLs.map((downloadURL) => (
          <Image
            key={downloadURL.imageUrl}
            src={downloadURL.imageUrl}
            alt={alt}
            width={200}
            height={200}
          />
        ))}
    </div>
  );
};

export default ImageList;
