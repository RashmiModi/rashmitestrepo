import React from 'react'
import Link  from 'next/link'
import { Pencil } from 'lucide-react'
import { Trash } from 'lucide-react'
import { getCategory } from '@/app/productcategory/db'
export const ButtonAction = () => {
  return (
    <div>

<Link href='/edit/'className='btn btn-primary btn-sm ms-100 mr-2'> <Pencil/>Edit</Link>
<Link href='#' className="btn btn-error"><Trash/>Delete</Link>

    </div>
  )
}
