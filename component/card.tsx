const Card = ({ children }: { children: React.ReactNode }) => {
  const chardStyle = {
    padding: "100px",
    margin: "10px",
    boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)",
    border: "1px solid #e0e0e0",
    display: "flex",
    justifyContent: "center",
    alightItems: "center",
  };
  return <div style={chardStyle}>{children}</div>;
};

export default Card;
