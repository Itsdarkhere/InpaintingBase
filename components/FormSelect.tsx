import React from 'react';
import Select, { SingleValue } from 'react-select';

export default function FormSelect({
  options,
  onChange,
  hasOnChange,
  name,
  placeholder,
}: {
  options: { value: string; label: string }[];
  onChange?: (event: SingleValue<{ value: string; label: string }>) => void;
  hasOnChange: boolean;
  name: string;
  placeholder: string;
}) {
  // Check if onChange is passed in as a prop
  const checkOnChange = (
    event: SingleValue<{ value: string; label: string }>
  ) => {
    if (hasOnChange) {
      onChange!(event);
    }
  };

  return (
    <Select
      tabIndex={10}
      placeholder={placeholder}
      onChange={checkOnChange}
      options={options}
      id={name}
      instanceId={name}
      name={name}
      required
      styles={{
        container: (baseStyles, _) => ({
          ...baseStyles,
          width: '100%',
          height: '48px',
        }),
        placeholder: (baseStyles, _) => ({
          ...baseStyles,
          fontSize: '14px',
          color: 'rgb(52, 71, 103)',
        }),
        control: (baseStyles, state) => ({
          ...baseStyles,
          backgroundColor: 'transparent',
          fontSize: '14px',
          height: '48px',
          border: '0.0625rem solid rgb(210, 214, 218)',
          boxShadow: state.isFocused ? '0px 0px 6px #FFFFF' : 'none',
        }),
        option: (baseStyles, state) => ({
          ...baseStyles,
          fontSize: '14px',
        }),
        indicatorSeparator: (baseStyles, _) => ({
          ...baseStyles,
          display: 'none',
        }),
        menu: (baseStyles, _) => ({
          ...baseStyles,
          marginTop: 0,
        }),
      }}
      theme={(theme) => ({
        ...theme,
        colors: {
          ...theme.colors,
          neutral80: 'rgb(52, 71, 103)',
        },
      })}
    />
  );
}
