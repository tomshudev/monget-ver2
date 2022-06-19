import { FC } from 'react'
import styled from 'styled-components'

type InputProps = {
  name?: string
  type: 'number' | 'text'
  placeholder?: string
  outlineColor?: string
}

const InputWrapper = styled.input`
  box-sizing: border-box;
  border-radius: 0.5rem;
  outline: none;
  border: 2px solid transparent;
  padding: 0.2rem;
  transition: all 0.2s ease-in-out;

  &:focus {
    border-color: ${(props) => props.outlineColor};
  }
`

const Input: FC<InputProps> = (props) => {
  // const borderClass = `focus:border-[${outlineColor || 'red'}]`
  return (
    // <input
    //   type={type}
    //   placeholder={placeholder}
    //   className={`rounded-md outline-none box-border border-2 border-transparent transition-all duration-200 ease-in-out ${borderClass}`}
    // />
    <InputWrapper {...props} />
  )
}

export default Input
