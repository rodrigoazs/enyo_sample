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
				{name: "player", kind: "moon.VideoPlayer", src: "movies/big_buck_bunny_720p_50mb.mp4", poster: "$lib/moonstone/samples/assets/video-poster.png", autoplay: true, infoComponents: [
			{kind: "moon.VideoInfoBackground", orient: "left", autoResize: true, background: true, fit: true, components: [
				{
					kind: "moon.ChannelInfo",
					channelNo: "13",
					channelName: "AMC",
					classes: "moon-2h",
					components: [
						{content: "3D"},
						{content: "Live"},
						{content: "REC 08:22", classes: "moon-video-player-info-redicon "}
					]
				},
				{
					kind: "moon.VideoInfoHeader",
					name: "playerInfo",
					title: "Downton Abbey - Extra Title",
					subTitle: "Mon June 21, 7:00 - 8:00pm",
					subSubTitle: "R - TV 14, V, L, SC",
					description: "The series, set in the Youkshire country estate of Downton Abbey, depicts the lives of the aristocratic Crawley famiry and"
				}
			]},
			{kind: "moon.VideoInfoBackground", orient: "right", background: true, components: [
				{kind:"moon.Clock"}
			]}
		], components: [
			{kind: "moon.IconButton", src: "$lib/moonstone/images/video-player/icon-placeholder.png"},
			{kind: "moon.TooltipDecorator", components: [
				{kind: "moon.ContextualPopupDecorator", components: [
					{kind: "moon.Button", content: "Popup"},
					{
						kind: "moon.ContextualPopup",
						classes: "moon-3h moon-6v",
						components: [
							{kind: "moon.Item", content:"Item 1"},
							{kind: "moon.Item", content:"Item 2"},
							{kind: "moon.Item", content:"Item 3"}
						]
					}
				]},
				{kind: "moon.Tooltip", floating:true, content: "I'm a tooltip for a button."}
			]},
			{kind: "moon.IconButton", classes:"moon-icon-video-round-controls-style"},
			{kind: "moon.IconButton", classes:"moon-icon-video-round-controls-style"},
			{kind: "moon.IconButton", classes:"moon-icon-video-round-controls-style"},
			{kind: "moon.IconButton", classes:"moon-icon-video-round-controls-style"},
			{kind: "moon.IconButton", classes:"moon-icon-video-round-controls-style"},
			{kind: "moon.IconButton", classes:"moon-icon-video-round-controls-style"},
			{kind: "moon.IconButton", classes:"moon-icon-video-round-controls-style"},
			{kind: "moon.IconButton", classes:"moon-icon-video-round-controls-style"},
			{kind: "moon.IconButton", classes:"moon-icon-video-round-controls-style"}
		]},
		// {kind: "PanelsWithCarouselArrangerSample"},
		{kind: "moon.Spinner", name: "spinner"},
		{kind: "enyo.Control", name: "onDemandPanel", showing: false, tag: "div", style: "height: 100%; width: 100%; z-index: 9999; position: fixed; background-color: rgba(0, 0, 0, 0.75);", components: [
			{kind:"moon.IconButton", name: "locVoltar", icon: "arrowlargeleft", ontap:"voltar", onSpotlightSelect: "voltar", style: "margin: 50px 20px 0 0;"},
			{kind: "moon.Scroller", fit:true, components: [
				{kind: "Repeater", count:9, classes:"moon-hspacing", onSetupItem:"setupItemMovies", components: [
					{
						kind: "moon.ObjectActionDecorator",
						orientation: "vertical",
						components: [
							{kind: "moon.Item", onSpotlightFocused: "MovieFocused", components: [
								{name: 'image', kind: 'enyo.Image', style: "height: 338px", src: "http://cdn.fansided.com/wp-content/blogs.dir/229/files/2015/12/4954724-deadpool-camp-b-one-sheet1-590x900.jpg"}
							]}
						],
						actionComponents: [
							{kind: "moon.Button", onSpotlightFocused: "MovieFocused", onSpotlightSelect: "chooseMovPlay", ontap: "chooseMovPlay", small: true, content: "PLAY"}
						]
					}
				]}
			]}
		]},
		{name: "panels", kind: "moon.Panels",	popOnBack:true, pattern: "alwaysviewing", classes: "enyo-fit"}
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
		this.$.spinner.stop();
		this.inherited(arguments);
		this.$.panels.pushPanels([
			{title: "Menu", autoNumber: false, smallHeader: true, headerType: 'small', name: "MenuPanel", defaultSpotlightControl: "defaultControl", classes: "moon-7h", joinToPrev: true, components: [
				{kind: "moon.Item", name: "FlickrSearchItem", content: "<img src='https://www.aryanict.com/upload/1436624800877.png' width='20px'> onDemand", allowHtml: true, ontap: "next1"},
				{kind: "moon.Item", name: "LastFMItem",  content: "<img src='http://perfectprog.com/pics/lastfm/lastfm-icon.png' width='20px'> LastFM", allowHtml: true, ontap: "lastfmTap"},
				{kind: "moon.Item", name: "GoogleMapsItem",  content: "<img src='http://www.juliesalva.com/wp-content/uploads/2015/03/Google_Maps_Icon.png' width='20px'> GoogleMaps", allowHtml: true, ontap: "googlemapsTap"},
				{kind: "moon.Item", name: "SettingsItem",  content: "<img src='http://icons.iconarchive.com/icons/graphicloads/100-flat-2/256/settings-icon.png' width='20px'> "+$L('Settings'), allowHtml: true, ontap: "next2"}
			]}
		], {owner: this});
	},
	MovieFocused: function(inSender, inEvent) {
		for(var i=0; i < inSender.count; i++)
		{
			if(i == inEvent.index)
				inSender.children[i].$.image.set("style", "height: 400px");
			else
				inSender.children[i].$.image.set("style", "height: 300px");
		}
	},
	chooseMovPlay: function(inSender, inEvent) {
		var data_ar = [{title:"Deadpool", duration:90, description: "Ex-militar e mercenário, Wade Wilson (Ryan Reynolds) é diagnosticado com câncer em estado terminal, porém encontra uma possibilidade de cura em uma sinistra experiência científica. Recuperado, com poderes e um incomum senso de humor, ele torna-se Deadpool e busca vingança contra o homem que destruiu sua vida."},
									{title:"Frozen", duration:90, description: "A cacula Anna adora sua irma Elsa, mas um acidente envolvendo os poderes especiais da mais velha, durante a infancia, fez com que os pais as mantivessem afastadas. Apos a morte deles, as duas cresceram isoladas no castelo da familia, ate o dia em que Elsa deveria assumir o reinado de Arendell.."},
									{title:"O Senhor dos Anéis", duration:170, description: "Numa terra fantástica e única, chamada Terra-Média, um hobbit (seres de estatura entre 80 cm e 1,20 m, com pés peludos e bochechas um pouco avermelhadas) recebe de presente de seu tio o Um Anel, um anel mágico e maligno que precisa ser destruído antes que caia nas mãos do mal."},
									{title:"Espetacular Homem-Aranha", duration:130, description: "Peter Parker é um rapaz tímido e estudioso, que inicou há pouco tempo um namoro com a bela Gwen Stacy. Certo dia, o jovem encontra uma misteriosa maleta que pertenceu a seu pai. O artefato faz com que visite o laboratório do dr. Curt Connors. Parker está em busca de respostas sobre o que aconteceu com os pais.."},
									{title:"Star Wars: O Império Contra Ataca", duration:120, description: "Luke Skywalker (Mark Hammil) sonha ir para a Academia como seus amigos, mas se ve envolvido em uma guerra intergalatica quando seu tio compra dois robos e com eles encontra uma mensagem da princesa Leia Organa (Carrie Fisher) para o jedi Obi-Wan Kenobi (Alec Guiness) sobre os planos da construcao da Estrela da Morte.."},
									{title:"Star Wars: Uma Nova Esperança", duration:120, description: "Luke Skywalker, viaja para o misterioso planeta pantanoso de Dagobah, onde o sabio Mestre Jedi Yoda, ensina ao jovem heroi os caminhos da Forca. O que Luke, nao pode imaginar e que seu treinamento Jedi, sera necessario muito em breve.."}];

		this.$.playerInfo.set("title", data_ar[inEvent.index].title);
		this.$.playerInfo.set("subTitle", data_ar[inEvent.index].duration + " mins");
		this.$.playerInfo.set("description", data_ar[inEvent.index].description);

		this.$.player.setSrc("movies/"+inEvent.index+".mp4");
		this.$.player.play();
		this.$.onDemandPanel.hide();
		this.$.onDemandPanel.blur();
		this.$.panels.set("handleShowing", true);
	},
	setupItemMovies: function(inSender, inEvent) {
		var data_ar = ["http://cdn.fansided.com/wp-content/blogs.dir/229/files/2015/12/4954724-deadpool-camp-b-one-sheet1-590x900.jpg",
									 "http://vignette4.wikia.nocookie.net/disney/images/e/e5/Frozen_movie_poster.jpg/revision/latest?cb=20141231225644",
									 "http://br.web.img2.acsta.net/medias/nmedia/18/92/34/89/20194741.jpg",
									 "http://cdn.collider.com/wp-content/uploads/amazing-spider-man-movie-poster.jpg",
									 "http://photos.imageevent.com/afap/wallpapers/movies/theempirestrikesback/The-Empire-Strikes-Back%20-%20DVD.jpg",
									 "https://i.kinja-img.com/gawker-media/image/upload/kiq87p17yfydl5qee12r.jpg"];

		//this.$.image.set("src", "http://www.owlkids.com/wp-content/uploads/2014/08/Teenage-Mutant-Ninja-Turtles-2014-Movie-Poster.jpg");
		//alert('a');
		inSender.children[inEvent.index].$.image.set("src", data_ar[inEvent.index]);
		var a = inSender;
	},
	next1: function() {
		// this.$.panels.pushPanels([
		// 	{title: "<img src='http://icons.iconarchive.com/icons/graphicloads/100-flat-2/256/settings-icon.png' width='50px'> "+$L("onDEMAND"), titleUpperCase: false, allowHtmlHeader: true, autoNumber: false, smallHeader: true, headerType: 'small', defaultSpotlightControl: "defaultControl", classes: "moon-7h", joinToPrev: true, components: [
		// 		{tag: "div", style: "width: 200px; z-index: 9999; position: absolute; left: -50px; background-color: red;", content: "hehehe" }
		// 	]}
		// ],{owner: this});
		this.$.panels.set("handleShowing", false);
		this.$.panels.hide();
		this.$.onDemandPanel.show();
		this.$.onDemandPanel.focus();
	},
	voltar: function()
	{
		this.$.onDemandPanel.hide();
		this.$.onDemandPanel.blur();
		this.$.panels.set("handleShowing", true);
		this.$.panels.show();
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
		this.$.spinner.start();
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
					{kind: 'enyo.Control', name: 'lastFMArtistsText', components: [ {kind: 'moon.BodyText', content: $L("No artist found.")} ] },
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
			this.$.spinner.stop();
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
				{kind: "moon.BodyText", content: $L("Please, type your LastFM username to establish connection.")},
				{kind: "moon.InputDecorator", components: [
					{kind: "moon.Input", name: "lastfmUserInput", placeholder: $L("Enter username"), value: this.storage.lastfm_user, oninput:"handleInput", onchange:"handleChange"}
				]},
				// http://ws.audioscrobbler.com/2.0/?method=user.getinfo&user=RodrigoKamper&api_key=2b35547bd5675d8ecb2b911ee9901f59&format=json

				// {kind: "moon.InputDecorator", components: [
				// 	{kind: "moon.Input", type:"password", placeholder: $L("Enter password"), oninput: "handleInput", onchange:"handleChange"}
				// ]},
				{kind: "moon.InputDecorator", components: [
					{name: "bButton", kind: "moon.Button", content: $L("Save"), Spotlight: true, ontap: "lastfmConfigButtonTap"}
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

enyo.kind({
	name: "PanelsWithCarouselArrangerSample",
	classes: "moon enyo-fit",
	components: [
		{name: "panels", kind: "moon.Panels", style:"opacity: 0.9;", pattern: "activity", classes: "enyo-fit", useHandle: true, components: [
			{title: "First", components: [
				{kind: "moon.Item", content: "Item One", ontap: "next"},
				{kind: "moon.Item", content: "Item Two", ontap: "next"},
				{kind: "moon.Item", content: "Item Three", ontap: "next"},
				{kind: "moon.Item", content: "Item Four", ontap: "next"},
				{kind: "moon.Item", content: "Item Five", ontap: "next"}
			]},
			{title: "Second", components: [
				{kind: "moon.Item", content: "Item One", ontap: "next"},
				{kind: "moon.Item", content: "Item Two", ontap: "next"},
				{kind: "moon.Item", content: "Item Three", ontap: "next"},
				{kind: "moon.Item", content: "Item Four", ontap: "next"},
				{kind: "moon.Item", content: "Item Five", ontap: "next"}
			]},
			{title: "Third", components: [
				{kind: "moon.Item", content: "Item One", ontap: "next"},
				{kind: "moon.Item", content: "Item Two", ontap: "next"},
				{kind: "moon.Item", content: "Item Three", ontap: "next"},
				{kind: "moon.Item", content: "Item Four", ontap: "next"},
				{kind: "moon.Item", content: "Item Five", ontap: "next"}
			]},
			{title: "Fourth", components: [
				{kind: "moon.Item", content: "Item One", ontap: "next"},
				{kind: "moon.Item", content: "Item Two", ontap: "next"},
				{kind: "moon.Item", content: "Item Three", ontap: "next"},
				{kind: "moon.Item", content: "Item Four", ontap: "next"},
				{kind: "moon.Item", content: "Item Five", ontap: "next"}
			]},
			{title: "Fifth", components: [
				{kind: "moon.Item", content: "Item One", ontap: "next"},
				{kind: "moon.Item", content: "Item Two", ontap: "next"},
				{kind: "moon.Item", content: "Item Three", ontap: "next"},
				{kind: "moon.Item", content: "Item Four", ontap: "next"},
				{kind: "moon.Item", content: "Item Five", ontap: "next"}
			]},
			{title: "Sixth", components: [
				{kind: "moon.Item", content: "Item One", ontap: "next"},
				{kind: "moon.Item", content: "Item Two", ontap: "next"},
				{kind: "moon.Item", content: "Item Three", ontap: "next"},
				{kind: "moon.Item", content: "Item Four", ontap: "next"},
				{kind: "moon.Item", content: "Item Five", ontap: "next"}
			]},
			{title: "Seventh", components: [
				{kind: "moon.Item", content: "Item One"},
				{kind: "moon.Item", content: "Item Two"},
				{kind: "moon.Item", content: "Item Three"},
				{kind: "moon.Item", content: "Item Four"},
				{kind: "moon.Item", content: "Item Five"}
			]}
		]}
	],
	next: function(inSender, inEvent) {
		this.$.panels.next();
		return true;
	}
});
