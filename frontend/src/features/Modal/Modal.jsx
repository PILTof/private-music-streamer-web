import "./styles.css";
import { addDynCSS } from "../../processes/Listeners/Listeners";
export default function Modal({ display = false, children, closeFun }) {
    addDynCSS().dymensions("modal-dim", -240).width();
    addDynCSS()
        .dymensions("modal-dim", -window.innerHeight / 4)
        .height();
    return (
        <>
            {display && (
                <div onClick={() => closeFun(false)} className="modal-wrapp">
                    <div onClick={(ev) => ev.stopPropagation()} className="modal-inner">{children}</div>
                </div>
            )}
        </>
    );
}
