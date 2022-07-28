import { createRef, useState } from 'react';
import {
  Wrapper,
  Input,
  Label,
  ErrorText,
  IconContainer
} from './style';

interface ITextInputProps {
  id: string;
  type?: string;
  label?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
  error?: string;
  required?: boolean;
  disabled?: boolean;
  containerStyle?: React.CSSProperties;
  leftIcon?: React.FC;
  rightIcon?: React.FC | null;
  rightIconClick?: () => void;
  isResponsive?: boolean;
  [x: string]: any;
}

const TextInput: React.FC<ITextInputProps> = ({
  id,
  type,
  label,
  placeholder,
  value,
  onChange,
  onBlur,
  onFocus,
  error,
  required,
  disabled,
  containerStyle,
  leftIcon: LeftIcon,
  rightIcon: RightIcon,
  rightIconClick,
  isResponsive,
  ...props
}) => {
  const inputRef: any = createRef();
  const [isFocused, setFocus] = useState(false);

  return (
    <Wrapper style={containerStyle}>
      {label && <Label htmlFor={id}>{label}</Label>}
      <div className='w-input-icon'>
        {LeftIcon
          &&
          <IconContainer $isLeft={true} onClick={() => inputRef.current.focus()} >
            <LeftIcon />
          </IconContainer>
        }
        <Input
          id={id}
          ref={inputRef}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onBlur={(e) => { onBlur?.(e); setFocus(false); }}
          onFocus={(e) => { onFocus?.(e); setFocus(true); }}
          required={required}
          disabled={disabled}
          $error={!!error}
          $hasLeftIcon={!!LeftIcon}
          $responsive={isResponsive}
          {...props}
        />
        {RightIcon
          &&
          <IconContainer $isLeft={false} onClick={() => { rightIconClick?.() }} $isFocused={isFocused} $responsive={isResponsive}>
            <RightIcon />
          </IconContainer>
        }
      </div>
      {error && <ErrorText>*{error}</ErrorText>}
    </Wrapper>
  );
};

TextInput.defaultProps = {
  label: '',
  placeholder: '',
  type: 'text',
  value: '',
  onBlur: () => { },
  onFocus: () => { },
  required: false,
  disabled: false,
  containerStyle: {},
};

export default TextInput;
