import React from 'react';
import {
  DropdownWrapper,
  StyledSelect,
  StyledOption,
  SelectedText,
  Label,
  Wrapper,
  Error
} from './style';
import { BsChevronDown as DownIcon } from 'react-icons/bs';

interface IDropdownProps {
  change: (value: any) => void;
  label?: string;
  options: Array<{ value: string }>;
  selected?: { value: string };
  defaultValue?: string;
  error?: boolean | string;
  containerStyle?: object;
};

const selectRef = React.createRef<HTMLSelectElement>();

const Dropdown: React.FC<IDropdownProps> = ({
  change,
  options,
  selected,
  defaultValue,
  label,
  error,
  containerStyle
}) => {

  const handleChange = (e: any) => {
    change({ value: e.target.selectedOptions[0].text });
  };

  return (
    <Wrapper style={containerStyle || {}}>
      {label && <Label>{label}</Label>}
      <DropdownWrapper
        $error={!!error}
      >
        <StyledSelect
          ref={selectRef}
          value={selected!.value || defaultValue}
          onChange={handleChange}
        >
          {defaultValue &&
            <StyledOption
              key={'default'}
              value={defaultValue}
              disabled
            >
              {defaultValue}
            </StyledOption>
          }

          {options.map((option, idx) => (
            <StyledOption
              key={`${idx}-${option}`}
              value={option!.value}
            >
              {option!.value}
            </StyledOption>
          ))}
        </StyledSelect>

        <SelectedText $error={!!error}>{selected?.value || defaultValue}</SelectedText>
        <DownIcon color='#000' size={'16px'} style={{ marginLeft: '15px' }} />
      </DropdownWrapper>
      {error && <Error>*{error}</Error>}
    </Wrapper>
  );
};

Dropdown.defaultProps = {
  label: '',
  selected: {
    value: ''
  },
  options: [],
  defaultValue: '',
  error: false,
  containerStyle: {}
};


export default Dropdown;