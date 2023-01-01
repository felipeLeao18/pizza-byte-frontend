import styles from './styles.module.scss'
import { InputHTMLAttributes, TextareaHTMLAttributes } from 'react'

type IInputProps = InputHTMLAttributes<HTMLInputElement>

type ITextAreaProps = TextareaHTMLAttributes<HTMLTextAreaElement>

export function Input ({...rest}: IInputProps){
  return (
    <input className={styles.input} {...rest}/>
  )
}

export function TextArea({...rest}: ITextAreaProps){
  return (
    <textarea className={styles.input} {...rest}></textarea>
  )
}
