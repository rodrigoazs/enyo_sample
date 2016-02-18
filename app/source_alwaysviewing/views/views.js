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
	handlers: {
		onRequestPushPanel: "pushPanel",
		onRequestFullScreen: "fullscreen",
		onRequestSlideshowStart: "startSlideshow"
	},
	components: [
		{kind: "flickr.Slideshow", classes: "enyo-fit"},// src:"assets/splash.png"},
		{kind: "moon.Panels", classes: "enyo-fit", pattern: "alwaysviewing", popOnBack:false, components: [
			{title: "Menu", autoNumber: false, name: "MenuPanel", defaultSpotlightControl: "defaultControl", classes: "moon-7h", joinToPrev: true, components: [
				{kind: "moon.Item", name: "FlickrSearchItem", content: "Flickr Search", ontap: "next1"},
				{kind: "moon.Item", name: "SettingsItem",  content: "Settings", ontap: "next2"},
				{kind: "moon.Item", name: "ApplicationsItem",  content: "Applications", ontap: "next3"}
			]},
			{kind: "flickr.SearchPanel", autoNumber: false },
			// http://icons.iconarchive.com/icons/graphicloads/100-flat-2/256/settings-icon.png
			{title: "<img src='http://icons.iconarchive.com/icons/graphicloads/100-flat-2/256/settings-icon.png' width='50px'> "+$L("Settings"), titleUpperCase: false, allowHtmlHeader: true, autoNumber: false, smallHeader: true, headerType: 'small', name:"SettingsPanel", defaultSpotlightControl: "defaultControl", classes: "moon-7h", joinToPrev: true, components: [
				{kind: "enyo.Signals", onwebOSLocaleChange: "handleLocaleChangeEvent"},
				{kind: "moon.Scroller", classes: "enyo-fill moon-7h", components: [
						// {kind: "Group", onActivate: "groupChanged", components: [
						// 	{kind: "moon.SelectableItem", content: "Português", ontap: "portuguese"},
						// 	{kind: "moon.SelectableItem", content: "English", ontap: "english"}
						// ]}
						{kind: "moon.ExpandablePicker", noneText: "Nothing selected", content: $L('Language'), name: "LanguageExpandable", allowHtml:true, components: [
							{content: "<img src='http://icons.iconarchive.com/icons/custom-icon-design/all-country-flag/24/United-Kingdom-flag-icon.png' width='20px'> English", id:"en", ontap: "changeLanguage", allowHtml: true, active: true},
							{content: "<img src='http://icons.iconarchive.com/icons/custom-icon-design/all-country-flag/24/Portugal-Flag-icon.png' width='20px'> Português", id:"pt", ontap: "changeLanguage", allowHtml: true},
							{content: "<img src='http://icons.iconarchive.com/icons/custom-icon-design/all-country-flag/24/Spain-Flag-icon.png' width='20px'> Español", allowHtml: true},
							{content: "<img src='http://icons.iconarchive.com/icons/custom-icon-design/all-country-flag/24/France-Flag-icon.png' width='20px'> François", allowHtml: true},
							{content: "<img src='http://icons.iconarchive.com/icons/custom-icon-design/all-country-flag/24/Russia-Flag-icon.png' width='20px'>  Pусский", allowHtml: true},
							{content: "<img src='http://icons.iconarchive.com/icons/custom-icon-design/all-country-flag/24/Japan-Flag-icon.png' width='20px'> 日本語", allowHtml: true},
							{content: "<img src='http://icons.iconarchive.com/icons/custom-icon-design/all-country-flag/24/Germany-Flag-icon.png' width='20px'> Deutsche", allowHtml: true},
							{content: "<img src='http://icons.iconarchive.com/icons/custom-icon-design/all-country-flag/24/Italy-Flag-icon.png' width='20px'> Italiano", allowHtml: true}
						]}
				]}
			]},
			{title: "Menuaa", name:"ApplicationsPanel", autoNumber: false, classes: "moon-7h", joinToPrev: true,

			}
		]}
	],
	bindings: [
		{from: "$.panels.showing", to:"panelsShowing"}
	],
	create: function() {
		this.inherited(arguments);
		this.set("photos", new flickr.SearchCollection());
		this.$.searchPanel.set("photos", this.photos);
		this.$.slideshow.set("photos", this.photos);
	},
	pushPanel: function(inSender, inEvent) {
		this.$.panels.pushPanel(inEvent.panel);
	},
	fullscreen: function(inSender, inEvent) {
		this.$.slideshow.set("src", inEvent.model.get("original"));
		this.$.panels.hide();
	},
	startSlideshow: function() {
		this.$.slideshow.start();
		this.$.panels.hide();
	},
	panelsShowingChanged: function() {
		if (this.panelsShowing) {
			this.$.slideshow.stop();
		}
	},
	next1: function(inSender, inEvent) {
		this.$.panels.setIndex(1);
		return true;
	},
	next2: function(inSender, inEvent) {
		this.$.panels.setIndex(2);
		//this.$.panels.pushPanel({panel: {kind: "flickr.TestePanel"}});
		return true;
	},
	next3: function(inSender, inEvent) {
		this.$.panels.setIndex(3);
		//this.$.panels.pushPanel({panel: {kind: "flickr.TestePanel"}});
		return true;
	},
	changeLanguage: function(inSender, inEvent) {
		enyo.updateLocale(inSender.get("id"));
		// this.$.SettingsPanel.set('title', 'Configurações');
		this.$.SettingsPanel.set('title', "<img src='http://icons.iconarchive.com/icons/graphicloads/100-flat-2/256/settings-icon.png' width='50px'> "+$L('Settings'));
		this.$.SettingsItem.set('content', $L('Settings'));
		this.$.LanguageExpandable.set('content', $L('Language'));
		this.$.FlickrSearchItem.set('content', $L('Search Flickr'));
		this.$.MenuPanel.set('title', $L('Menu'));
		this.$.searchPanel.set('title', $L('Search Flickr'));
		this.$.searchPanel.set('titleBelow', $L('Enter search term above'));
		this.$.searchPanel.$.spinner.set('content', $L('Loading'));
		// this.$.SettingsPanel.$.set('content', $L('Language'));
		// alert($L("SettingsTitle"));
		// window.location && window.location.reload();
		return true;
	},
	handleLocaleChangeEvent: function() {
        // Check if the locale actually changed. Save the current locale in
        // your create method to compare against.
				alert('a0');
        if (ilib && ilib.getLocale() !== this.iLibLocale) {
            this.saveStateIfNecessary();
            if (this.canReload()) {
                window.location && window.location.reload();
            }
        }
    }
});

