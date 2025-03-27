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
    <>
       <div className="border-s-2 ps-3 ">
          <p className="text-gray-500">{title}</p>
          {children ? children : <p className="font-semibold">{value}</p>}
        </div>
        {/* <Card className='border-0 shadow-none rounded-none bg-transparent !border-s-2 p-0'>
            <CardContent className='flex flex-col space-y-1 px-1'>
                <span className='text-sm text-gray-500'></span>
            </CardContent>
        </Card> */}
    </>
  )
}
