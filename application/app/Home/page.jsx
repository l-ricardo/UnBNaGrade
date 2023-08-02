import Header from "../../components/Header"; // Contem o titulo da pagina
import Form from "../../components/Form"; // Contem o formulario onde entraram as opções de disciplinas a se inscrever
import Resume from "../../components/Resume"; // Contem o bloco de resumo com todas as discplinas e turmas disponiveis
import Agenda from "../../components/Agenda"; // Contem o bloco da agenda com os dias da semana


export default function Home() {
    return (
        <div>
            <Header />
            <Form />
            <Resume />
            <Agenda />
        </div>
    )
}
