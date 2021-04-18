import {JetView} from "webix-jet";
import {contacts} from "../models/contacts.js";
import Form from "views/form.js";
import { countries } from "../models/countries.js";

export const contactsCollection = new webix.DataCollection({
	data: contacts
});

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
						},
					},
					onClick:{
						"wxi-close": (event, id) => {
							const selectedId = this.list.getSelectedId();
							webix.confirm({
								text: "Do you want to remove this user?"
							}).then(() => {
								contactsCollection.remove(id);

								if (id == selectedId) {
									this.list.select(this.list.data.order[0]);
								}
							});
							return false;
						}
					}
				},
				{
					view: "button", 
					value: "Add contact", 
					css: "webix_primary", 
					click: () => {
						const newItem = {"Name":"New User","Email":"new@gmail.com","Status":1,"Country":1};
						contactsCollection.add(newItem);
						this.list.select(newItem.id);
					}
				}
			]
		};

		return { 
			cols:[list, Form]
		};
	}

	init() {
		this.list = this.$$("contactsList");
		this.list.sync(contactsCollection);
		const firstElementId = contacts[0].id;
		const selectedId = this.getParam("id");

		if (!selectedId) {
			this.list.select(firstElementId);
		} else {
			this.list.select(selectedId);
		}
	}

	setUrlParam(selectedId) {
		this.setParam("id", selectedId, true);
	}

	
}