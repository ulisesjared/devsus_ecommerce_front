import PageHeader from '../../common/Components/Pages/PageHeader';
import { Icons } from '../../common/Constants/Icons';
import useSession from '../../common/hooks/SessionProvider';


export const ProfileScreen = () => {

   const { session } = useSession();
   const { user } = session ?? {};

   return (
      <div className="flex flex-col p-2 flex-1">
         <PageHeader
            title="Mi perfil"
         />
         {
            <div className='bg-white rounded-md shadow-md size-full padding-x'>

               <div className="flex flex-col size-full gap-4 py-6">
                  <div className="flex flex-col w-full rounded-md border border-slate-300 py-3 px-4">

                     <div className="flex gap-2 items-center text-blue-900">
                        <Icons.Person size="24px" />
                        <h2 className="font-semibold">{user?.usuario}</h2>
                     </div>
                     <p className="pl-1">{user?.role}</p>
                  </div>
               </div>
            </div>
         }
      </div>

   )
}
