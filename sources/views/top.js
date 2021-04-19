import {JetView, plugins} from "webix-jet";

export default class TopView extends JetView {
	config(){
		const _ = this.app.getService("locale")._; 
		return {
			rows:[
				{ type:"space", cols:[
					{ 
						view:"menu", 
						id:"top:menu", 
						width:200, 
						layout: "y",
						select:true,
						data:[
							{id: "contacts", value: _("Contacts")},
							{id: "data", value: _("Data")},
							{id: "settings", value: _("Settings")}
						]
					}, 
					{ $subview:true }
				]},
			]
		};
	}

	init(){
		this.use(plugins.Menu, "top:menu");
	}
}