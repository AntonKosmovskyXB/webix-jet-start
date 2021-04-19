import {JetView} from "webix-jet";
import {contacts} from "../models/contacts.js";
import Form from "views/form.js";

export default class ContactsView  extends JetView{
	config() {
		const _ = this.app.getService("locale")._;
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
								text: _("Do you want to remove this user?")
							}).then(() => {
								contacts.remove(id);

								if (id == selectedId && this.list.getFirstId()) {
									this.list.select(this.list.getFirstId());
								}
							});
							return false;
						}
					}
				},
				{
					view: "button", 
					value: _("Add contact"), 
					css: "webix_primary", 
					click: () => {
						const newItem = {"Name":"New User","Email":"new@gmail.com","Status":1,"Country":1};
						contacts.add(newItem);
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
		this.list.sync(contacts);
		const firstElementId = contacts.getFirstId();
		const selectedId = this.getParam("id");
		const selectedItem = this.list.getItem(selectedId);
		
		if (selectedItem) {
			this.list.select(selectedId);
		} else if (firstElementId) {
			this.list.select(firstElementId);
		}
	}

	setUrlParam(selectedId) {
		this.setParam("id", selectedId, true);
	}

	
}