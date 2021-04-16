import {JetView} from "webix-jet";

export default class Datatable extends JetView {
	constructor(app, name, data) {
		super(app, name);
		this.data = data;
	}

	config() {
		return {
			rows: [
				{
					cols: [
						{view: "button", value: "Add", width: 100, css:"webix_primary", click: () => this.addItem()},
						{view: "button", value: "Delete", width: 100, css:"webix_primary", click: () => this.deletedItem()},
						{view: "text", localId: "datatableInput"}
					]
				},
				{
					view: "datatable",
					localId: "datatable",
					autoConfig: true,
				},
			]
		};
	}

	addItem() {
		this.$$("datatable").add({Name: this.$$("datatableInput").getValue()});
	}

	deletedItem() {
		const selectedItem = this.$$("datatable").getSelectedId();
		if (selectedItem) {
			this.$$("datatable").remove(selectedItem);
		}
	}

	init() {
		this.$$("datatable").parse(this.data);
	}
}