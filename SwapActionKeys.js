//=============================================================================
// Swap Action Keys - Plugin for RPG Maker MZ
//=============================================================================

/*:
 * @target MZ
 * @plugindesc Adds option to swap the Z and X keys.
 * @author David M. Casas
 * @url https://github.com/davidmcasas
 *
 * @help SwapActionKeys.js - Version 1.0.0
 * Tested with Corescript v1.6.0
 * 
 * By default RPG Maker uses Z key for action and X key to cancel.
 * This plugin lets you swap these keys and display an option in the
 * options menu. Doesn't affect Enter, Escape or Gamepad buttons.
 * 
 * @param swapActionKeys
 * @type boolean
 * @default false
 * @text Swap Action Keys
 * @desc Swap Z and X keys by default.
 * 
 * @param showOption
 * @type boolean
 * @default true
 * @text Show Option
 * @desc Show option to swap action keys in the options menu.
 * 
 * @param optionText
 * @type string
 * @default Swap Z and X Keys
 * @text Option Text
 * @desc Text displayed for this option.
 */

(() => {
    "use strict";
    const pluginName = "SwapActionKeys";

    const parameters = PluginManager.parameters(pluginName);
    const swapActionKeys = (parameters["swapActionKeys"] === "true");
    const showOption = (parameters["showOption"] === "true");
    const optionText = parameters["optionText"];

    function updateActionKeys() {
        if (ConfigManager["swapActionKeys"] || (!showOption && swapActionKeys)) {
            Input.keyMapper[88] = "ok";
            Input.keyMapper[90] = "escape";
        } else {
            Input.keyMapper[88] = "escape";
            Input.keyMapper[90] = "ok";
        }
        Input.clear();
    }

    // Apply on game boot
    const _Scene_Boot_start = Scene_Boot.prototype.start;
    Scene_Boot.prototype.start = function() {
        _Scene_Boot_start.apply(this, arguments);

        updateActionKeys();
    }

    if (showOption) {

        // Set default config value
        ConfigManager["swapActionKeys"] = swapActionKeys;

        // Store config data
        const _ConfigManager_makeData = ConfigManager.makeData;
            ConfigManager.makeData = function() {
            const config = _ConfigManager_makeData.apply(this, arguments);
            
            config["swapActionKeys"] = this["swapActionKeys"];
            return config;
        }
        
        // Read config data
        const _ConfigManager_applyData = ConfigManager.applyData;
        ConfigManager.applyData = function(config) {
            _ConfigManager_applyData.apply(this, arguments);

            this["swapActionKeys"] = this.readFlag(config, "swapActionKeys", swapActionKeys);
            updateActionKeys();
        }

        // Apply option change
        const _Window_Options_changeValue = Window_Options.prototype.changeValue;
        Window_Options.prototype.changeValue = function(symbol, value) {
            _Window_Options_changeValue.apply(this, arguments);
    
            if (symbol === "swapActionKeys") {
                updateActionKeys();
            }
        };

        // Show option command
        const _Window_Options_addGeneralOptions = Window_Options.prototype.addGeneralOptions;
        Window_Options.prototype.addGeneralOptions = function() {
            _Window_Options_addGeneralOptions.apply(this, arguments);

            this.addCommand(optionText, "swapActionKeys");
        };

        // Update option window height
        const _Scene_Options_maxCommands = Scene_Options.prototype.maxCommands;
        Scene_Options.prototype.maxCommands = function() {
            return _Scene_Options_maxCommands.apply(this, arguments) + 1;
        };
    }

})();