//=============================================================================
// Force Stretch Mode - Plugin for RPG Maker MZ
//=============================================================================

/*:
 * @target MZ
 * @plugindesc Force stretch mode, which is disabled by default on browser and phone.
 * @author David M. Casas
 * @url https://github.com/davidmcasas
 *
 * @help ForceStretchMode.js - Version 1.0.0
 * Tested with Corescript v1.6.0
 * 
 * This plugin will force enable stretch mode, which is disabled by default
 * on browser and mobile.
 * 
 * A parameter is provided to disable user switching of stretch mode, which by
 * default is bound to the F3 key.
 * 
 * @param disableStretchSwitch
 * @type boolean
 * @default true
 * @text Disable Stretch Switch
 * @desc Disable switching stretch mode ON and OFF with the F3 key.
 */

(() => {
    "use strict";
    const pluginName = "ForceStretchMode";

    Graphics._defaultStretchMode = function() {
        Graphics._stretchEnabled = true;
        return true;
    };

    if (PluginManager.parameters(pluginName).disableStretchSwitch === "true") {
        Graphics._switchStretchMode = function() {};
    }

})();