enyo.kind({
	name: "flickr.Slideshow",
	kind: "enyo.ImageView",
	//src: "assets/splash.png",
	published: {
		photos: null,
		delay: 3000
	},
	index: 0,
	start: function() {
		this.next(true);
	},
	next: function(start) {
		if (!start) {
			this.index++;
			if (this.index >= this.photos.length) {
				this.index = 0;
			}
		}
		this.set("src", this.photos.at(this.index).get("original"));
		this.startJob("slideshow", "next", this.delay);
	},
	stop: function() {
		this.stopJob("slideshow");
		//this.set("src", "assets/splash.png");
	}
});

enyo.kind({
	name: "flickr.SearchPanel",
	kind: "moon.Panel",
	published: {
		photos: null
	},
	events: {
		onRequestPushPanel: "",
		onRequestSlideshowStart: ""
	},
	handlers: {
		onInputHeaderChange: "search"
	},
	title: "Search Flickr",
	titleBelow: "Enter search term above",
	headerOptions: {inputMode: true, dismissOnEnter: true},
	headerComponents: [
		{kind: "moon.Spinner", content: "Loading...", name: "spinner"},
		{kind: "moon.Button", small:true, name:"startButton", content: "Start Slideshow", ontap: "startSlideshow"}
	],
	components: [
		{kind: "moon.DataGridList", fit:true, name: "resultList", minWidth: 250, minHeight: 300, ontap: "itemSelected", components: [
			{kind: "moon.GridListImageItem", imageSizing: "cover", useSubCaption:false, centered:false, bindings: [
				{from: "model.title", to:"caption"},
				{from: "model.thumbnail", to:"source"}
			]}
		]}
	],
	bindings: [
		{from: "photos", to: "$.resultList.collection"},
		{from: "photos.status", to:"$.spinner.showing", transform: function(value) {
			return this.photos.isBusy();
		}},
		{from: "photos.length", to:"$.startButton.showing"}
	],
	search: function(inSender, inEvent) {
		this.$.resultList.collection.set("searchText", inEvent.originator.get("value"));
	},
	itemSelected: function(inSender, inEvent) {
		this.photos.set("selected", inEvent.model);
		this.doRequestPushPanel({panel: {kind: "flickr.DetailPanel", model: inEvent.model}});
	},
	startSlideshow: function() {
		this.doRequestSlideshowStart();
	}
});

enyo.kind({
	name: "flickr.DetailPanel",
	kind: "moon.Panel",
	events: {
		onRequestFullScreen: ""
	},
	layoutKind: "FittableColumnsLayout",
	components: [
		{kind: "moon.Image", name: "image", fit: true, sizing:"contain", ontap:"requestFullScreen"}
	],
	headerComponents: [
		{kind: "moon.Button", ontap:"requestFullScreen", small:true, content:"View Fullscreen"},
		{kind: "moon.ContextualPopupDecorator", components: [
			{kind: "moon.ContextualPopupButton", small: true, content: "QR Code"},
			{kind: "moon.ContextualPopup", components: [
				{kind: "enyo.Image", name:"qr", style:"height: 300px; width: 300px;"}
			]}
		]}
	],
	bindings: [
		{from: "model.title", to: "title"},
		{from: "model.original", to: "$.image.src"},
		{from: "model.username", to: "titleBelow", transform: function(val) {
			return "By " + (val || " unknown user");
		}},
		{from: "model.taken", to: "subTitleBelow", transform: function(val) {
			return val ? "Taken " + val : "";
		}},
		{from: "model.original", to: "$.qr.src", transform: function(val) {
			return val ? "https://chart.googleapis.com/chart?cht=qr&chs=300x300&chl=" + encodeURIComponent(val) : "";
		}}
	],
	transitionFinished: function(inInfo) {
		if (inInfo.from < inInfo.to) {
			this.model.fetch();
		}
	},
	requestFullScreen: function() {
		this.doRequestFullScreen({model: this.model});
	}
});
