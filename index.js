const { select, input } = require('@inquirer/prompts')

let tarefas = {
    value: 'Ir na academia',
    checked: false,
}

async function cadastrarTarefa(){
    const tarefa = await input({message: "Digite a tarefa: "})

    if(tarefa.length == 0) {
        console.log("A tarefa não pode ser vazia")
        console.log(" ")
        return
    }

    tarefas.push(
        {value: tarefa, checked: false})

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
            ]
        })

        switch(opcao){
            case "Cadastrar":
                await cadastrarTarefa()
                console.log(tarefas)
                break
            case "Listar":
                console.log("Vamos listar")
                break
            case "Sair":
                console.log("Até a próxima")
                return
        }
    }
}

start()