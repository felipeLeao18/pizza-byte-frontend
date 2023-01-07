import styles from './styles.module.scss'
import { ReactNode, ButtonHTMLAttributes } from 'react'

import { FaSpinner } from 'react-icons/fa'
interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean
  children: ReactNode
}
export function Button ({ loading, children, ...rest }: IButtonProps) {
  return (
    <button
    className={styles.button}
    disabled={loading}
    {...rest}
    >
      {
      (loading === true)
        ? (<FaSpinner color="#FFF" size={16}/>)
        : (

      <a className={styles.buttonText}>
        {children}
      </a>
          )}
    </button>

  )
}
