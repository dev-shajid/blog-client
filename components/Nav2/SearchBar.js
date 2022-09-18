import { Box } from '@mui/material'
import React, {useEffect, useRef, useState} from 'react';
import { Search } from '@mui/icons-material';
import { Stack } from '@mui/system';

const SearchBar = ({ openSearch, setOpenSearch }) => {
    const ref = useRef(null)

    useEffect(() => {
        /**
         * Alert if clicked on outside of element
         */
        function handleClickOutside(event) {
            if (ref.current && !ref.current.contains(event.target)) {
                setOpenSearch(false)
            }
        }
        // Bind the event listener
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            // Unbind the event listener on clean up
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [ref])

    return (
        <Box sx={{background:'#322d571f'}} className={`a fixed top-0 left-0 w-full h-[100vh] backdrop-blur-md z-50 ${openSearch ? 'visible opacity-100' : 'hidden opacity-0'}`}>
            <Box className='p-4'>
            <Box bgcolor={'background.default'} ref={ref} className={` max-w-[700px] w-full rounded-lg m-auto ${openSearch?'mt-[80px]':'mt-[200px]'}`}>
                <form className='w-full text-xl'>
                    <Stack direction='row'
                        className='w-full relative'
                    >
                        <Search
                         className='text-gray-700 text-2xl absolute top-[53%] left-[1rem] transform translate-y-[-50%]' />
                        <input
                            placeholder='Search...'
                            type="text"
                            className='p-4 pl-12 outline-none w-full bg-transparent px-[10px] placeholder:text-gray-700'
                        />
                    </Stack>
                </form>
                <Box className='max-h-[400px] h-full'>

                </Box>
            </Box>
            </Box>
        </Box>
    )
}

export default SearchBar