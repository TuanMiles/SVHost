import { SunIcon } from '~/components'
import { useColorMode } from '~/hooks'
import { setTheme } from '~/store/slices/Theme/theme.slice'
import { useAppDispatch } from '~/store/store'

const DarkModeSwitcher = () => {
  const [colorMode, setColorMode] = useColorMode()
  const dispatch = useAppDispatch()
  return (
    <li>
      <label
        className={`relative m-0 block h-7.5 w-14 rounded-full ${colorMode === 'dark' ? 'bg-primary' : 'bg-stroke'}`}
      >
        <input
          type='checkbox'
          onChange={() => {
            if (typeof setColorMode === 'function') {
              setColorMode(colorMode === 'light' ? 'dark' : 'light')
              dispatch(setTheme(colorMode === 'light' ? 'dark' : 'light'))
            }
          }}
          className='dur absolute top-0 z-50 w-full h-full m-0 opacity-0 cursor-pointer'
        />
        <span
          className={`absolute top-1/2 left-[3px] flex h-6 w-6 -translate-y-1/2 translate-x-0 items-center justify-center rounded-full bg-white shadow-switcher duration-75 ease-linear ${
            colorMode === 'dark' && '!right-[3px] !translate-x-full'
          }`}
        >
          <span className='dark:hidden'>
            <SunIcon />
          </span>
          <span className='dark:inline-block hidden'>
            <svg width='16' height='16' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'>
              <path
                d='M14.3533 10.62C14.2466 10.44 13.9466 10.16 13.1999 10.2933C12.7866 10.3667 12.3666 10.4 11.9466 10.38C10.3933 10.3133 8.98659 9.6 8.00659 8.5C7.13993 7.53333 6.60659 6.27333 6.59993 4.91333C6.59993 4.15333 6.74659 3.42 7.04659 2.72666C7.33993 2.05333 7.13326 1.7 6.98659 1.55333C6.83326 1.4 6.47326 1.18666 5.76659 1.48C3.03993 2.62666 1.35326 5.36 1.55326 8.28666C1.75326 11.04 3.68659 13.3933 6.24659 14.28C6.85993 14.4933 7.50659 14.62 8.17326 14.6467C8.27993 14.6533 8.38659 14.66 8.49326 14.66C10.7266 14.66 12.8199 13.6067 14.1399 11.8133C14.5866 11.1933 14.4666 10.8 14.3533 10.62Z'
                fill='#969AA1'
              />
            </svg>
          </span>
        </span>
      </label>
    </li>
  )
}

export default DarkModeSwitcher
