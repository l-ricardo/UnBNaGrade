import styles from "../styles/Resume.module.css";


export default function Resume(){
    return (
        <div className={styles.caixote}>
            <h1>Resume</h1>
            <p >Contem o bloco de resumo com todas as discplinas e turmas disponiveis</p>
            <table className={styles.tabelinha} >
                <thead>
                    <tr>
                        <th className={styles.cabecalho} width={60}>Docente</th>
                        <th className={styles.cabecalho} width={10}>Horario</th>
                        <th className={styles.cabecalho} width={10}>Local</th>
                        <th className={styles.cabecalho} width={20}>WIP botoes</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th className={styles.linha} width={60}>jao exemplo</th>
                        <th className={styles.linha} width={10}>3 da tarde</th>
                        <th className={styles.linha} width={10}>numa sala ae</th>
                        <th className={styles.linha} width={20}>WIP botoes</th>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}
