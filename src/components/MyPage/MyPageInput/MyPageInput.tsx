import styled from '@emotion/styled';
import { theme } from '@styles/themes';

const MyPageInputContainer = styled.div(
  ({ isError }: { isError: boolean }) => ({
    ['>p']: {
      color: isError ? theme.colors.sub_red : theme.colors.sub_gray3,
    },

    ['>input']: {
      outline: isError ? `1px solid ${theme.colors.sub_red}` : 'none',
    },
  }),
  {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    padding: '0 20px',

    ['>p']: {
      margin: '0',
      ...theme.font.body16Medium,
    },

    ['>input']: {
      border: 'none',
      padding: '20px 16px',
      height: '48px',
      boxSizing: 'border-box',
      borderRadius: '5px',
      background: theme.colors.sub_gray11,
      color: theme.colors.sub_gray3,
      ...theme.font.body16Medium,

      ['&::placeholder']: {
        color: theme.colors.sub_gray8,
      },
    },
  },
);

const MyPageInputSubContainer = styled.div({
  display: 'flex',
  justifyContent: 'space-between',
  height: '20px',

  ['>p']: {
    margin: '0',

    ['&.error']: {
      padding: '0 4px',
      ...theme.font.body14Medium,
      color: theme.colors.sub_red,
    },

    ['&.sub']: {
      ...theme.font.body14Regular,
      color: theme.colors.sub_gray3,

      ['>span']: {
        ...theme.font.body14Semibold,
      },
    },
  },
});

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
