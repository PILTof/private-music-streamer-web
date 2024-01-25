import './styles.css'
import LogoutButtonEntity from "../../entities/LogoutButtonEntity/LogoutButtonEntity";

export default function Header(props) {
   return (
       <>
            <div className="admin-header">
                <div>field</div>
                <div>field</div>
                <div>field</div>
                <div>
                    <LogoutButtonEntity></LogoutButtonEntity>
                </div>
            </div>
       </>
   )
}