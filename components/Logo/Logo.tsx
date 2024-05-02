import Image from "next/image";

const Logo: React.FC = () => {
 return(
  <div style={{
    width: '250px',
    height: '250px',
    position: 'relative',
    overflow: 'hidden'
  }}>
    <Image src="/images/LOGO.png" alt="Logo Image" layout="fill" style={{
      position: 'absolute',
      width: '100%',
      height: '100%',
      objectFit: 'contain',
      left: '50%',
      top: '50%',
      transform: 'translate(-50%, -50%)'
    }}/>
  </div>
 )
}

export default Logo; 