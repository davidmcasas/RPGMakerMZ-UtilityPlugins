//=============================================================================
// Disable Loading Spinner - Plugin for RPG Maker MZ
//=============================================================================

/*:
 * @target MZ
 * @plugindesc Removes the loading spinner.
 * @author David M. Casas
 * @url https://github.com/davidmcasas
 *
 * @help DisableLoadingSpinner.js - Version 1.0.0
 * Tested with Corescript v1.6.0
 *
 * This plugin removes the loading spinner on game boot.
 * This plugin benefits from being run first to ensure the spinner is removed
 * in case other plugins take much time to load.
 */

(() => {
    Main.prototype.eraseLoadingSpinner();
})();
