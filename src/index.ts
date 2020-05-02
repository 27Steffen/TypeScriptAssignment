const keyEingabe : number = 13;

document.addEventListener("DOMContentLoaded", (): void => {

    const neuesTodoElement = document.querySelector<HTMLInputElement>(".newAufgabe");
	const aufgaListElement = document.querySelector<HTMLElement>(".taskList");
	const footerElement = document.querySelector<HTMLElement>(".footer");
	const zählElement = document.querySelector<HTMLElement>(".todo-count strong");
	const alleswegElement = document.querySelector<HTMLElement>(".clearKomplett");

	const refresh = (): void  => {
		if (aufgaListElement!.children.length === 0) {
			footerElement!.style.display = "none";
		} 
		else {
			footerElement!.style.display = "";
		}
		
		
		/*let todoCounter = aufgaListElement!.querySelectorAll("li:not(.completed)").length;
        zählElement!.innerText = "todoCounter";	*/
       
        /*let todoCounter: number = 0
		for (const todoListItem of aufgaListElement!.children) {
			if (!todoListItem.classList.contains("completed")) {
				todoCounter++
			}
		}
*/
		let kompletterZähler: number = aufgaListElement!.querySelectorAll("li.completed").length;

		if (kompletterZähler === 0) {
			alleswegElement!.style.display = "none";
		} 
		else {
			alleswegElement!.style.display = "";
		}
	}
	refresh();
											                        //First, to make typescript tolerate parameters without declaring their type
    const addCallbacksForLi = (liElement) : void => { 	                // in tsconfig.json habe ich etas auf false gesetzt
		const checkboxElement = liElement.querySelector(".toggle");
		const verstreichenButtonElement = liElement.querySelector(".destroy");

		checkboxElement.addEventListener("change", () : void => {

			if (checkboxElement.checked) {
				liElement.classList.add("completed");
			} 
			else {
				liElement.classList.remove("completed");
			}

			refresh();
		})

		verstreichenButtonElement.addEventListener("click", (): void => {
			liElement.remove();

			refresh();
		})
	}


	neuesTodoElement!.addEventListener("keypress", (event :KeyboardEvent): void => {

		if (event.which === keyEingabe && neuesTodoElement!.value !== "") {

			const neuerButtonElement: HTMLButtonElement = document.createElement("button");
			neuerButtonElement.classList.add("destroy");
			
			const neuesLabelElement: HTMLLabelElement = document.createElement("label");
			neuesLabelElement.appendChild(

			document.createTextNode(neuesTodoElement!.value) 
			);

			const neueInputCheckbox: HTMLInputElement = document.createElement("input");
			neueInputCheckbox.type = "checkbox";
			neueInputCheckbox.classList.add("toggle");

			const neuesDivElement:  HTMLDivElement = document.createElement("div");
			neuesDivElement.classList.add("view");

			neuesDivElement.appendChild(neueInputCheckbox);
			neuesDivElement.appendChild(neuesLabelElement);
			neuesDivElement.appendChild(neuerButtonElement);

			const neuesLiElement:HTMLLIElement = document.createElement("li");
			neuesLiElement.appendChild(neuesDivElement);

			addCallbacksForLi(neuesLiElement);

			aufgaListElement!.prepend(neuesLiElement);

			neuesTodoElement!.value = "";

			refresh();
		}

	});

	alleswegElement!.addEventListener("click", (event: MouseEvent) => {

		const completeLiElements: NodeListOf<Element> = aufgaListElement!.querySelectorAll("li.completed");
		for(const komplettesLiElement of completeLiElements) {

			komplettesLiElement.remove();
		}

		refresh();
	})
}); 