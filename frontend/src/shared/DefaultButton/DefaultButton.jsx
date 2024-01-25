import './styles.css'
export default function DefaultButton({children, onClick, type}) {

   return (
       <>
            <button className='default-button' type={type} onClick={onClick}>{children}</button>
       </>
   )
}