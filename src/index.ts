const keyEingabe = 13;



document.addEventListener("DOMContentLoaded", () => {

	const NeuesTodoElement = document.querySelector<HTMLInputElement>(".newAufgabe");
	const AufgaListElement = document.querySelector(".taskList");
	const footerElement = document.querySelector<HTMLElement>(".footer");
	const ZählElement  = document.querySelector<HTMLElement>(".todo-count strong");
	const alleswegElement = document.querySelector<HTMLElement>(".clearKomplett");

	const refresh = () => {
		if (AufgaListElement!.children.length === 0) {
			footerElement!.style.display = "none";
		} 
		else {
			footerElement!.style.display = "";
		}
		
		
		let todoCounter = AufgaListElement!.querySelectorAll("li:not(.completed)").length;
		ZählElement!.innerText = "todoCounter";	//!!!

		let kompletterZähler = AufgaListElement!.querySelectorAll("li.completed").length;

		if (kompletterZähler === 0) {
			alleswegElement!.style.display = "none";
		} 
		else {
			alleswegElement!.style.display = "";
		}
	}
	refresh();
											//First, to make typescript tolerate parameters without declaring their type
	const addCallbacksForLi = (liElement) => { 	// in tsconfig.json habe ich etas auf false gesetzt
		const checkboxElement = liElement.querySelector(".toggle");
		const verstreichenButtonElement = liElement.querySelector(".destroy");

		checkboxElement.addEventListener("change", () => {

			if (checkboxElement.checked) {
				liElement.classList.add("completed");
			} 
			else {
				liElement.classList.remove("completed");
			}

			refresh();
		})

		verstreichenButtonElement.addEventListener("click", () => {
			liElement.remove();

			refresh();
		})
	}


	NeuesTodoElement!.addEventListener("keypress", (event :KeyboardEvent) => {

		if (event.which === keyEingabe && NeuesTodoElement!.value !== "") {

			const neuerButtonElement = document.createElement("button");
			neuerButtonElement.classList.add("destroy");
			
			const neuesLabelElement = document.createElement("label");
			neuesLabelElement.appendChild(

			document.createTextNode(NeuesTodoElement!.value) 
			);

			const neueInputCheckbox = document.createElement("input");
			neueInputCheckbox.type = "checkbox";
			neueInputCheckbox.classList.add("toggle");

			const neuesDivElement = document.createElement("div");
			neuesDivElement.classList.add("view");

			neuesDivElement.appendChild(neueInputCheckbox);
			neuesDivElement.appendChild(neuesLabelElement);
			neuesDivElement.appendChild(neuerButtonElement);

			const neuesLiElement = document.createElement("li");
			neuesLiElement.appendChild(neuesDivElement);

			addCallbacksForLi(neuesLiElement);

			AufgaListElement!.prepend(neuesLiElement);

			NeuesTodoElement!.value = "";

			refresh();
		}

	});

	alleswegElement!.addEventListener("click", (event: MouseEvent) => {

		const completeLiElements = AufgaListElement!.querySelectorAll("li.completed");
		for(const komplettesLiElement of completeLiElements) {

			komplettesLiElement.remove();
		}

		refresh();
	})
}); 