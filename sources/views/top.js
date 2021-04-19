import {JetView} from "webix-jet";

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
							{id: "contacts", value: _("Contacts"), href: "#!/top/contacts"},
							{id: "data", value: _("Data"), href: "#!/top/data"},
							{id: "settings", value: _("Settings"), href: "#!/top/settings"}
						]
					}, 
					{ $subview:true }
				]},
			]
		};
	}

	init() {
		this.$$("top:menu").select("contacts");
	}
}