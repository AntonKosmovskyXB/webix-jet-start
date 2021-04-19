import {JetView} from "webix-jet";

export default class Datatable extends JetView {
	constructor(app, name, data) {
		super(app, name);
		this.data = data;
	}

	config() {
		const _ = this.app.getService("locale")._;
		return {
			rows: [
				{
					cols: [
						{
							view: "button", 
							value: _("Add"), 
							width: 100, 
							css:"webix_primary", 
							click: () => this.addItem()
						},
						{
							view: "button", 
							value: _("Delete"), 
							width: 100, 
							css:"webix_primary", 
							click: () => this.deletedItem()
						},
						{view: "text", localId: "datatableInput"}
					]
				},
				{
					view: "datatable",
					localId: "datatable",
					autoConfig: true,
					editor: "text",
					editable: true,
					editaction: "dblclick"
				},
			]
		};
	}

	init() {
		this.table = this.$$("datatable");
		this.table.parse(this.data);
	}

	addItem() {
		const currentValue = this.$$("datatableInput").getValue();
		if (currentValue !== "") {
			this.table.add({Name: currentValue});
			this.$$("datatableInput").setValue("");	
		}
	}

	deletedItem() {
		const selectedItem = this.table.getSelectedId();
		if (selectedItem) {
			this.table.remove(selectedItem);
		}
	}
}