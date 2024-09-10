function start(){

    console.log("-----------------MENU----------------")
    console.log("1 - Cadastrar")
    console.log("2 - Listar")
    console.log("3 - Sair")
    console.log("------------------------------------")
    console.log(" ")

    while(true){
        let opcao = "cadastrar"
        switch(opcao){
            case "cadastrar":
                console.log("vamos cadastrar")
                break
            case "listar":
                break
            case "sair":
                return
        }
    }
}

start()