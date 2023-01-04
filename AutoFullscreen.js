//=============================================================================
// Auto Fullscreen - Plugin for RPG Maker MZ
//=============================================================================

/*:
 * @target MZ
 * @plugindesc Automatically sets the game to fullscreen.
 * @author David M. Casas
 * @url https://github.com/davidmcasas
 *
 * @help AutoFullscreen.js - Version 1.0.0
 * Tested with Corescript v1.6.0
 *
 * This plugin automatically sets the game to fullscreen.
 * Remember that fullscreen can be toggled with F4 key by default.
 * 
 * Doesn't work for web browsers such as Chrome since these require the user to
 * interact with the page first before going fullscreen for security reasons.
 */

(() => {
    "use strict";

    const _Scene_Boot_start = Scene_Boot.prototype.start;
    Scene_Boot.prototype.start = function () {
        _Scene_Boot_start.apply(this, arguments);
        Graphics._requestFullScreen();
    };
})();