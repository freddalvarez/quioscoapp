import React from 'react'
import Image from 'next/image'
import useQuiosco from '../hooks/useQuiosco'
import Categoria from './Categoria'

const Sidebar = () => {
    const {categorias} = useQuiosco()
return (
    <>
        <Image className='ml-10 mt-5' width={200} height={100} src='/assets/img/logo.svg' alt='logo' />

        <nav className='mt-10'>
            {categorias.map(categoria => (
                <Categoria key={categoria.id} categoria={categoria} />
            ))}
        </nav>
    </>
)
}

export default Sidebar