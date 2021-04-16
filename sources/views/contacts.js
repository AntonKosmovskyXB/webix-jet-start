import {JetView} from "webix-jet";
import { contacts } from "../models/contacts";

export default class ContactsView  extends JetView{
	config() {
		const list = {
			view: "list",
			localId: "contactsList",
			data: contacts,
			template: "Name: #Name#, Email: #Email#",
			select: true
		};

		const form = {
			view: "form",
			localId: "contactsForm",
			elements: [
				{view: "text", label: "Name", name: "name"},
				{view: "text", label: "Email", name: "email"},
				{cols:[
					{ 
						view: "button", 
						value: "Save" , 
					},
					{ 
						view: "button", 
						value: "Clear",
						click: () => this.clearForm()
					},
				]},
				{}
			]
		};

		return { 
			cols:[list, form]
		};
	}

	init() {
		this.$$("contactsList").parse(contacts);
	}

	clearForm() {
		webix.confirm({
			text: "Do you want to clear this form?"
		}).then(() => {
			this.$$("contactsForm").clear();
		}
		);
	}
	
}
