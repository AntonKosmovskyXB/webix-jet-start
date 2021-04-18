import {JetView} from "webix-jet";
import { contacts } from "../models/contacts.js";
import { countries } from "../models/countries.js";
import { statuses } from "../models/statuses.js";

export default class Form extends JetView {
	config() {
		const form = {
			view: "form",
			localId: "contactsForm",
			elements: [
				{view: "text", label: "Name", name: "Name"},
				{view: "text", label: "Email", name: "Email"},
				{rows:[
					{ 
						view: "combo", 
						label: "Country", 
						name: "Country", 
						margin: 100,
						options: { body: {template:"#Name#"}, data: countries }, 
						invalidMessage: "Choose the country!" },
					{ 
						view: "combo", 
						label: "Status", 
						name: "Status", 
						margin: 200,
						options: { body: {template:"#Name#"}, data: statuses }, 
						invalidMessage: "Choose the status!" },
				]},
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

		return form;
	}

	init(url) {
		this.contactsCollection = new webix.DataCollection({
			data: contacts
		})
		this.form = this.$$("contactsForm");
	}

	clearForm() {
		webix.confirm({
			text: "Do you want to clear this form?"
		}).then(() => {
			this.$$("contactsForm").clear();
		}
		);
	}

	urlChange() {
		const currentId = this.getParam("id");
		const currentItem = this.contactsCollection.getItem(currentId);
		this.form.setValues(currentItem);
	}
}