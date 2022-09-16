import { IconSearch } from '@tabler/icons';
import { useRef } from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useDebouncedValue } from '@mantine/hooks';
import style from '../styles/SpotlightSearchBar.module.css'

function SpotlightControl({setActive}) {
  return (
      <IconSearch onClick={()=>setActive(true)} style={{cursor:'pointer', marginRight:'1rem'}} />
  );
}

export default function SpotlightSearchBar() {
    const [active, setActive] = useState(false)
    const [value, setValue] = useState('');
    const [debounced] = useDebouncedValue(value, 1000);
    const ref = useRef()

    useEffect(()=>{
        console.log(debounced)
    },[debounced])

    useEffect(()=>{
        if(active){
            document.documentElement.style.overflow='hidden'
            document.documentElement.style.paddingRight='8px'
        }else{
            document.documentElement.style.overflow='auto'
            document.documentElement.style.paddingRight='0'
        }
    },[active])

    useEffect(()=>{
        /**
         * Alert if clicked on outside of element
         */
         function handleClickOutside(event) {
            if (ref.current && !ref.current.contains(event.target)) {
                setActive(false)
            }
        }
        // Bind the event listener
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            // Unbind the event listener on clean up
            document.removeEventListener("mousedown", handleClickOutside);
        };
    },[ref])

  return (
    <>
    <SpotlightControl setActive={setActive} />
    <div className={`${active && style.active} ${style.container}`}>
        <div ref={ref} className={style.wrapper}>
            <div className={style.search_box}>
                <IconSearch/>
                <input
                    type='text'
                    placeholder='Search...'
                    onChange={(e)=>setValue(e.target.value)}
                />
            </div>
            <div className={style.suggestion_box}>
                {
                    [1,2,3,4].map((post,i)=>(
                        <div className={style.suggestion_title} key={i}>
                            This is a simple post title
                        </div>
                    ))
                }
            </div>
        </div>
    </div>
    </>
  );
}