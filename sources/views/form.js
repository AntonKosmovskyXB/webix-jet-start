import {JetView} from "webix-jet";
import { contacts } from "../models/contacts.js";
import { countries } from "../models/countries.js";
import { statuses } from "../models/statuses.js";

export default class Form extends JetView {
	config() {
		const _ = this.app.getService("locale")._;
		const form = {
			view: "form",
			localId: "contactsForm",
			elements: [
				{view: "text", label: _("Name"), name: "Name", invalidMessage: "Field should not be empty"},
				{view: "text", label: _("Email"), name: "Email", invalidMessage: "Please, fill correct email address"},
				{rows:[
					{ 
						view: "combo", 
						label: _("Country"), 
						name: "Country", 
						margin: 100,
						options: { body: {template:"#Name#"}, data: countries }, 
						invalidMessage: "Field should not be empty" },
					{ 
						view: "combo", 
						label: _("Status"), 
						name: "Status", 
						margin: 200,
						options: { body: {template:"#Name#"}, data: statuses }, 
						invalidMessage: "Field should not be empty" },
				]},
				{cols:[
					{ 
						view: "button", 
						value: _("Save") , 
						click: () => {
							const formValidationResult = this.form.validate();
							const selectedItem = this.getParam("id");

							if (!formValidationResult || !selectedItem) {
								return;
							}

							const formValues = this.form.getValues();
							contacts.updateItem(selectedItem, formValues);
						}
					},
					{ 
						view: "button", 
						value: _("Clear"),
						click: () => this.clearForm()
					},
					
				]},
				{}
			],
			rules:{
				Name: webix.rules.isNotEmpty,
				Email: webix.rules.isEmail,
				Country: webix.rules.isNotEmpty,
				Status: webix.rules.isNotEmpty
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
}