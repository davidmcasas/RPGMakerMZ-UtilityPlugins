//=============================================================================
// Disable Touch UI - Plugin for RPG Maker MZ
//=============================================================================

/*:
 * @target MZ
 * @plugindesc Hides and disables mouse and touch user interface.
 * @author David M. Casas
 * @url https://github.com/davidmcasas
 *
 * @help DisableTouchUI.js - Version 1.0.0
 * Tested with Corescript v1.6.0
 *
 * This plugin disables mouse and touch interactions. Also hides and forces the
 * Touch UI option off, removing the hamburger and back buttons, and the touch
 * buttons on the shop window.
 * 
 * If the "Resize Options Window" parameter is ON, the options window will be
 * resized to remove the empty space left by the Touch UI option. Disable this
 * parameter if you are using plugins for custom options window or if you
 * experience incompatibilties with other plugins.
 * 
 * @param resizeOptionsWindow
 * @type boolean
 * @default true
 * @text Resize Options Window
 * @desc Readjust the height of the options window.
 */

(() => {
    "use strict";
    const pluginName = "DisableTouchUI";

    // Override the _setupEventHandlers function so no touch or mouse listeners are added.
    TouchInput._setupEventHandlers = function() {}

    // Disable the touchUI
    const _Scene_Boot_start = Scene_Boot.prototype.start;
    Scene_Boot.prototype.start = function () {
        _Scene_Boot_start.apply(this, arguments);
        ConfigManager.touchUI = false;
    };

    // Hide the touchUI option in the menu
    const _Window_Options_makeCommandList = Window_Options.prototype.makeCommandList;
    Window_Options.prototype.makeCommandList = function() {
        _Window_Options_makeCommandList.apply(this, arguments);
        const index = this._list.map(e => e.symbol).indexOf("touchUI");
        if (index >= 0) { this._list.splice(index, 1); }
    };

    // If the Resize Options Window parameter is ON, subtract 1 to maxCommands fuction.
    if (PluginManager.parameters(pluginName).resizeOptionsWindow === "true") {
        const _Scene_Options_maxCommands = Scene_Options.prototype.maxCommands;
        Scene_Options.prototype.maxCommands = function() {
            return _Scene_Options_maxCommands.apply(this, arguments) - 1;
        };
    }

})();
