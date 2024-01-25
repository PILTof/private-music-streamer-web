import "./styles.css";
import { Outlet } from "react-router-dom";

export default function DafaultLayout(props) {
    return (
        <div className="default-layout-wrapp">
            <Outlet></Outlet>
        </div>
    );
}
