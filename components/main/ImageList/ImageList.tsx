import Image from 'next/image';

type Props = {
  images: Array<{
    imageUrl: string;
    alt: string;
  }>;
};

const ImageList: React.FC<Props> = ({ images }) => {
  return (
    <div className="gap-2">
      {images.map((image) => (
        <Image
          key={image.imageUrl}
          src={image.imageUrl}
          alt={image.alt}
          width={200}
          height={200}
        />
      ))}
    </div>
  );
};

export default ImageList;
