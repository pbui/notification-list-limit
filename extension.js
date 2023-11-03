'use strict';

const Main = imports.ui.main;
const NOTIFICATION_LIST_LIMIT = 10;

let modifiedAddMessageAtIndex = null;

function init() {
    modifiedAddMessageAtIndex = function(message, index, animate) {
        // Call original
        this.addMessageAtIndexOrig(message, index, animate);

        // Remove extra
	while (this._messages.length > NOTIFICATION_LIST_LIMIT) {
	    const message = this._messages.pop();
	    try {
		message.notification.acknowledged = true;
		this.removeMessage(message);
	    } catch (error) {
		console.log(error);
	    }
	}
    }
}

function enable() {
    this._messageList = Main.panel.statusArea.dateMenu._messageList._notificationSection;
    this._messageList.addMessageAtIndexOrig = this._messageList.addMessageAtIndex;
    this._messageList.addMessageAtIndex     = modifiedAddMessageAtIndex;
}

function disable() {
    this._messageList.addMessageAtIndex = this._messageList.addMessageAtIndexOrig;
    delete this._messageList.addMessageAtIndexOrig;
}
