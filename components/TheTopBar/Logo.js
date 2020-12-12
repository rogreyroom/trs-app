import { useRouter } from 'next/router'
import { TextButton } from '@/components/common/Buttons'
import { Title } from '@/components/common/Title'

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
