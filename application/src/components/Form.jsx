import styles from "../styles/Form.module.css";
import CaixaSelecao from "./Dropdown";


export default function Form(){
    return (
        <div className={styles.caixote}>
            <label> Selecione as disciplinas que pretende se matricular (Dica: Você pode digitar) </label>
            <CaixaSelecao/>
        </div>
    )
}
