type Props = {
  text?: string;
};
function FormErrorText({ text }: Props) {
  return (
    <div>
      <p className="text-xs text-red-600">{text}</p>
    </div>
  );
}

export default FormErrorText;
