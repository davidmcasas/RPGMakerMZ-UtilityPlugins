//=============================================================================
// Disable Dashing - Plugin for RPG Maker MZ
//=============================================================================

/*:
 * @target MZ
 * @plugindesc Disables dashing and provides commands to enable, disable or force dashing.
 * @author David M. Casas
 * @url https://github.com/davidmcasas
 *
 * @help DisableDashing.js - Version 1.0.0
 * Tested with Corescript v1.6.0
 * 
 * Hides and disables the Always Dash option and disables dashing key.
 * Provides plugin commands to reenable and disable manual dashing
 * within your game events. The Force Dashing parameter will ignore
 * Dashing Disabled and can also be set by plugin commands.
 * 
 * If the "Resize Options Window" parameter is ON, the options window will be
 * resized to remove the empty space left by the Always Dash option. Disable
 * this parameter if you are using plugins for custom options window or if you
 * experience incompatibilties with other plugins.
 * 
 * Save Data: this plugin stores values in the save file under
 * "contents.DisableDashing" in order to remember if dashing was enabled,
 * disabled or forced via the plugin commands.
 * 
 * @param dashingDisabled
 * @type boolean
 * @default true
 * @text Dashing Disabled
 * @desc Removes dashing with shift. Enable and disable via plugin commands.
 * 
 * @param forceDashing
 * @type boolean
 * @default false
 * @text Force Dashing
 * @desc Forces Dashing. Enable and disable via plugin commands.
 * 
 * @param resizeOptionsWindow
 * @type boolean
 * @default true
 * @text Resize Options Window
 * @desc Readjust the height of the options window.
 * 
 * @command Enable Dashing
 * @desc Enables dashing with shift key.
 * 
 * @command Disable Dashing
 * @desc Disables dashing with shift key.
 * 
 * @command Enable Force Dashing
 * @desc Enables Force Dashing.
 * 
 * @command Disable Force Dashing
 * @desc Disables Force Dashing.
 */

(() => {
    "use strict";
    const pluginName = "DisableDashing";

    // Commands
    PluginManager.registerCommand(pluginName, "Enable Dashing", args => {
        window[pluginName].dashingDisabled = "false";
    });
    PluginManager.registerCommand(pluginName, "Disable Dashing", args => {
        window[pluginName].dashingDisabled = "true";
    });
    PluginManager.registerCommand(pluginName, "Enable Force Dashing", args => {
        window[pluginName].forceDashing = "true";
    });
    PluginManager.registerCommand(pluginName, "Disable Force Dashing", args => {
        window[pluginName].forceDashing = "false";
    });
    
    // Handle Dashing
    const _Game_Player_isDashing = Game_Player.prototype.isDashing; 
    Game_Player.prototype.isDashing = function() {
        if (window[pluginName].forceDashing === "true") {
            return true;
        } else if (window[pluginName].dashingDisabled === "true") {
            return false;
        } else return _Game_Player_isDashing.apply(this, arguments);
    };
    
    // Hide the Always Dash option in the menu
    const _Window_Options_makeCommandList = Window_Options.prototype.makeCommandList;
    Window_Options.prototype.makeCommandList = function() {
        _Window_Options_makeCommandList.apply(this, arguments);
        const index = this._list.map(e => e.symbol).indexOf("alwaysDash");
        if (index >= 0) { this._list.splice(index, 1); }
    };

    // If the Resize Options Window parameter is ON, subtract 1 to maxCommands fuction.
    if (PluginManager.parameters(pluginName).resizeOptionsWindow === "true") {
        const _Scene_Options_maxCommands = Scene_Options.prototype.maxCommands;
        Scene_Options.prototype.maxCommands = function() {
            return _Scene_Options_maxCommands.apply(this, arguments) - 1;
        };
    }

    // Handling New Game
    (function(alias) {
        DataManager.createGameObjects = function() {
            alias.apply(this, arguments);
            ConfigManager.alwaysDash = false;
            window[pluginName] = { 
                dashingDisabled: PluginManager.parameters(pluginName).dashingDisabled,
                forceDashing: PluginManager.parameters(pluginName).forceDashing 
            };
        };
    })(DataManager.createGameObjects);

    // Handling Save Game
    (function(alias) {
        DataManager.makeSaveContents = function() {
            let contents = alias.apply(this, arguments);
            contents[pluginName] = window[pluginName];
            return contents;
        };
      })(DataManager.makeSaveContents);
      
    // Handling Load Game
    (function(alias) {
    DataManager.extractSaveContents = function(contents) {
        alias.apply(this, arguments);
        if (contents[pluginName]) { window[pluginName] = contents[pluginName]; }
    };
    })(DataManager.extractSaveContents);

})();
