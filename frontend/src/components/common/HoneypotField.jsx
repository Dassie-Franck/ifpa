// Champ invisible anti-bot : un humain ne le voit ni ne le remplit jamais.
// Un bot qui scanne le DOM et remplit tous les champs le remplira, ce qui
// permet au backend de rejeter silencieusement la soumission.
function HoneypotField({ value, onChange }) {
  return (
    <input
      type="text"
      name="website"
      value={value}
      onChange={onChange}
      tabIndex={-1}
      autoComplete="off"
      style={{
        position: 'absolute',
        left: '-9999px',
        width: '1px',
        height: '1px',
        opacity: 0,
        pointerEvents: 'none',
      }}
      aria-hidden="true"
    />
  );
}

export default HoneypotField;