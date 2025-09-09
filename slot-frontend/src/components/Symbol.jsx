export default function Symbol({ value }) {
  return (
    <div
      className="symbol"
      style={{
        fontSize: "2rem",
        textAlign: "center",
        width: "80px",
        height: "80px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {value}
    </div>
  )
}
