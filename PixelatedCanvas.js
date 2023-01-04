//=============================================================================
// Pixelated Canvas - Plugin for RPG Maker MZ
//=============================================================================

/*:
 * @target MZ
 * @plugindesc Enforce pixelated mode image rendering to prevent blurry pixelart.
 * @author David M. Casas
 * @url https://github.com/davidmcasas
 *
 * @help PixelatedCanvas.js - Version 1.0.0
 * Tested with Corescript v1.6.0
 * 
 * RPG Maker MZ renders over a HTML Canvas element. By default, canvas blurries
 * pixelart when the window is resized and upscaled. This plugin enforces
 * pixelated image rendering on canvas for crisp pixelart.
 * 
 * However, non-integer scaling may cause pixel deformation. To prevent this,
 * an optional parameter is provided: "Integer Scaling Only". When enabled,
 * the game will scale only to integer values, which prevent pixel deformation.
 * Example: if enabled, a game with a screen size of 816x624 (RPGM MZ default)
 * will not scale up in a 1920x1080 screen resolution, but a game with a
 * screen size of 800x450 will, because it can be scaled x2 to 1600x900.
 * A game with a screen size of 960x540 will be scaled x2 to perfectly fit a
 * 1920x1080 resolution when displayed at fullscreen.
 * 
 * The Browser Scaling Fix parameter intends to fix a behaviour where some
 * browsers might return a value for height 1 pixel less than actual height.
 * (for example: 1079 instead of 1080) This parameter only applies when
 * Integer Scaling Only is enabled. Try turning this off if you experience
 * any strange behaviour on browser.
 * 
 * Note that RPG MZ games won't stretch by default when run on browser.
 * User is required to press F3 key to stretch, or you can use my plugin
 * ForceStretchMode.js.
 * 
 * @param pixelatedModeEnabled
 * @type boolean
 * @default true
 * @text Enable Pixelated Mode
 * @desc Enable pixelated mode by default
 * 
 * @param showOption
 * @type boolean
 * @default false
 * @text Show Option
 * @desc Show option to enable or disable pixelated mode in the options menu.
 * 
 * @param optionText
 * @type string
 * @default Pixelated Mode
 * @text Option Text
 * @desc Text displayed for this option.
 * 
 * @param integerScalingOnly
 * @type boolean
 * @default false
 * @text Integer Scaling Only
 * @desc Scale only to integer values to prevent pixel deformation.
 * 
 * @param browserScalingFix
 * @type boolean
 * @default true
 * @text Browser Scaling Fix
 * @desc This only applies if Integer Scaling Only is ON.
 */

(() => {
    "use strict";
    const pluginName = "PixelatedCanvas";

    const parameters = PluginManager.parameters(pluginName);
    const pixelatedModeEnabled = (parameters['pixelatedModeEnabled'] === "true");
    const showOption = (parameters['showOption'] === "true");
    const optionText = parameters['optionText'];
    const integerScalingOnly = (parameters['integerScalingOnly'] === "true");
    const browserScalingFix = (parameters['browserScalingFix'] === "true");

    // Switch function
    function setPixelatedMode(enabled) {
        document.getElementById("gameCanvas").style.imageRendering = enabled ? "pixelated" : "";
    }

    if (showOption) {

        // Set default config value
        ConfigManager["pixelatedModeEnabled"] = pixelatedModeEnabled;

        // Store config data
        const _ConfigManager_makeData = ConfigManager.makeData;
            ConfigManager.makeData = function() {
            const config = _ConfigManager_makeData.apply(this, arguments);
            
            config["pixelatedModeEnabled"] = this["pixelatedModeEnabled"];
            return config;
        }
        
        // Read config data
        const _ConfigManager_applyData = ConfigManager.applyData;
        ConfigManager.applyData = function(config) {
            _ConfigManager_applyData.apply(this, arguments);

            this["pixelatedModeEnabled"] = this.readFlag(config, "pixelatedModeEnabled", pixelatedModeEnabled);
            setPixelatedMode(this["pixelatedModeEnabled"]);
        }

        // Apply option change
        const _Window_Options_changeValue = Window_Options.prototype.changeValue;
        Window_Options.prototype.changeValue = function(symbol, value) {
            _Window_Options_changeValue.apply(this, arguments);
    
            if (symbol === "pixelatedModeEnabled") {
                setPixelatedMode(value);
            }
        };

        // Show option command
        const _Window_Options_addGeneralOptions = Window_Options.prototype.addGeneralOptions;
        Window_Options.prototype.addGeneralOptions = function() {
            _Window_Options_addGeneralOptions.apply(this, arguments);

            this.addCommand(optionText, "pixelatedModeEnabled");
        };

        // Update option window height
        const _Scene_Options_maxCommands = Scene_Options.prototype.maxCommands;
        Scene_Options.prototype.maxCommands = function() {
            return _Scene_Options_maxCommands.apply(this, arguments) + 1;
        };
    }

    (function(alias) { // Apply on game boot
        Scene_Boot.prototype.start = function() {
            alias.apply(this, arguments);

            { // body
    
                if (integerScalingOnly) {
                    
                    const _updateRealScale = Graphics._updateRealScale;
                    Graphics._updateRealScale = function() {
                        _updateRealScale.apply(this, arguments);

                        if (this._realScale > 1)  {
                            this._realScale = Math.floor(this._realScale);
                        }
                    }
                    
                    if (browserScalingFix) {

                        document.body.style.overflow = "hidden";
                        
                        const _stretchHeight = Graphics._stretchHeight;
                        Graphics._stretchHeight = function() {
                            let height = _stretchHeight.apply(this, arguments);
                            return (height > Graphics._height) ? (height + 1) : height;
                        };
                    }

                    Graphics._updateAllElements();
                }

                setPixelatedMode(ConfigManager["pixelatedModeEnabled"] || (!showOption && pixelatedModeEnabled));

            } // end body

        };
    })(Scene_Boot.prototype.start);
    
})();
