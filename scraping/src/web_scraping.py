# Importando bibliotecas utilizadas
import requests
from time import sleep
from bs4 import BeautifulSoup
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.edge.options import Options
import pandas as pd
# import json


# Configurando o navegador
opcoes_navegador = Options()
# opcoes_navegador.add_argument('--headless')
opcoes_navegador.add_argument('window-size=400,800')


# Url do sigaa
url = 'https://sigaa.unb.br/sigaa/public/turmas/listar.jsf'


# Pegando dados do site
resposta = requests.get(url)
site = BeautifulSoup(resposta.content, 'html.parser')


# Encontrando departamentos no dropdown de ""Unidade""
dropdown_departamentos = site.find('select', attrs = {'id': 'formTurma:inputDepto'})
lista_departamentos = []


# Criando lista dos departamentos possiveis
for departamento in dropdown_departamentos:
    if departamento != '\n':
        lista_departamentos.append(departamento.text)
lista_departamentos = lista_departamentos[2:]


# Usando selenium para abrir o navegador
navegador = webdriver.Edge(options = opcoes_navegador) # ! Solução do erro vem aqui
navegador.get(url)


# Inicializando variaveis
pre_dataframe = []


# Faz uma repetição pra cada departamento pegando a tabela e processando para cada departamento
for departamento in lista_departamentos:

    # Usando selenium para abrir a lista de departamentos e selecionando 1
    elemento_dropdown = navegador.find_element(By.ID, 'formTurma:inputDepto') # Encontra dropdown
    # ! Descobrir o que são esses erros: possivel solucao resource_path="C:\Users\lrsj2\Desktop\UnBNaGrade\msedgedriver.exe"
    # ! DevTools listening on ws://127.0.0.1:54927/devtools/browser/139880ff-e5d0-4a1b-bc9c-07a6db30a5c2
    # ! [14864:8596:0924/145232.747:ERROR:device_event_log_impl.cc(214)] [14:52:32.747] USB: usb_device_handle_win.cc:1048 Failed to read descriptor from node connection: Um dispositivo conectado ao sistema nÒo estß funcionando. (0x1F)
    # ! [14864:8596:0924/145232.750:ERROR:device_event_log_impl.cc(214)] [14:52:32.751] USB: usb_device_handle_win.cc:1048 Failed to read descriptor from node connection: Um dispositivo conectado ao sistema nÒo estß funcionando. (0x1F)
    elemento_dropdown.send_keys(departamento)
    sleep(0.5)


    # Usando selenium para apertar o botao de buscar
    elemento_buscar = navegador.find_element(By.NAME, 'formTurma:j_id_jsp_1370969402_11') # Encontra botao # TODO verificar se esse parametro feiao nao vai causar probelmas por ser aparentemente gerado automaticamente por JS
    elemento_buscar.click()
    sleep(1)


    # Agora que abrimos a pagina correta com um dos departamentos pegamos a tabela com dados referentes
    pagina_certa = BeautifulSoup(navegador.page_source, 'html.parser')
    tabela_turmas = pagina_certa.find('table', attrs = {'class': 'listagem'})


    # Caso o departamento nao ofereça nenhuma materia ele pula para o proximo loop
    if tabela_turmas == None:
        continue


    # Pegando uma lista com as linhas da tabela e removendo as inuteis
    linhas_tabela = tabela_turmas.find_all('tr')
    linhas_tabela.pop(0)
    linhas_tabela.pop(-1)


    # Inicializando variaveis
    # pre_dataframe = [] #! VER SE EU POSSO DELETAR ISSO JA QUE ESTOU INICIALIZANDO A VARIAVEL LA EM CIMA AGR
    codigo_do_componente = ''
    nome_do_componente = ''
    link_do_componente = '' # TODO: fazer depois ja que vai dar uma trabalheira conseguir o link ja que ele esta sendo gerado automaticamente por javascript


    # Onde a porca torce o rabo, a vaca vai pro brejo e a coisa fica complicada
    for linha in linhas_tabela:
        
        # Pega as informacoes (codigo, nome e link) de cada Grupo/componente (as linhas azul no meio da tabela) e faz ele se repetir pra cada linha
        if linha.find('span', attrs = {'class': 'tituloDisciplina'})!= None:
            grupo = linha.find('span', attrs = {'class': 'tituloDisciplina'}).text
            codigo_do_componente, nome_do_componente = grupo.split(' - ', 1)
            # link_do_componente = linha.find('a', attrs = {'colspan': '8'})
            # print(linha.find('a', attrs = {'title': 'Visualizar Detalhes do Componente Curricular'}))
            # print('--------------------------------------------------')
            # TODO da linha 87
            continue
        
        # Inicializando variaveis e limpando depois de cada loop
        local_da_aula = ''
        docente = ''
        horario = ''
        carga_horaria = ''
        tamanho_da_turma = ''
        
        # Pegando informacoes sobre o nome do docente e a carga horaria de determinada turma
        if linha.find('td', attrs = {'class': 'nome'}):
            docente_hora = (linha.find('td', attrs = {'class': 'nome'}).text)
            docente, carga_horaria = docente_hora.split(' (', 1)
            carga_horaria = carga_horaria.replace(')', '')
        
        # Pegando informacoes sobre o horario da aula de determinada turma
        if linha.find('div', attrs = {'class': 'popUp'}):
            horario = ((linha.find('div', attrs = {'class': 'popUp'})).text)
            horario = horario.replace('\n','')
            horario = horario.replace('\t','')
            # TODO separar os horarios quando tem mais de 1 dia
        
        # Pegando informacoes sobre o local da aula de determinada turma
        if linha.find('td', attrs = {'nowrap': 'nowrap'}):
            local_da_aula = (linha.find('td', attrs = {'nowrap': 'nowrap'}).text)
        
        # Pegando informacoes sobre o quantas vagas tem determinada turma
        if linha.find('td', attrs = {'style': 'text-align: center;'}):
            tamanho_da_turma = (linha.find('td', attrs = {'style': 'text-align: center;'}).text)

        # Cria lista com todas as variveis na ordem que entrarao no dataframe
        pre_dataframe.append([codigo_do_componente, nome_do_componente, link_do_componente, docente, horario, local_da_aula, carga_horaria, tamanho_da_turma])
    

# Criando dataframe
cabecalho_dataframe = ['Código do componente', 'Nome do componente', 'Link do componente', 'Docente', 'Horário', 'Local da aula', 'Carga horária', 'Tamanho da turma']
tabelinha = pd.DataFrame(pre_dataframe, columns = cabecalho_dataframe)


# Salvando dataframe
tabelinha.to_csv('application/data/tabelinha.csv')


# ! ERROS QUE APARECEM NO TERMINAL E EU NAO SEI O QUE SAO... AINDA
# ! [10412:5184:0924/205120.047:ERROR:device_event_log_impl.cc(214)] [20:51:20.047] USB: usb_device_handle_win.cc:1048 Failed to read descriptor from node connection: Um dispositivo conectado ao sistema nÒo estß funcionando. (0x1F)
# ! [10412:16748:0924/205216.783:ERROR:util.cc(135)] Can't create base directory: C:\Program Files\Microsoft\EdgeUpdater
# ! [17592:14936:0924/205317.779:ERROR:gpu_init.cc(500)] Passthrough is not supported, GL is disabled, ANGLE is