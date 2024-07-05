import styles from './Loader.module.scss'
import { pause } from '../../utils/pause'
import { useState } from 'react'

const Loader = () => {
  const [isLoading, setIsLoading] = useState(true)
  pause(2000).then(() => setIsLoading(false))
  return (
    <div
      className={`${styles.preloader} ${
        !isLoading ? 'opacity-0 pointer-events-none ' : 'opacity-100'
      } transition-opacity duration-700`}
    >
      {/* <div className={styles.wrapLoading}>
        <div className={styles.loader}>Loading...</div>
      </div> */}
      <div className={`${styles.wrapLoading2} select-none`}>
        <img className={`w-[250px] max-w-[250px] ${styles.loader}`} src='/logo_removebg.png' alt='cc' />
      </div>
    </div>
  )
}

export default Loader
