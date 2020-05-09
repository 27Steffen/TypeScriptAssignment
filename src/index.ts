const keyEingabe : number = 13;

document.addEventListener("DOMContentLoaded", (): void => {
    const neuesTodoElement = document.querySelector<HTMLInputElement>(".newAufgabe");
	const aufgaListElement = document.querySelector<HTMLElement>(".taskList");
	const footerElement = document.querySelector<HTMLElement>(".footer");
	const alleswegElement = document.querySelector<HTMLElement>(".clearKomplett");

	function refresh() : void {
		if (aufgaListElement!.children.length === 0) {
			footerElement!.style.display = "none";
		} 
		else {
			footerElement!.style.display = "";
		}

		let kompletterZähler: number = aufgaListElement!.querySelectorAll("li.completed").length;

		if (kompletterZähler === 0) {
			alleswegElement!.style.display = "none";
		} 
		else (kompletterZähler !== 0); {
			alleswegElement!.style.display = "";
		}
	}
	refresh();
											                        
    const nehmeLizurück = (liElement) : void => { 	                
		const checkboxElement = liElement.querySelector(".toggle");
		const verstreichenButtonElement = liElement.querySelector(".zerstör");

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

		const neuerButtonElement = document.createElement("button") as HTMLButtonElement;
		neuerButtonElement.classList.add("zerstör");
			
			const neuesLabelElement = document.createElement("label") as HTMLLabelElement;
			neuesLabelElement.appendChild(document.createTextNode(neuesTodoElement!.value));

		const neueInputCheckbox = document.createElement("input") as HTMLInputElement;
		neueInputCheckbox.type = "checkbox";
		neueInputCheckbox.classList.add("toggle");

			const neuesDivElement = document.createElement("div") as HTMLDivElement;
			neuesDivElement.classList.add("view");

			neuesDivElement.appendChild(neueInputCheckbox);
			neuesDivElement.appendChild(neuesLabelElement);
			neuesDivElement.appendChild(neuerButtonElement);

		const neuesLiElement = document.createElement("li") as HTMLLIElement;
		neuesLiElement.appendChild(neuesDivElement);

		nehmeLizurück(neuesLiElement);

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