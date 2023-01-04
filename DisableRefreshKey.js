//=============================================================================
// Disable Refresh Key - Plugin for RPG Maker MZ
//=============================================================================

/*:
 * @target MZ
 * @plugindesc Disable accidentally refreshing the game with F5 key.
 * @author David M. Casas
 * @url https://github.com/davidmcasas
 *
 * @help DisableRefreshKey.js - Version 1.0.0
 * Tested with Corescript v1.6.0
 *
 * This plugin disables the F5 key, to prevent the player from
 * accidentally refreshing the game.
 * 
 * Works both on desktop and web browser modes.
 */

(() => {
    "use strict";

    const _SceneManager_onKeyDown = SceneManager.onKeyDown;
    SceneManager.onKeyDown = function (event) {
        if (event.keyCode === 116) { // 116 = F5
            event.preventDefault();
            return;
        }
        _SceneManager_onKeyDown.apply(this, arguments);
    }
    
})();
