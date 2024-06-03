import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Header } from '@/components//header'
import { BackButton } from '@/components//back-button'

interface CardWrapperProps {
  children: React.ReactNode
  headerLabel: string
  backButtonLabel: string
  backButtonHref: string
}

export const CardWrapper = ({
  children,
  headerLabel,
  backButtonHref,
  backButtonLabel,
}: CardWrapperProps) => {
  return (
    <Card className='w-[800px] md:w-[400px] shadow-2xl'>
      <CardHeader>
        <Header label={headerLabel} />
      </CardHeader>
      <CardContent>{children}</CardContent>
      <CardFooter>
        <BackButton label={backButtonLabel} href={backButtonHref} />
      </CardFooter>
    </Card>
  )
}
