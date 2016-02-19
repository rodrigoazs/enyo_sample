/**
	For simple applications, you might define all of your views in this file.
	For more complex applications, you might choose to separate these kind definitions
	into multiple files under this folder.

	style: "background: gray url('http://lorempixel.com/1920/1080/')",
*/

enyo.kind({
	name: "flickr.MainView",
	style: "background: gray url('http://lorempixel.com/1920/1080/')",
	classes: "moon enyo-fit",
	storage: 0, // responsible for the storage
	components: [
		{name: "panels", kind: "moon.Panels", popOnBack:true, pattern: "alwaysviewing", classes: "enyo-fit"}
	],
	constructor: function() {
		// read the storage before loading and then call the Menu
		var request = new enyo.Ajax({url: "storage.json"});
		request.response(this, function(inSender, inData) {
			this.items = inData;
			storage = this.items;
			// update Locale according to the storage
			enyo.updateLocale(storage.lang);
			// store the storage in enyo
			this.storage = storage;
			// shows the menu
			this.showMenu();
		});
		request.go();

		this.instanceArray = [];
    // Call the constructor inherited from Object
    this.inherited(arguments);
	},
	showMenu: function () {
		this.inherited(arguments);
		this.$.panels.pushPanels([
			{title: "Menu", autoNumber: false, smallHeader: true, headerType: 'small', name: "MenuPanel", defaultSpotlightControl: "defaultControl", classes: "moon-7h", joinToPrev: true, components: [
				{kind: "moon.Item", name: "FlickrSearchItem", content: $L('Flickr Search'), ontap: "next1"},
				{kind: "moon.Item", name: "LastFMItem",  content: "<img src='http://perfectprog.com/pics/lastfm/lastfm-icon.png' width='20px'> LastFM", allowHtml: true, ontap: "lastfmTap"},
				{kind: "moon.Item", name: "GoogleMapsItem",  content: "<img src='http://www.juliesalva.com/wp-content/uploads/2015/03/Google_Maps_Icon.png' width='20px'> GoogleMaps", allowHtml: true, ontap: "googlemapsTap"},
				{kind: "moon.Item", name: "SettingsItem",  content: "<img src='http://icons.iconarchive.com/icons/graphicloads/100-flat-2/256/settings-icon.png' width='20px'> "+$L('Settings'), allowHtml: true, ontap: "next2"}
			]}
		], {owner: this});
	},
	next2: function() {
		this.$.panels.pushPanels([
			{name: "SettingsPanel", title: "<img src='http://icons.iconarchive.com/icons/graphicloads/100-flat-2/256/settings-icon.png' width='50px'> "+$L("Settings"), titleUpperCase: false, allowHtmlHeader: true, autoNumber: false, smallHeader: true, headerType: 'small', defaultSpotlightControl: "defaultControl", classes: "moon-7h", joinToPrev: true, components: [
				{kind: "enyo.Signals", onwebOSLocaleChange: "handleLocaleChangeEvent"},
				{kind: "moon.Scroller", classes: "enyo-fill moon-7h", components: [
						{kind: "moon.ExpandablePicker", noneText: "Nothing selected", content: $L('Language'), name: "LanguageExpandable", allowHtml:true, components: [
							{content: "<img src='http://icons.iconarchive.com/icons/custom-icon-design/all-country-flag/24/United-Kingdom-flag-icon.png' width='20px'> English", id:"en", ontap: "changeLanguage", allowHtml: true, active: this.getStorageLangBool('en')},
							{content: "<img src='http://icons.iconarchive.com/icons/custom-icon-design/all-country-flag/24/Portugal-Flag-icon.png' width='20px'> Português", id:"pt", ontap: "changeLanguage", allowHtml: true, active: this.getStorageLangBool('pt')},
							{content: "<img src='http://icons.iconarchive.com/icons/custom-icon-design/all-country-flag/24/Spain-Flag-icon.png' width='20px'> Español", allowHtml: true},
							{content: "<img src='http://icons.iconarchive.com/icons/custom-icon-design/all-country-flag/24/France-Flag-icon.png' width='20px'> François", allowHtml: true},
							{content: "<img src='http://icons.iconarchive.com/icons/custom-icon-design/all-country-flag/24/Russia-Flag-icon.png' width='20px'>  Pусский", allowHtml: true},
							{content: "<img src='http://icons.iconarchive.com/icons/custom-icon-design/all-country-flag/24/Japan-Flag-icon.png' width='20px'> 日本語", allowHtml: true},
							{content: "<img src='http://icons.iconarchive.com/icons/custom-icon-design/all-country-flag/24/Germany-Flag-icon.png' width='20px'> Deutsche", allowHtml: true},
							{content: "<img src='http://icons.iconarchive.com/icons/custom-icon-design/all-country-flag/24/Italy-Flag-icon.png' width='20px'> Italiano", allowHtml: true}
						]}
				]}
			]}
		],{owner: this});
	},
	changeLanguage: function(inSender, inEvent) {
		enyo.updateLocale(inSender.get("id"));
		// It is needed to update content only in the actual and previous panels
		this.$.SettingsPanel.set('title', "<img src='http://icons.iconarchive.com/icons/graphicloads/100-flat-2/256/settings-icon.png' width='50px'> "+$L('Settings'));
		this.$.SettingsItem.set('content', "<img src='http://icons.iconarchive.com/icons/graphicloads/100-flat-2/256/settings-icon.png' width='20px'> "+$L('Settings'));
		this.$.FlickrSearchItem.set('content', $L('Search Flickr'));
		this.$.LanguageExpandable.set('content', $L('Language'));

		// saving in the storage by Ajax
		params = 'lang=' + inSender.get("id");
		this.writeStorage(params);

		return true;
	},
	lastfmTap: function() {
		var request = new enyo.Ajax({url: "http://ws.audioscrobbler.com/2.0/?method=user.gettopartists&limit=10&user="+this.storage.lastfm_user+"&api_key=2b35547bd5675d8ecb2b911ee9901f59&format=json"});
		request.response(this, function(inSender, inData) {
			this.lastfm_list = inData;
			data = this.lastfm_list;
			//this.$.LastFMPanel.data = this.lastfm_list;
			//alert(data.topartists.artist[0].name);
			this.$.panels.pushPanels([
				{name: "LastFMPanel", title: "<img src='http://perfectprog.com/pics/lastfm/lastfm-icon.png' width='50px'> LastFM", titleUpperCase: false, allowHtmlHeader: true, autoNumber: false, smallHeader: true, headerType: 'small', defaultSpotlightControl: "defaultControl", classes: "moon-7h", joinToPrev: true,
				data: null,
				headerComponents: [
								{kind: "moon.Button", small:true, content: $L("Settings"), name:"mediumHeaderToggle", ontap: "lastfmConfigTap"}
				],
				components: [
					{kind: 'enyo.Control', name: 'lastFMArtistsText', components: [ {kind: 'moon.BodyText', content: $L("No artists found.")} ] },
					{kind: 'moon.Scroller', classes: "enyo-fill", components: [
						{kind: "enyo.Repeater", count:"10", onSetupItem: "setLastFMArtistList", components: [
							{
										kind: "moon.ImageItem",
										source: enyo.Image.placeholder,
										label: "Breaking Bad",
										text: "A struggling high school chemistry teacher who is diagnosed with inoperable lung cancer turns to a life of crime, producing and selling methamphetamine with a former student"
							}
						]}
					]}
				]
				}
			],{owner: this});
		});
		request.go();
		//alert(this.lastfm_list.topartists.artist[0].name);
	},
	setLastFMArtistList: function(inSender, inEvent) {
        var index = inEvent.index;
        var item = inEvent.item;
				try {
					item.$.imageItem.set("label", this.lastfm_list.topartists.artist[index].name);
					item.$.imageItem.set("source", this.lastfm_list.topartists.artist[index].image[2]['#text']);
				}catch(err) {
						inSender.setCount(inSender.count - 1);
				}
				if(index == 9 && inSender.count != 0) {
					this.$.lastFMArtistsText.hide();
				}
        return true;
  },
	googlemapsTap: function() {
		this.$.panels.pushPanels([
			{title: "<img src='http://www.juliesalva.com/wp-content/uploads/2015/03/Google_Maps_Icon.png' width='50px'> GoogleMaps", titleUpperCase: false, allowHtmlHeader: true, autoNumber: false, smallHeader: true, headerType: 'small', defaultSpotlightControl: "defaultControl", classes: "moon-7h", joinToPrev: true,
			components: [
				{kind: "moon.InputDecorator", components: [
					{kind: "moon.Input", placeholder: "Search term", onchange:"googlemaphandleInput"},
					{kind: "Image", src: "$lib/moonstone/samples/assets/search-input-search.png"}
				]},
				{tag: "br"},
				{kind: "moon.IconButton", icon: "arrowlargeleft", ontap: "googlemapsbuttonTapped"},
				{kind: "moon.IconButton", icon: "arrowlargeright", ontap: "googlemapsbuttonTapped"},
				{kind: "moon.IconButton", icon: "arrowlargeup", ontap: "googlemapsbuttonTapped"},
				{kind: "moon.IconButton", icon: "arrowlargedown", ontap: "googlemapsbuttonTapped"},
				{kind: "moon.IconButton", icon: "fullscreen", ontap: "googlemapsbuttonTapped"},
				{kind: "moon.IconButton", icon: "exitfullscreen", ontap: "googlemapsbuttonTapped"},
				{tag: "br"},{tag: "br"},
				{tag: "div", id: "map", style: "width: 100%; height: 100%; align: center;"}
			]
			}
		],{owner: this});
		var mapDiv = document.getElementById('map');
    this.map = new google.maps.Map(mapDiv, { center: {lat: 44.540, lng: -78.546}, zoom: 8 });
		//map.setZoom(2);
	},
	writeStorage: function(params)
	{
    var request = new enyo.Ajax({url: '../storage/index.php', method: "POST", postBody: params });
    request.go();
	},
	getStorageLangBool: function(lang)
	{
		return ilib.getLocale().substring(0,2) == lang;
	},
	lastfmConfigTap: function()
	{
		this.$.panels.pushPanels([
			{title: $L("Settings"), titleUpperCase: false, allowHtmlHeader: true, autoNumber: false, smallHeader: true, headerType: 'small', defaultSpotlightControl: "defaultControl", classes: "moon-7h", joinToPrev: true,
			components: [
				{kind: "moon.BodyText", content: "Please, type your LastFM username to establish connection."},
				{kind: "moon.InputDecorator", components: [
					{kind: "moon.Input", name: "lastfmUserInput", placeholder: $L("Enter username"), value: this.storage.lastfm_user, oninput:"handleInput", onchange:"handleChange"}
				]},
				// http://ws.audioscrobbler.com/2.0/?method=user.getinfo&user=RodrigoKamper&api_key=2b35547bd5675d8ecb2b911ee9901f59&format=json

				// {kind: "moon.InputDecorator", components: [
				// 	{kind: "moon.Input", type:"password", placeholder: $L("Enter password"), oninput: "handleInput", onchange:"handleChange"}
				// ]},
				{kind: "moon.InputDecorator", components: [
					{name: "bButton", kind: "moon.Button", content: $L("Save"), ontap: "lastfmConfigButtonTap"}
				]},
				{tag: "br"},
				{tag: "br"},
				{kind : "FittableColumns", style: "width: 50%; float: left;",
			    components : [
						{kind: "moon.BodyText", content: $L("Name")+": "},
						{kind: "moon.BodyText", name:"lastfmName", content: ""},
						{tag: "br"},
						{kind: "moon.BodyText", content: $L("Country")+": "},
						{kind: "moon.BodyText", name:"lastfmCountry", content: ""},
						{tag: "br"},
						{kind: "moon.BodyText", content: $L("Scrobbles")+": "},
						{kind: "moon.BodyText", name:"lastfmScrobbles", content: ""},
					]
				},
				{kind : "FittableColumns", style: "width: 50%; float: right;",
					components : [
						{kind : "Image", name :"lastfmProfilePic", sizing: "constrain", src: "", style : "width: 174px; height: 174px; background-size: 174px 174px; -webkit-border-radius: 150px; margin-left: 25%;"},
					]
				}
			]}
		],{owner: this});
		if(this.storage.lastfm_user !== undefined && this.storage.lastfm_user != "") {
		 	this.lastfmConfigUpdate(this.storage.lastfm_user);
		}
	},
	lastfmConfigButtonTap: function(inSender, inEvent)
	{
		params = 'lastfm_user=' + this.$.lastfmUserInput.value;
		this.writeStorage(params);
		this.storage.lastfm_user = this.$.lastfmUserInput.value;
		this.lastfmConfigUpdate(this.$.lastfmUserInput.value);

	},
	lastfmConfigUpdate: function(user)
	{
		var request = new enyo.Ajax({url: "http://ws.audioscrobbler.com/2.0/?method=user.getinfo&user="+user+"&api_key=2b35547bd5675d8ecb2b911ee9901f59&format=json"});
		request.response(this, function(inSender, inData) {
			this.items = inData;
			data = this.items;
			this.$.lastfmName.set('content', data.user.realname);
			this.$.lastfmProfilePic.set('src', data.user.image[2]['#text']);
			this.$.lastfmCountry.set('content', data.user.country);
			this.$.lastfmScrobbles.set('content', data.user.playcount);

		});
		request.go();
	},
	googlemapsbuttonTapped: function(inSender, inEvent){
		switch(inSender.get("icon")) {
			case "arrowlargeup":
				offsetCenter(this.map, this.map.getCenter(), 0, -20);
				break;
			case "arrowlargedown":
				offsetCenter(this.map, this.map.getCenter(), 0, 20);
				break;
			case "arrowlargeleft":
				offsetCenter(this.map, this.map.getCenter(), 20, 0);
				break;
			case "arrowlargeright":
				offsetCenter(this.map, this.map.getCenter(), -20, 0);
				break;
			case "fullscreen":
				this.map.setZoom(this.map.getZoom()-1);
				break;
			case "exitfullscreen":
				this.map.setZoom(this.map.getZoom()+1);
				break;
			default:
			break;
		}
	},
	googlemaphandleInput: function(inSender, inEvent) {
		localizeAddres(this.map, inSender.getValue());
	}
});
