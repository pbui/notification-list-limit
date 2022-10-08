'use strict';

const Main = imports.ui.main;
const NOTIFICATION_LIST_LIMIT = 10;

let modifiedAddMessageAtIndex = null;

function init() {
    modifiedAddMessageAtIndex = function(message, index, animate) {
        // Call original
        this.addMessageAtIndexOrig(message, index, animate);

        // Remove extra
        this._messages.slice(NOTIFICATION_LIST_LIMIT).forEach(
            message => {
		message.notification.acknowledged = true;
		this.removeMessage(message);
	    }
	);
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
