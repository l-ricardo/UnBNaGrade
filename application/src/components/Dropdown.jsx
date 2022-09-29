// import { useState } from "react"
import Select from "react-select"
import makeAnimated from "react-select/animated"

// --------------------------------------------------
// TODO: Tabela com proposito de testes

const opcoes = [
    { value: 'fga1234', label: 'Algoritimos' },
    { value: 'fga0129', label: 'Calculo' },
    { value: 'fga1492', label: 'Desenho Tecnico' },
    { value: 'fga1924', label: 'Fisica' },
    { value: 'fga1254', label: 'MecSol' },
    { value: 'fga5892', label: 'Algebra' }
  ]

// --------------------------------------------------

export default function CaixaSelecao(){
    return (
        <Select
        components={makeAnimated()} // TODO: Esta causando um bug visual no primeiro item selecionado
        options={opcoes}
        isMulti
        closeMenuOnSelect={false}
        closeMenuOnScroll={true} // TODO: Checar se isso tem um usabilidade massa ou so é irritante
        onChange={(item)=> localStorage.setItem('selecionados', JSON.stringify(item))} // Salva itens selecionados no localStorage
        />
    )
}


