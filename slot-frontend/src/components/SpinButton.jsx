export default function SpinButton({ disabled, onClick }) {
  return (
    <button
      className="spin-button"
      disabled={disabled}
      onClick={onClick}
      style={{
        padding: "12px 24px",
        fontSize: "1.2rem",
        borderRadius: "8px",
        cursor: disabled ? "not-allowed" : "pointer",
        backgroundColor: disabled ? "#999" : "#28a745",
        color: "#fff",
        border: "none",
        transition: "background-color 0.2s ease"
      }}
    >
      {disabled ? "Girando..." : "Girar"}
    </button>
  )
}
