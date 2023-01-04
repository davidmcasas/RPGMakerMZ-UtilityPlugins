//=============================================================================
// Auto Start New Game - Plugin for RPG Maker MZ
//=============================================================================

/*:
 * @target MZ
 * @plugindesc Automatically starts a new game if no save data is found.
 * @author David M. Casas
 * @url https://github.com/davidmcasas
 *
 * @help AutoStartNewGame.js - Version 1.0.0
 * Tested with Corescript v1.6.0
 *
 * This plugin automatically starts a new game if no save data is found.
 * Thus, the title screen will be skipped when the game is run for the first
 * time.
 */

(() => {
    "use strict";
    
    Scene_Boot.prototype.startNormalGame = function() {
        this.checkPlayerLocation();
        DataManager.setupNewGame();

        if (DataManager.isAnySavefileExists()) {
            SceneManager.goto(Scene_Title);
        } else {
            SceneManager.goto(Scene_Map);
        }

        Window_TitleCommand.initCommandPosition();
    };

})();
