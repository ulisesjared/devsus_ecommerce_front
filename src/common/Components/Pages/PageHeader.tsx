import { useNavigate } from 'react-router-dom'
import BackButton from '../Buttons/BackButton'
import Button from '../Buttons/Button'
import type { PageHeaderProps } from './PageHeaderInterface'

const PageHeader: React.FC<PageHeaderProps> = ({
   title = "Page",
   backNavigation = false,
   submitButton = null,
   showSubmitButton = false,
   onSubmit = () => { }
}) => {

   const navigate = useNavigate()

   return (
      <div className='relative total-center flex-row w-full h-10 md:h-8'>
         <div className='absolute left-0 flex flex-row items-center gap-2'>
            {backNavigation && <BackButton onClick={() => navigate(-1)} />}
         </div>
         <p className='text-lg font-semibold text-blue-900'>
            {title}
         </p>
         <div className='absolute right-0 flex flex-row gap-2'>
            {showSubmitButton && <Button onClick={onSubmit} className='h-10 px-8 btn btn-action '>{submitButton}</Button>}
         </div>
      </div>
   )
}

export default PageHeader