const { select, input, checkbox } = require("@inquirer/prompts")

let mensagem = "Bem vindo ao programa de tarefas!"
let tarefas = []

async function cadastrarTarefas(){
    const tarefa = await input({message: "Digite a tarefa: "})

    if(tarefa.length == 0) {
        mensagem = "A tarefa não pode ser vazia"
        return
    }

    tarefas.push(
        {name: tarefa, value: tarefa, checked: false})

    mensagem = "tarefa cadastrada com sucesso!"
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

    tarefas.forEach((t) => {
        t.checked = false
    })

    if (respostas.length == 0) {
        mensagem = "Nenhuma tarefa selecionada"
        return
    }


    respostas.forEach((resposta) => {
        const tarefa = tarefas.find((t) => {
            return t.value == resposta
        })

        if (tarefa) {
            tarefa.checked = true;
        }
    })

    mensagem = "Tarefa(s) marcadas como concluída(s)"
}

async function tarefasRealizadas(){
    const realizadas = tarefas.filter((tarefa) => {
        return tarefa.checked
    })

    if (realizadas.length == 0) {
        mensagem = "Não há tarefas realizadas"
        return
    }

    await select({
        message: "Tarefas realizadas " + realizadas.length,
        choices: [...realizadas]
    })
}

async function tarefasAbertas(){
    const abertas = tarefas.filter((tarefa) => {
        return !tarefa.checked
    })

    if (abertas.length == 0) {
        mensagem = "Não há tarefas abertas"
        return
    }

    await select({
        message: "Tarefas abertas " + abertas.length,
        choices: [...abertas]
    })
}

async function removerTarefas(){
    const tarefasDesmarcadas = tarefas.map((tarefa) => {
        return { value: tarefa.value, checked: false}
    })

    const itemsDeletar = await checkbox({
        message: "Selecione as tarefas que deseja remover:",
        choices: [...tarefasDesmarcadas],
        instructions: false,
    })
    if (itemsDeletar.length == 0) {
        mensagem = "Nenhum item para deletar"
        return
    }

    itemsDeletar.forEach((item) => {
        tarefas = tarefas.filter((tarefa) => {
            return tarefa.value != item
        })
    })

    mensagem = "Tarefa(s) deletada(s) com sucesso!"
}

function mostrarMensagem(){
    console.clear();

    if(mensagem != ""){
        console.log(mensagem)
        console.log("")
        mensagem = ""
    }

}

async function start(){

    while(true){
        mostrarMensagem()

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
                    name: "Tarefas abertas",
                    value: "Abertas"
                },
                {
                    name: "Remover tarefas",
                    value: "Remover"
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
                break
            case "Listar":
                await listarTarefas()
                break
            case "Realizadas":
                await tarefasRealizadas()
                break
            case "Abertas":
                await tarefasAbertas()
                break
            case "Remover":
                await removerTarefas()
                break
            case "Sair":
                console.log("Até a próxima")
                return
        }
    }
}

start()