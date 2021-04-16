import {JetView} from "webix-jet";

export default class SettingsView extends JetView{
	config(){
		return {
			rows:[
				{
					view: "segmented",
					width: 500,
					options: [
						{ id:"en", value:"en" },
						{ id:"ru", value:"ru"}
					]
				},
				{}
			]
		};
	}
}