/**
 * War has very simple gameplay.
 * Since all players choose their cards simultaneously
 * and must flip the top card from their stack,
 * we'll just use one simple game button.
 * As such, we'll have only one action, the war button click.
 */
const ActionTypes = {
	WAR_BUTTON_CLICK: 'war_button_click',
	SET_NUMBER_OF_PLAYERS: 'set_number_of_players'
}

export default ActionTypes;