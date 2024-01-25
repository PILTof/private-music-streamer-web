import './styles.css'
import { Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

export default function ErrorPlash({children}) {
    return (<><div className='error-plash-wrapp'>{children}</div></>);
}
