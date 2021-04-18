import {JetView} from "webix-jet";
import {contacts} from "../models/contacts.js"
import Form from "views/form.js";

export default class ContactsView  extends JetView{
	config() {
		const list = {
			rows:[
				{
					view: "list",
					localId: "contactsList",
					css: "contacts-item",
					template: "Name: #Name#, Email: #Email#, Country: #Country#, Status: #Status# <span class='webix_icon wxi-close'></span>",
					select: true,
					on:{
						onAfterSelect: () => {
							const selectedId = this.list.getSelectedId();
							this.setUrlParam(selectedId);
						}
					}
				},
				{
					view: "button", value: "Add contact", css: "webix_primary"
				}
			]
		};

		return { 
			cols:[list, Form]
		};
	}

	init() {
		this.list = this.$$("contactsList");
		this.list.parse(contacts);
		const firstElementId = contacts[0].id;
		const selectedId = this.getParam("id");

		if (!selectedId) {
			this.list.select(firstElementId);
		} else {
			this.list.select(selectedId);
		}
	}

	setUrlParam(selectedId) {
		this.setParam("id", selectedId, true)
	}
}