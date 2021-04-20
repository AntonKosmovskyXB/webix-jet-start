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
			width: 400,
			elements: [
				{view: "text", label: _("Name"), name: "Name", invalidMessage: _("Field should not be empty")},
				{view: "text", label: _("Email"), name: "Email", invalidMessage: _("Please, fill correct email address")},
				{rows:[
					{ 
						view: "combo", 
						label: _("Country"), 
						name: "Country", 
						options: { body: {template:"#Name#"}, data: countries }, 
						invalidMessage: _("Field should not be empty") },
					{ 
						view: "combo", 
						label: _("Status"), 
						name: "Status", 
						options: { body: {template:"#Name#"}, data: statuses }, 
						invalidMessage: _("Field should not be empty") },
				]},
				{cols:[
					{ 
						view: "button", 
						value: _("Save") , 
						click: () => {
							const formValidationResult = this.form.validate();
							if (formValidationResult && this.form.isDirty()) {
								const values = this.form.getValues();
								contacts.updateItem(values.id, values);
							}
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
		this.app.callEvent("OnFormInit", []);
	}

	urlChange() {
		webix.promise.all([
			contacts.waitData,
			countries.waitData,
			statuses.waitData
		]).then(()=>{
			const currentItem = contacts.getItem(this.getParam("id")) || contacts.getItem(contacts.getFirstId());
			this.form.setValues(currentItem);
			this.form.clearValidation();
		});
	}

	clearForm() {
		const _ = this.app.getService("locale")._;
		webix.confirm({
			text: _("Do you want to clear this form?")
		}).then(() => {
			this.form.clear();
			this.form.clearValidation();
		}
		);
	}
}