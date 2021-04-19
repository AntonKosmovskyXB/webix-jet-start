import {JetView} from "webix-jet";
import Datatable from "views/datatable.js";
import {countries} from "../models/countries";
import {statuses} from "../models/statuses";

export default class DataView extends JetView{
	config() {
		const _ = this.app.getService("locale")._;
		const countriesTable = {
			cols: [ new Datatable(this.app, "", countries) ],
			localId: "Countries"
		};

		const statusesTable = {
			cols: [ new Datatable(this.app, "", statuses) ],
			localId: "Statuses"
		};

		return {
			rows: [
				{
					view: "tabbar", 
					localId: "tableTabbar", 
					options: [
						{value: _("Countries"), id: "Countries"},
						{value: _("Statuses"), id: "Statuses"}
					]
				},
				{
					view: "multiview", 
					cells: [countriesTable, statusesTable]
				}
			]
		};
	}

	init() {
		this.$$("tableTabbar").attachEvent("onChange", (table) => {
			this.$$(table).show();
		});
	}
}