import styles from "../styles/Form.module.css";

export default function Form(){
    return (
    <div className={styles.caixote}>
        <label>Insira o codigo de uma diciplina que deseja adicionar</label>
        <input type="text" />
    </div>
    )
}
