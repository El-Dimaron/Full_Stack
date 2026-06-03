export default function ButtonStandard({ text, type = "button", counter, onClick }) {
  return (
    <button className="button-main" type={type} onClick={onClick}>
      {text} {counter}
    </button>
  );
}
