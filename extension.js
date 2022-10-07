'use strict';
 
const Main = imports.ui.main;
const MESSAGE_LIST_LIMIT = 10;

let modifiedAddMessageAtIndex = null;

function init() {
    modifiedAddMessageAtIndex = function(message, index, animate) {
    	// Call original
    	this.addMessageAtIndexOrig(message, index, animate);
    	console.log(`MessageListLimit: ${this._messages.length}`);

    	// Remove extra
    	while (this._messages.length > MESSAGE_LIST_LIMIT) {
    	    this.removeMessage(this._messages[0]);
	}
    }
}

function enable() {
    console.log(`MessageListLimit: enabled`);
    this._messageList = Main.panel.statusArea.dateMenu._messageList._notificationSection;
    this._messageList.addMessageAtIndexOrig = this._messageList.addMessageAtIndex;
    this._messageList.addMessageAtIndex     = modifiedAddMessageAtIndex;
}

function disable() {
    console.log(`MessageListLimit: disabled`);
    this._messageList.addMessageAtIndex = this._messageList.addMessageAtIndexOrig;
    delete this._messageList.addMessageAtIndexOrig;
}
