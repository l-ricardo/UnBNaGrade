import { useEffect, useState } from "react"
import useLocalStorageState from "use-local-storage-state"

export function useData() {
    // Estados
    const [courses, setCourses] = useLocalStorageState("courses", { defaultValue: [] })
    const [schedule, setSchedule] = useLocalStorageState("schedule", { defaultValue: [] })
    const [shouldRenderSaturday, setShouldRenderSaturday] = useState(true)

    const testCourses = {
        FGA0150: {
            name: "PROJETO INTEGRADOR DE ENGENHARIA 1",
            code: "FGA0150",
            availableClasses: [
                {
                    classNum: "T1",
                    teacher: "JULIANA PETROCCHI RODRIGUES",
                    time: "Segunda-feira 16:00 às 17:50 Quarta-feira 16:00 às 17:50",
                    location: "FGA - SALA S2",
                    workload: "60h",
                    classSize: 35,
                    color: "#72a",
                },
                {
                    classNum: "T2",
                    teacher: "DIOGO CAETANO GARCIA",
                    time: "Segunda-feira 16:00 às 17:50 Quarta-feira 16:00 às 17:50",
                    location: "FGA - SALA S2 E S6",
                    workload: "60h",
                    classSize: 35,
                    color: "#11f",
                },
                {
                    classNum: "T3",
                    teacher: "EVANDRO LEONARDO SILVA TEIXEIRA",
                    time: "Segunda-feira 16:00 às 17:50 Quarta-feira 16:00 às 17:50",
                    location: "FGA - SALA S2 E I4",
                    workload: "60h",
                    classSize: 35,
                    color: "#f2f",
                },
                {
                    classNum: "T4",
                    teacher: "RICARDO AJAX DIAS KOSLOSKI",
                    time: "Segunda-feira 16:00 às 17:50 Quarta-feira 16:00 às 17:50",
                    location: "FGA - SALA S2",
                    workload: "60h",
                    classSize: 45,
                    color: "#931",
                },
                {
                    classNum: "T5",
                    teacher: "BRUNO LUIZ PEREIRA",
                    time: "Segunda-feira 16:00 às 17:50 Quarta-feira 16:00 às 17:50",
                    location: "FGA S2 e S6",
                    workload: "60h",
                    classSize: 60,
                    color: "#ff4",
                },
            ],
        },
    }

    // Header: ["Horário", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"],
    const testSchedule = {
        M1: {
            Seg: [{ course: "Teste", teacher: "Testador", color: "#eaf748" }],
            Ter: [],
            Qua: [],
            Qui: [],
            Sex: [],
            Sáb: [],
        },
        M2: { Seg: [], Ter: [], Qua: [], Qui: [], Sex: [], Sáb: [] },
        M3: { Seg: [], Ter: [], Qua: [], Qui: [], Sex: [], Sáb: [] },
        M4: { Seg: [], Ter: [], Qua: [], Qui: [], Sex: [], Sáb: [] },
        M5: { Seg: [], Ter: [], Qua: [], Qui: [], Sex: [], Sáb: [] },
        T1: { Seg: [], Ter: [], Qua: [], Qui: [], Sex: [], Sáb: [] },
        T2: { Seg: [], Ter: [], Qua: [], Qui: [], Sex: [], Sáb: [] },
        T3: { Seg: [], Ter: [], Qua: [], Qui: [], Sex: [], Sáb: [] },
        T4: { Seg: [], Ter: [], Qua: [], Qui: [], Sex: [], Sáb: [] },
        T5: { Seg: [], Ter: [], Qua: [], Qui: [], Sex: [], Sáb: [] },
        N1: { Seg: [], Ter: [], Qua: [], Qui: [], Sex: [], Sáb: [] },
        N2: { Seg: [], Ter: [], Qua: [], Qui: [], Sex: [], Sáb: [] },
        N3: { Seg: [], Ter: [], Qua: [], Qui: [], Sex: [], Sáb: [] },
        N4: { Seg: [], Ter: [], Qua: [], Qui: [], Sex: [], Sáb: [] },
        N5: { Seg: [], Ter: [], Qua: [], Qui: [], Sex: [], Sáb: [] },
    }

    useEffect(() => {
        // WARN! Provisorito para testar
        setSchedule(testSchedule)
        setCourses(testCourses)
        // WARN!

        // Checa se sabado existe aula sabado
        // Todo: fazer um filter checando de alguns dos cursos atualmente armazenados no local storage tem sabado como dia de aula, se sim fazer:
        // setShouldRenderSaturday(true)
    }, [])

    // Funcao que limpa os dados do app
    const clearData = () => {
        setCourses([])
        setSchedule([])
    }

    return { courses, schedule, setCourses, setSchedule, clearData, shouldRenderSaturday }
}
