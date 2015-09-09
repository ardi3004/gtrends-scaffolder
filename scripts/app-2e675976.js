"use strict";angular.module("iframeScaffolder",["ngSanitize","ui.router","ui.bootstrap","ui.validate","ui.sortable","zeroclipboard","ngMaterial","720kb.socialshare"]).config(["$stateProvider","$urlRouterProvider","$sceProvider","$tooltipProvider","uiZeroclipConfigProvider",function(e,t,a,s,i){e.state("home",{url:"/",params:{urls:{value:""},layout:{value:"menu"},theme:{value:"default"}},templateUrl:"app/main/main.html",controller:"MainCtrl"}).state("view",{url:"/view?urls&layout&theme&active&sharing",templateUrl:"app/view/view.html",controller:"ViewCtrl"}).state("fork",{url:"/fork?urls&layout&theme",controller:"ForkCtrl"}),t.otherwise("/"),a.enabled(!1),s.options({appendToBody:!0}),i.setZcConf({swfPath:"./assets/swf/ZeroClipboard.swf"})}]).run(["$rootScope","$location","$window",function(e,t,a){e.$on("$stateChangeSuccess",function(){a.ga&&a.ga("send","pageview",{page:t.url()})})}]),angular.module("iframeScaffolder").controller("ViewCtrl",["$scope","$stateParams",function(e,t){e.options={layout:t.layout,theme:t.theme||"default",urls:t.urls.split(","),active:t.active||0,sharing:t.sharing||0}}]),angular.module("iframeScaffolder").controller("MainCtrl",["$scope","$state","$stateParams","$http","Scaffolder",function(e,t,a,s,i){var l=/^(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?$/;e.options={active:0,sharing:1,layout:a.layout||"menu",theme:a.theme||"default",urls:a.urls&&""!==a.urls?a.urls.split(","):[]},e.scaffolder=new i(e.options),e.width=600,e.height=450,e.examples=[],e.themes={"default":"Default","ebony-clay":"Ebony clay","picton-blue":"Picton blue","silver-tree":"Silver tree",eucalyptus:"Eucalyptus","sunset-orange":"Sunset orange","monza-red":"Monza red"},s.get("assets/examples.json").success(function(t){e.examples=t}),e.isUrlValid=function(t){return null!==e.extractUrl(t)},e.extractUrl=function(e){var t=null;if(l.test(e))return e;try{t=$(e).attr("src"),0===t.indexOf("//")&&(t="http:"+t)}catch(a){return null}return void 0!==t&&l.test(t)?t:null},e.addUrl=function(){var t=e.extractUrl(e.newUrl);null!==t&&(e.options.urls.push(t.replace(/,/g,"%2C")),e.newUrl=null)},e.removeUrl=function(t){e.options.urls.splice(t,1)},e.getViewUrl=function(){return e.scaffolder.viewUrl()},e.getViewIframe=function(){var t=e.getViewUrl(),a=e.useFluid?"100%":e.width||600,s=e.height||450;return'<iframe src="'+t+'" width="'+a+'" height="'+s+'" frameborder="0" allowfullscreen></iframe>'},e.pickExample=function(){var t=e.examples[Math.floor(Math.random()*e.examples.length)];angular.extend(e.options,angular.copy(t))},e.editLabel=function(t){e.labels={},e.labels[t]=e.scaffolder.label(t,"")},e.saveLabel=function(t){var a=(e.labels[t]||"").replace(/\||,/gi," ");e.labels={},e.options.urls[t]=""!==a?a+"|"+e.scaffolder.url(t,!0):e.scaffolder.url(t,!0)},e.$watch("options",function(){e.scaffolder=new i(e.options)},!0)}]),angular.module("iframeScaffolder").controller("ForkCtrl",["$state","$stateParams",function(e,t){e.go("home",t)}]),angular.module("iframeScaffolder").controller("ScaffolderCtrl",["$scope","Scaffolder",function(e,t){var a=e.options;e.scaffolder=new t(a),e.iframeWidth=function(){switch(a.layout){case"horizontal":return 100/a.urls.length+"%";case"head":return"50%";case"menu":return"75%";case"tabs":return"100%";case"narrative":return"100%"}},e.iframeHeight=function(e,t,s){return"horizontal"===a.layout||"menu"===a.layout||"head"===a.layout&&t||"tail"===a.layout&&s?"100%":"tabs"===a.layout||"narrative"===a.layout?"auto":100/(a.urls.length-1)+"%"},e.menuLinkClasses=function(t){var s=e.scaffolder,i="narrative"===a.layout;return{active:s.isActive(t),"pull-left":i&&s.isPrevious(t),"pull-right":i&&s.isNext(t),hidden:i&&!s.isNext(t)&&!s.isPrevious(t)}},e.$watch("options",function(){e.scaffolder=new t(a)},!0)}]),angular.module("iframeScaffolder").directive("scaffolder",function(){return{restrict:"E",controller:"ScaffolderCtrl",templateUrl:"components/scaffolder/scaffolder.html",scope:{options:"="}}}),angular.module("iframeScaffolder").service("Scaffolder",["$state",function(e){function t(e){return e=angular.extend(angular.copy(a),e),angular.extend(this,e),this.activate(parseInt(e.active||0)),this}var a={urls:[],active:0,layout:"menu"};return t.prototype.serialized=function(e){var t=angular.fromJson(angular.toJson(this));return t.urls=t.urls.join(","),t.active=e||t.active||0,t},t.prototype.viewUrl=function(t){return e.href("view",this.serialized(t),{absolute:!0})},t.prototype.url=function(e,t){var a=this.urls[e];return this.isVisible(e)||t?this.hasLabel(e)?a.split("|")[1]:a:void 0},t.prototype.isActive=function(e){return e===this.active},t.prototype.activate=function(e){this.active=e<this.urls.length?e:0},t.prototype.getActive=function(e){return{label:this.label(this.active,e),url:this.url(this.active)}},t.prototype.isVisible=function(e){return!this.hasMenu()||this.isActive(e)},t.prototype.isPrevious=function(e){return e===this.active-1},t.prototype.isNext=function(e){return e===this.active+1},t.prototype.hasLabel=function(e){return this.urls[e]&&this.urls[e].indexOf("|http")>-1},t.prototype.label=function(e,t){var a=this.urls[e];return this.hasLabel(e)?a.split("|")[0]:"undefined"!=typeof t&&null!==t?t:a},t.prototype.hasMenu=function(){return["menu","tabs","narrative"].indexOf(this.layout)>-1},t}]),function(e){try{e=angular.module("iframeScaffolder")}catch(t){e=angular.module("iframeScaffolder",[])}e.run(["$templateCache",function(e){e.put("app/main/main.html",'<div class="introduction"><div class="container"><h2>Iframe Scaffolder</h2><p class="lead text-muted">This tool helps you to quickly arrange several iframes together.</p></div></div><div class="container"><div class="row editor"><div class="col-md-4"><div class="panel editor__step panel-default"><div class="editor__step__label"></div><form class="panel-body" name="addUrlForm" role="form" ng-submit="addUrl()"><div class="input-group"><input type="text" required="" ui-validate="{ isUrl: \'isUrlValid($value)\' }" name="newUrl" ng-model="newUrl" class="form-control" placeholder="An URL or an iframe code"> <span class="input-group-btn"><button class="btn btn-primary" ng-disabled="!addUrlForm.$valid" type="submit" tooltip="Create an iframe with this URL">Add</button></span></div><div ng-show="addUrlForm.newUrl.$error.isUrl && !addUrlForm.newUrl.$error.required" class="editor__step__error text-danger small">This is not a valid URL or iframe.</div></form><ul class="list-group" ui-sortable="" ng-model="options.urls"><li class="list-group-item editor__step__url" ng-repeat="url in options.urls track by $index"><div><div class="btn-group btn-group-xs pull-right editor__step__url__actions"><button type="button" class="btn btn-default" tooltip="Change the label describing this iframe" ng-click="editLabel($index)">Edit label</button> <button type="button" class="btn btn-default" ng-click="removeUrl($index)" tooltip="Remove this iframe"><i class="fa fa-trash-o"></i></button></div><a ng-href="{{scaffolder.url($index, true)}}" target="_blank" class="editor__step__url__value">{{scaffolder.label($index)}}</a></div><form ng-submit="saveLabel($index)" ng-show="!!labels[$index] || labels[$index] === \'\'" class="editor__step__url__edit-label"><div class="input-group input-group-sm"><input type="text" ng-model="labels[$index]" class="form-control"> <span class="input-group-btn"><button class="btn btn-default" type="submit">Save</button></span></div></form></li></ul></div><div class="panel editor__step panel-default" ng-class="{ \'editor__step--disable\': !options.urls.length }"><div class="editor__step__label"></div><div class="panel-body"><p>Choose a layout&nbsp; <small class="text-muted">(how iframes are arranged)</small></p><div class="text-center btn-group"><button class="btn btn-default btn-sm" ng-class="{active: options.layout == \'menu\'}" ng-click="options.layout = \'menu\'" tooltip="Toggle iframes using a menu">≡◻</button> <button class="btn btn-default btn-sm" ng-class="{active: options.layout == \'narrative\'}" ng-click="options.layout = \'narrative\'" tooltip="Toggle iframes using next and previous buttons">⍃ ⍄</button> <button class="btn btn-default btn-sm" ng-class="{active: options.layout == \'tabs\'}" ng-click="options.layout = \'tabs\'" tooltip="Toggle iframes using tabs">⎍⎍</button> <button class="btn btn-default btn-sm" ng-class="{active: options.layout == \'horizontal\'}" ng-click="options.layout = \'horizontal\'" tooltip="All iframes have equal width">▯▯▯</button> <button class="btn btn-default btn-sm" ng-class="{active: options.layout == \'head\'}" ng-click="options.layout = \'head\'" tooltip="The first iframe use half of the screen, the others a stacked">▯▤</button> <button class="btn btn-default btn-sm" ng-class="{active: options.layout == \'tail\'}" ng-click="options.layout = \'tail\'" tooltip="The last iframe use half of the screen, the others a stacked">▤▯</button></div></div></div><div class="panel editor__step panel-default" ng-class="{ \'editor__step--disable\': !options.urls.length }"><div class="editor__step__label"></div><div class="panel-body"><div class="pull-right" dropdown=""><span class="btn-group"><i class="scaffolder--{{options.theme}}__preview editor__step__theme-preview disabled btn btn-xs"></i> <button class="btn btn-default btn-xs" dropdown-toggle="">{{ themes[options.theme] }} &nbsp;<i class="caret"></i></button></span><ul class="dropdown-menu" role="menu"><li ng-repeat="(theme, label) in themes" class="editor__step__theme"><a ng-click="options.theme = theme"><i class="scaffolder--{{theme}}__preview editor__step__theme__preview"></i> {{label}}</a></li></ul></div>Choose a theme&nbsp;</div></div><div class="panel editor__step panel-default" ng-class="{ \'editor__step--disable\': !options.urls.length }"><div class="editor__step__label"></div><div class="panel-body"><p><button class="btn btn-primary btn-xs pull-right" ui-zeroclip="" zeroclip-model="getViewIframe()" title="Copy the embed code to you clipboard.">Copy</button> Export the mosaic</p><p><textarea class="form-control" readonly="">{{getViewIframe()}}</textarea></p><a class="editor__step__show-more-options" ng-class="{ \'editor__step__show-more-options--active\': showMoreOptions}" ng-click="showMoreOptions = !showMoreOptions"><i class="caret"></i>&nbsp; More options</a><div ng-show="showMoreOptions"><div><div class="pull-left editor__step__iframe-label"><strong>Change the size&nbsp;</strong><br><label class="editor__step__iframe-label__fluid"><input type="checkbox" ng-model="useFluid"> Use a fluid width</label></div><div class="text-right editor__step__iframe-size"><input type="number" ng-disabled="useFluid" ng-model="width" min="50" class="form-control input-sm editor__step__iframe-size__size"> x <input type="number" ng-model="height" min="50" class="form-control input-sm editor__step__iframe-size__size"></div></div><br class="clearfix"><div class="row"><div class="col-xs-6"><label for="input-active">Choose the 1<sup>st</sup> iframe</label></div><div class="col-xs-6"><select id="input-active" ng-model="options.active" class="form-control input-sm"><option value="{{$index}}" ng-repeat="url in options.urls track by $index">{{scaffolder.label($index)}}</option></select></div></div><div class="checkbox"><label for="input-sharing"><input type="checkbox" ng-model="options.sharing" ng-true-value="1" ng-false-value="0" id="input-sharing"> Allow iframe sharing</label><p class="text-muted small">The user will be able to share each iframe individually.</p></div></div></div></div><div class="text-muted small editor__credits hidden-xs hidden-sm"><div class="media"><a class="media-left media-middle" href="http://twitter.com/pirhoo" target="_blank"><img src="https://secure.gravatar.com/avatar/f514016d15f3d5409177c1031eedb0a5?s=24" class="img-circle img-thumbnail"></a><div class="media-body">Hi, I\'m <a href="http://twitter.com/pirhoo" target="_blank">@pirhoo</a>. &nbsp;You can fork this tool<br>or report an issue &nbsp;<a href="http://github.com/pirhoo/iframe-scaffolder/">on Github</a>!</div></div></div></div><div class="col-md-8"><div class="panel panel-default editor__preview"><div class="editor__preview__empty-alert" ng-hide="options.urls.length"><div class="lead editor__preview__empty-alert__message"><p>Add an iframe\'s URL on the <span class="hidden-sm hidden-xs">left&nbsp;</span>panel to preview the mosaic here.</p><p><a ng-click="pickExample()" class="btn btn-link" ng-show="examples.length">See an example.</a> {{example}}</p></div></div><div class="panel-heading"><div class="input-group"><input class="form-control" type="text" value="{{getViewUrl()}}" readonly=""> <span class="input-group-btn"><a class="btn btn-link" href="{{getViewUrl()}}" target="_blank" tooltip="Open the iframe in a new window"><i class="fa fa-external-link"></i></a> <a class="btn btn-link" tooltip="Permalink to edit the same mosaic" ui-sref="fork(scaffolder.serialized())"><i class="fa fa-edit"></i></a></span></div></div><div class="editor__preview__scaffolder"><scaffolder options="options"></scaffolder></div></div></div></div></div>')}])}(),function(e){try{e=angular.module("iframeScaffolder")}catch(t){e=angular.module("iframeScaffolder",[])}e.run(["$templateCache",function(e){e.put("app/view/view.html",'<div class="view"><div class="view__scaffolder"><scaffolder options="options"></scaffolder></div></div>')}])}(),function(e){try{e=angular.module("iframeScaffolder")}catch(t){e=angular.module("iframeScaffolder",[])}e.run(["$templateCache",function(e){e.put("components/scaffolder/scaffolder.html",'<div class="scaffolder scaffolder--{{options.layout}} scaffolder--{{options.theme}}" layout="column" layout-align="start start"><div class="scaffolder__header"></div><div class="scaffolder__container" flex=""><aside ng-show="scaffolder.hasMenu()" class="scaffolder__container__menu"><ul class="nav nav-pills" ng-class="{ \'nav-stacked\': options.layout === \'menu\' }"><li ng-repeat="url in options.urls track by $index" ng-class="menuLinkClasses($index)" class="scaffolder__container__menu__item"><a ng-click="scaffolder.activate($index)">{{scaffolder.label($index, "Iframe " + ($index+1))}}</a></li></ul><h4 class="scaffolder__container__title">{{ scaffolder.getActive( \'Iframe \' + ($index + 1) ).label }}</h4></aside><iframe frameborder="0" class="scaffolder__container__iframe" width="{{iframeWidth($index, $first, $last)}}" height="{{iframeHeight($index, $first, $last)}}" ng-class="{\'scaffolder__container__iframe--last\': $last, \'scaffolder__container__iframe--first\': $first}" ng-src="{{scaffolder.url($index)}}" ng-show="scaffolder.isVisible($index)" ng-repeat="url in options.urls track by $index"></iframe></div><div class="scaffolder__footer">Built with <a href="//pirhoo.github.io/iframe-scaffolder/" target="_blank">Iframe Scaffolder</a><div class="scaffolder__footer__sharing pull-right" ng-if="options.sharing">Share this view&nbsp; <a socialshare="" socialshare-text="{{ scaffolder.getActive( \'Iframe \' + ($index + 1) ).label }}" socialshare-url="{{ scaffolder.viewUrl(scaffolder.active) }}" socialshare-provider="twitter" class="scaffolder__footer__sharing__twitter"><i class="fa fa-fw fa-twitter"></i> <span class="sr-only">Twitter</span></a> <a socialshare="" socialshare-name="{{ scaffolder.getActive().label }}" socialshare-url="{{ scaffolder.viewUrl(scaffolder.active) }}" socialshare-provider="facebook" socialshare-type="feed" socialshare-to="" socialshare-from="" socialshare-ref="" socialshare-display="popup" socialshare-via="%%FACEBOOK_APP_ID%%" socialshare-redirect-uri="https://facebook.com" class="scaffolder__footer__sharing__facebook"><i class="fa fa-fw fa-facebook"></i> <span class="sr-only">Facebook</span></a></div></div></div>')}])}();