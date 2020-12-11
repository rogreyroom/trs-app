import Link from 'next/link'
import { StyledButton } from './StyledComponents'

export const Button = ({ children, href }) => {
  return (
    <Link href={href}>
        <StyledButton>
          { children }
        </StyledButton>
    </Link>
  )
}
