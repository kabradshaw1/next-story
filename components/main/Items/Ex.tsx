import { useAppSelector } from "@/lib/store";

const Ex: React.FC = () => {
  const authState = useAppSelector((state) => state.auth.token);
  return `${authState}`;
};

export default Ex;
