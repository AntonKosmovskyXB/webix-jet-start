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
				{view: "text", label: "Name", name: "Name", invalidMessage: "Field should not be empty"},
				{view: "text", label: "Email", name: "Email", invalidMessage: "Please, fill correct email address"},
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
						click: () => {
							const formValues = this.form.getValues();
							const formValidationResult = this.form.validate();
							const selectedItem = contacts.getItem(formValues.id);
							if (selectedItem && formValidationResult) {
								contacts.updateItem(selectedItem.id, formValues);
							}
						}
					},
					{ 
						view: "button", 
						value: "Clear",
						click: () => this.clearForm()
					},
					
				]},
				{}
			],
			rules:{
				Name: webix.rules.isNotEmpty,
				Email: function (value) {
					return value.includes("@") && webix.rules.isNotEmpty;
				},
			}
		};

		return form;
	}

	init() {
		this.form = this.$$("contactsForm");
	}

	urlChange() {
		const currentId = this.getParam("id");
		const currentItem = contacts.getItem(currentId);
		this.form.setValues(currentItem);
	}

	clearForm() {
		webix.confirm({
			text: "Do you want to clear this form?"
		}).then(() => {
			this.form.clear();
			this.form.clearValidation();
		}
		);
	}

	addItem() {

	}
}