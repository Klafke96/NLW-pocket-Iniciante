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
        {value: tarefa, checked: false})

}

async function listarTarefas(){
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

        tarefa.checked = true
    })

        console.log("Tarefa(s) marcadas como concluída(s)")
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
                    name: "Lista metas",
                    value: "Listar"
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
            case "Sair":
                console.log("Até a próxima")
                return
        }
    }
}

start()