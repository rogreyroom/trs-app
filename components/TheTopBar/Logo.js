import { useRouter } from 'next/router'
import { TextButton } from '@/common/Buttons'
import { Title } from '@/common/Title'

export const Logo = () => {
  const router = useRouter()

  return (
    <TextButton onClickAction={() => router.push('/')} >
      <Title isLogo>
        RTS
      </Title>
    </TextButton>
  )
}
