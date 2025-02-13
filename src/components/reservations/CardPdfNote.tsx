import { Button } from '../ui/button'
import { Card, CardContent, CardHeader } from '../ui/card'

export default function CardPdfNote({
  name,
  description,
  file,
  onDelete
}: {
  name: string;
  description: string;
  file: File;
  onDelete: () => void;
}) {
  return (
    <Card className='flex flex-col md:flex-row justify-between shadow-none border-none bg-[#F6F6F6]'>
        <CardHeader className='flex-1 flex flex-col md:flex-row gap-4 p-2'>
           <img src={URL.createObjectURL(file)} className='md:size-14 h-40  p-1'/>
           <div>
            <a href="#" className='text-gray-600 text-sm'>{file.name}</a>
            <div className='flex gap-3'>
              <p className='text-gray-400 text-xs'>{name}</p>
              <p className='text-gray-400 text-xs'>{description}</p>
            </div>
           </div>
        </CardHeader>
        <CardContent className='flex items-center'>
          <Button variant={"ghost"} size={"icon"} >
            <svg width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M13.2594 3.59924L5.04936 12.2892C4.73936 12.6192 4.43936 13.2692 4.37936 13.7192L4.00936 16.9592C3.87936 18.1292 4.71936 18.9292 5.87936 18.7292L9.09936 18.1792C9.54936 18.0992 10.1794 17.7692 10.4894 17.4292L18.6994 8.73924C20.1194 7.23924 20.7594 5.52924 18.5494 3.43924C16.3494 1.36924 14.6794 2.09924 13.2594 3.59924Z" stroke="black" strokeOpacity="0.56" strokeWidth="1.5" strokeMiterlimit={10} strokeLinecap="round" strokeLinejoin="round" />
              <path d="M11.8906 5.05078C12.3206 7.81078 14.5606 9.92078 17.3406 10.2008" stroke="black" strokeOpacity="0.56" strokeWidth="1.5" strokeMiterlimit={10} strokeLinecap="round" strokeLinejoin="round" />
              <path d="M3 22H21" stroke="black" strokeOpacity="0.56" strokeWidth="1.5" strokeMiterlimit={10} strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Button>
          <Button variant={"ghost"} size={"icon"} onClick={onDelete}>
            <svg width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M21 5.98047C17.67 5.65047 14.32 5.48047 10.98 5.48047C9 5.48047 7.02 5.58047 5.04 5.78047L3 5.98047" fill="#D32F2F" />
              <path d="M21 5.98047C17.67 5.65047 14.32 5.48047 10.98 5.48047C9 5.48047 7.02 5.58047 5.04 5.78047L3 5.98047" stroke="#D32F2F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M8.5 4.97L8.72 3.66C8.88 2.71 9 2 10.69 2H13.31C15 2 15.13 2.75 15.28 3.67L15.5 4.97" stroke="#D32F2F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M18.8504 9.14062L18.2004 19.2106C18.0904 20.7806 18.0004 22.0006 15.2104 22.0006H8.79039C6.00039 22.0006 5.91039 20.7806 5.80039 19.2106L5.15039 9.14062" stroke="#D32F2F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M10.3301 16.5H13.6601" stroke="#D32F2F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M9.5 12.5H14.5" stroke="#D32F2F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Button>
        </CardContent>
    </Card>
  )
}
