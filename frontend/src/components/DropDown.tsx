import React from 'react'

interface Props{
  value : number,
  title: string,
  id : string,
  children:React.ReactNode
  onChange : (e:any)=>void,
  disabled?:boolean
}



const DropDown : React.FC<Props> = (props) => {
  return (
    <div>
      <label className='' >{props.title}</label>
      <select value={props.value} onChange={props.onChange} id={props.id} className='disabled:opacity-60 bg-transparent focus:outline-none w-24 borde-2 text-center border-black rounded-md ' disabled={props.disabled}>{props.children}</select>
    </div>
  )
}

export default React.memo(DropDown)