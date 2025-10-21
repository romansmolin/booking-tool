import { Contact2 } from 'lucide-react'

import React from 'react'

const Logo = () => {
    return (
        <div
            aria-label="Logo"
            className="flex size-10 items-center justify-center rounded-md bg-primary border border-primary text-white [&_svg]:size-4 "
        >
            <Contact2 />
        </div>
    )
}

export default Logo
