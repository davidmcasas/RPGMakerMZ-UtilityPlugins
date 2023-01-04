//=============================================================================
// Exit To Desktop - Plugin for RPG Maker MZ
//=============================================================================

/*:
 * @target MZ
 * @plugindesc Enables an "Exit To Desktop" option in the title screen.
 * @author David M. Casas
 * @url https://github.com/davidmcasas
 *
 * @help ExitToDesktop.js - Version 1.0.0
 * Tested with Corescript v1.6.0
 * 
 * Important: This plugin will only have effect if the game is running under
 * NWJS (i.e desktop mode). It won't have any effect in web browser mode.
 * 
 * This plugin enables an "Exit To Desktop" option in the title screen with
 * customizable text.
 * 
 * Also provides a plugin command to exit the game.
 * 
 * @param exitButtonText 
 * @type string
 * @default Quit Game
 * @text Exit Button Text
 * @desc Customize the text shown on the exit button.
 * 
 * @command exitToDesktop
 * @text Exit To Desktop
 * @desc Quits the game.
 * 
 * @arg fadeout
 * @text Fadeout
 * @type boolean
 * @default true
 * @desc Enable to perform fadeout before quit. Disable to quit instantly. 
 */

(() => {
    "use strict";
    const pluginName = "ExitToDesktop";
    
    const exitButtonText = PluginManager.parameters(pluginName).exitButtonText;

    // Command
    PluginManager.registerCommand(pluginName, "exitToDesktop", args => {
        if (Utils.isNwjs()) {
            if (args.fadeout === "true") {
                SceneManager._scene.fadeOutAll();
            }
            SceneManager.exit();
        }
    }); // End Command

    if (Utils.isNwjs()) { // Body

        Scene_Title.prototype.commandExitToDesktop = function() {
            this._commandWindow.close();
            this.fadeOutAll();
            SceneManager.exit();
        };

        const _Window_TitleCommand_makeCommandList = Window_TitleCommand.prototype.makeCommandList;
        Window_TitleCommand.prototype.makeCommandList = function() {
            _Window_TitleCommand_makeCommandList.apply(this, arguments);
            
            this.addCommand(exitButtonText, "exitToDesktop");
        };

        const _Scene_Title_createCommandWindow = Scene_Title.prototype.createCommandWindow;
        Scene_Title.prototype.createCommandWindow = function() {
            _Scene_Title_createCommandWindow.apply(this, arguments);
            this._commandWindow.setHandler('exitToDesktop', this.commandExitToDesktop.bind(this));
        };

    } // End Body

})();