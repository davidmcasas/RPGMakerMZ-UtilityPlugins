//=============================================================================
// Remove Options From Title - Plugin for RPG Maker MZ
//=============================================================================

/*:
 * @target MZ
 * @plugindesc Removes the options button from the title screen.
 * @author David M. Casas
 * @url https://github.com/davidmcasas
 *
 * @help RemoveOptionsFromTitle.js - Version 1.0.0
 * Tested with Corescript v1.6.0
 * 
 * This plugin removes the options button from the title screen, reminiscent
 * of previous RPG Maker versions.
 * 
 * This plugin does not remove the options button from the in-game menu.
 * 
 * Use the Resize Title Window parameter to readjust the height of the title
 * command window and remove the space left by the Options button.
 * Disable this parameter if you experience incompatibilites with other plugins.
 * 
 * @param resizeTitleWindow 
 * @type boolean
 * @default true
 * @text Resize Title Window
 * @desc Readjust the height of the title command window
 */

(() => {
    "use strict";
    const pluginName = "RemoveOptionsFromTitle";

    const resizeTitleWindow = (PluginManager.parameters(pluginName).resizeTitleWindow === "true");

    const _Window_TitleCommand_makeCommandList = Window_TitleCommand.prototype.makeCommandList;
    Window_TitleCommand.prototype.makeCommandList = function() {
        _Window_TitleCommand_makeCommandList.apply(this, arguments);
        
        let index = this._list.map(e => e.symbol).indexOf("options");
        if (index >= 0) { this._list.splice(index, 1); }
    };

    if (resizeTitleWindow) {
        const _Scene_Title_createCommandWindow = Scene_Title.prototype.createCommandWindow;
        Scene_Title.prototype.createCommandWindow = function() {
            _Scene_Title_createCommandWindow.apply(this, arguments);

            this._commandWindow.height = this.calcWindowHeight(this._commandWindow._list.length, true);
        }
    }

})();