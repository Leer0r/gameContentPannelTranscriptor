interface pannelTranscriptorContructor {
    htmlClassList: string
}

type confType = "checkBox" | "text" | "button"

interface arg{
    name:string,
    value:string
}

interface commandOption {
    path:string,
    args:Array<arg>
}

interface gameConfigurationOptions{
    name:string,
    type:confType,
    options:commandOption,
}

interface gameConfigurationPannel{
    name:string
    confOptions:Array<gameConfigurationOptions>
}

interface gameRequirement{
    requirementName:string,
    cpu:string,
    ram:string,
    diskSpace:string,
}

interface gameInterface{
    gameName:string,
    gameRouter:string,
    gameDescription:string,
    confPannel:Array<gameConfigurationPannel>,
    gameRequirements: Array<gameRequirement>
}



const fetchLocation = "http://localhost:3001/game/0"

class pannelTranscriptor {
    htmlLink:HTMLDivElement
    gameDescription: gameInterface
    gamePannel : Array<gameConfigurationPannel>
    contentStorage:Array<HTMLDivElement[]>
    constructor(props:pannelTranscriptorContructor) {
        this.htmlLink = document.querySelector(`${props.htmlClassList}`);
        this.contentStorage = []
        this.start();
    }

    async getGameInterface():Promise<void> {
        const result = await fetch(fetchLocation);
        const gameDescription = await result.json();
        this.gameDescription = gameDescription.data.response
        this.gamePannel = this.gameDescription.confPannel
    }

    buildPannel() {
        const pannelNames:HTMLDivElement = <HTMLDivElement>this.htmlLink.children[0];
        for(let i = 0; i < this.gamePannel.length; i ++){
            let pannel:HTMLDivElement[] = []
            let newName:HTMLDivElement = document.createElement("div");
            newName.classList.add("pannelName")
            newName.innerHTML = this.gamePannel[i].name
            pannelNames.appendChild(newName);
            
            for(let j = 0; j < this.gamePannel[i].confOptions.length; j ++){
                let optionContainer:HTMLDivElement = document.createElement("div")
                optionContainer.classList.add("content")

                let optionName:HTMLDivElement = document.createElement("div")
                optionName.classList.add("optionName")
                optionName.innerHTML = this.gamePannel[i].confOptions[j].name 
                optionContainer.appendChild(optionName);

                let optionContent:HTMLDivElement = document.createElement("div");
                let optionInput: HTMLElement
                switch (this.gamePannel[i].confOptions[j].type) {
                    case "checkBox":
                        optionInput = document.createElement("input");
                        optionInput.setAttribute("type" , "checkbox");
                        break;
                    case 'button':
                        optionInput = document.createElement("button");
                        break;
                    case 'text':
                        optionInput = document.createElement("textarea");
                        break;
                    default:
                        break;
                }
                optionContent.appendChild(optionInput)
                optionContent.classList.add("optionContent")
                optionContainer.appendChild(optionContent)
                console.log(optionContainer)

                pannel.push(optionContainer)
            }
            console.log(pannel)
            this.contentStorage.push(pannel)

        }
    }

    displayPannel(pannelNb:number){
        const pannelContent:HTMLDivElement = <HTMLDivElement>this.htmlLink.children[1];
        pannelContent.innerHTML = ""
        for(let i in this.contentStorage[pannelNb]){
            pannelContent.appendChild(this.contentStorage[pannelNb][i])
        }
    }

    async start(){
        await this.getGameInterface();
        this.buildPannel()
        this.displayPannel(0)
        console.log(this.contentStorage)
    }
}

const pannel = new pannelTranscriptor({
    htmlClassList: ".pannelContainer"
})