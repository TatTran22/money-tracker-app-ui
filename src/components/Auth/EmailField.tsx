import { FormControl, FormLabel, Input, InputGroup, InputProps, useMergeRefs } from '@chakra-ui/react'
import { forwardRef, useRef } from 'react'

export const EmailField = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const inputRef = useRef<HTMLInputElement>(null)
  const mergeRef = useMergeRefs(inputRef, ref)

  return (
    <FormControl>
      <FormLabel htmlFor="email">Email</FormLabel>
      <InputGroup>
        <Input id="email" ref={mergeRef} name="email" type="email" required {...props} />
      </InputGroup>
    </FormControl>
  )
})

EmailField.displayName = 'EmailField'
