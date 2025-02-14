import { Card, CardContent } from '../ui/card'

export default function CardBorderStart({
    title,
    value,
    children
}:{
    title:string,
    value?:string,
    children?:React.ReactNode
}) {
  return (
    <Card className='border-0 shadow-none rounded-none bg-transparent !border-s-2 p-0'>
        <CardContent className='flex flex-col space-y-1 py-1 px-1'>
            <span className='text-sm text-gray-500'>{title}</span>
            {children ? children : <span className='text-base'>{value}</span>}
        </CardContent>
    </Card>
  )
}
