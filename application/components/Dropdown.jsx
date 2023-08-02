// import Select from "react-select"
// import makeAnimated from "react-select/animated"
// import disciplinas from '../../public/data/disciplinas.json';

export default function CaixaSelecao() {
    return (
        <p>select</p>
        // <Select
        //     // defaultValue={} // TODO: Sicronizar valores default com o local storage para evitar que quando a pagina for recarregada o dropdown esta vazio mas o resto da pagina ainda tem conteudo. (Bug menor)
        //     components={makeAnimated()} // TODO: Esta causando um bug visual no primeiro item selecionado
        //     options={disciplinas}
        //     isMulti
        //     closeMenuOnSelect={false}
        //     closeMenuOnScroll={true} // TODO: Checar se isso tem um usabilidade massa ou so é irritante
        //     onChange={(item)=> localStorage.setItem('selecionados', JSON.stringify(item))} // Salva itens selecionados no localStorage
        // />
    )
}
