'use client'



import { useSearchParams } from 'next/navigation'
import { useEffect } from 'react';
import { deleteCategory } from '../deletecategory';
import { useRouter } from 'next/navigation';
export const DeletePage  = () => {
    const router = useRouter();
 const searchParams = useSearchParams()
  const catid = searchParams?.get('id') 
  
  
  console.log("data has gone in deleteCategeory()");
  useEffect(() => {
    console.log("ID assign to deleteCategory",catid);
if (catid) {
  const parsedCatid = Number(catid);
  
  if (!isNaN(parsedCatid)) {
     deleteCategory({ catid: parsedCatid });
  } else {
    console.error("Invalid catid: not a number");
  }
} else {
  console.error("catid is null or undefined");
}

//console.log("ID has deleted..!!.......",result)

router.push('/productcategory');
}, [searchParams,router,catid],);
   return (
    
    <div><h1 className='text-2xl text-center mb-2'> Delete Category</h1>
    <form  className='mt-2'>
<input type='hidden' name='catid' value={catid?.toString()}></input>
<h4>Category ID : --- {catid?.toString()} has deleted!!!</h4>

    </form>
    </div>
  )

 
}


export default DeletePage;
