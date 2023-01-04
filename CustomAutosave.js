//=============================================================================
// Custom Autosave - Plugin for RPG Maker MZ
//=============================================================================

/*:
 * @target MZ
 * @plugindesc Customize when Autosave should happen or force it with a command.
 * @author David M. Casas
 * @url https://github.com/davidmcasas
 *
 * @help CustomAutosave.js - Version 1.0.0
 * Tested with Corescript v1.6.0
 *
 * Important: For this plugin to work, "Enable Autosave" must be checked in
 * the database. Otherwise, this plugin will have no effect.     
 * 
 * This plugin adds custom autosave parammeters and a plugin command to force
 * autosave from your game events. Check the plugins parameters for details.
 * 
 * Note: This plugin doesn't change what kind of data is saved. By default the
 * engine doesn't save battle information, so using the Autosave plugin command
 * during a battle is discouraged.
 * 
 * @param autosaveOnMapTransferEnabled
 * @type boolean
 * @default true
 * @text Autosave on map transfer
 * @desc Enable default autosave behaviour on map transfer.
 * 
 * @param autosaveOnBattleEndEnabled
 * @type boolean
 * @default true
 * @text Autosave on battle end
 * @desc Enable default autosave behaviour on battle end.
 * 
 * @command Autosave
 * @desc Force an autosave. This command won't work unless "Enable Autosave" is checked in the database.
 */

(() => {
    "use strict";
    const pluginName = "CustomAutosave";

    // Command
    PluginManager.registerCommand(pluginName, "Autosave", args => {
        SceneManager._scene.requestAutosave();
    });


    (function(alias) {
        DataManager.createGameObjects = function() {
            alias.apply(this, arguments);

            // Only apply disabled parameters if "Enable Autosave" is checked in the database
            if ($gameSystem.isAutosaveEnabled()) {
                if (PluginManager.parameters(pluginName).autosaveOnMapTransferEnabled === "false") { // Disable Autosave on Map transfer
                    Scene_Map.prototype.shouldAutosave = function() { return false; };
                } 
                if (PluginManager.parameters(pluginName).autosaveOnBattleEndEnabled === "false") { // Disable Autosave on Battle End
                    Scene_Battle.prototype.shouldAutosave = function() { return false; };
                }
            }
        };
    })(DataManager.createGameObjects);

})();