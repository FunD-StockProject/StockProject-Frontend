import { MyPageInputContainer, MyPageInputSubContainer } from './MyPageInput.Style';

export interface MyPageInputProps {
  name: string;
  error: string;
  title: string;
  sub?: React.ReactElement;
  inputs: {
    key: string;
    value: string;
    placeholder: string;
    disabled?: boolean;
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  }[];
}

const MyPageInput = (props: MyPageInputProps) => {
  const { name, error, title, sub, inputs } = props;

  return (
    <MyPageInputContainer isError={!!error}>
      <p>{title}</p>
      {inputs.map((e, i) => (
        <input
          key={`${name}_${i}`}
          type="text"
          name={e.key}
          value={e.value}
          placeholder={e.placeholder}
          disabled={e.disabled}
          onChange={e.handleChange}
        />
      ))}
      <MyPageInputSubContainer>
        <p className="error">{error}</p>
        {!!sub && <p className="sub">{sub}</p>}
      </MyPageInputSubContainer>
    </MyPageInputContainer>
  );
};

export default MyPageInput;
