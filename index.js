const { select, input, checkbox } = require("@inquirer/prompts")

let tarefas = []

async function cadastrarTarefas(){
    const tarefa = await input({message: "Digite a tarefa: "})

    if(tarefa.length == 0) {
        console.log("A tarefa não pode ser vazia")
        console.log(" ")
        return
    }

    tarefas.push(
        {name: tarefa, value: tarefa, checked: false})

}

async function listarTarefas(){
    if (tarefas.length == 0) {
        console.log("Não há tarefas")
        return
    }
    const respostas = await checkbox({
        message: "Selecione as tarefas que deseja marcar como concluídas:",
            choices: [...tarefas],
            instructions: false,
    })

    if (respostas.length == 0) {
        console.log("Nenhuma tarefa selecionada")
        return
    }

    tarefas.forEach((t) => {
        t.checked = false
    })

    respostas.forEach((resposta) => {
        const tarefa = tarefas.find((t) => {
            return t.value == resposta
        })

        if (tarefa) {
            tarefa.checked = true;
        }
    })

    console.log("Tarefa(s) marcadas como concluída(s)")
}

async function tarefasRealizadas(){
    const realizadas = tarefas.filter((tarefa) => {
        return tarefa.checked
    })

    if (realizadas.length == 0) {
        console.log("Não há tarefas realizadas")
        return
    }

    await select({
        message: "Tarefas realizadas",
        choices: [...realizadas]
    })
}

async function start(){

    while(true){

        const opcao = await select({
            message: "--------Menu--------",
            choices: [{
                    name: "Cadastra tarefa",
                    value: "Cadastrar"
                },
                {
                    name: "Lista tarefas",
                    value: "Listar"
                },
                {
                    name: "Tarefas realizadas",
                    value: "Realizadas"
                },
                {
                    name: "Sair",
                    value: "Sair"
                }
            ],
        })

        switch(opcao){
            case "Cadastrar":
                await cadastrarTarefas()
                console.log(tarefas)
                break
            case "Listar":
                await listarTarefas()
                break
            case "Realizadas":
                await tarefasRealizadas()
                break
            case "Sair":
                console.log("Até a próxima")
                return
        }
    }
}

start()